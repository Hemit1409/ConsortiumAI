/**
 * Workflow Orchestrator - Coordinates agent collaboration
 * Implements workflow stages and controls task delegation
 */

import { MCPServer } from "../server/MCPServer";
import {
  AgentRole,
  Task,
  TaskStatus,
  WorkflowDefinition,
  WorkflowStage,
  AgentResponse
} from "../types";
import crypto from "crypto";

export class WorkflowOrchestrator {
  private mcpServer: MCPServer;
  private currentWorkflow?: WorkflowDefinition;
  private stageIndex: number = 0;

  constructor(mcpServer: MCPServer) {
    this.mcpServer = mcpServer;
  }

  /**
   * Define a workflow
   */
  public defineWorkflow(
    name: string,
    description: string,
    initialPrompt: string,
    stages: WorkflowStage[]
  ): WorkflowDefinition {
    this.currentWorkflow = {
      id: crypto.randomUUID(),
      name,
      description,
      initialPrompt,
      stages,
      createdAt: new Date()
    };

    this.stageIndex = 0;
    console.log(`[Orchestrator] Workflow defined: ${name}`);

    return this.currentWorkflow;
  }

  /**
   * Execute the current workflow
   */
  public async executeWorkflow(): Promise<Map<string, AgentResponse[]>> {
    if (!this.currentWorkflow) {
      throw new Error("No workflow defined");
    }

    console.log(`\n[Orchestrator] Starting workflow: ${this.currentWorkflow.name}`);
    console.log(`[Orchestrator] Description: ${this.currentWorkflow.description}\n`);

    const workflowResults = new Map<string, AgentResponse[]>();

    for (let i = 0; i < this.currentWorkflow.stages.length; i++) {
      const stage = this.currentWorkflow.stages[i];
      console.log(`\n${"=".repeat(60)}`);
      console.log(`STAGE ${i + 1}: ${stage.name}`);
      console.log(`${"=".repeat(60)}`);
      console.log(`Primary Agent: ${stage.primaryAgent}`);
      if (stage.supportingAgents) {
        console.log(`Supporting Agents: ${stage.supportingAgents.join(", ")}`);
      }
      console.log("");

      const stageResponses: AgentResponse[] = [];

      for (const task of stage.tasks) {
        console.log(`Executing task: ${task.title}`);
        const responses = await this.mcpServer.executeTask(task);
        stageResponses.push(...responses);

        // Print agent responses
        for (const response of responses) {
          console.log(`\n[${response.agentRole}] Response:`);
          console.log(response.response);
          console.log(`Confidence: ${(response.confidence * 100).toFixed(1)}%`);
          if (response.suggestedNextSteps) {
            console.log(`Suggested Next Steps:`);
            response.suggestedNextSteps.forEach((step) => {
              console.log(`  • ${step}`);
            });
          }
        }
      }

      workflowResults.set(stage.id, stageResponses);

      // Store stage results in shared context
      this.mcpServer.updateSharedContext(`stage_${stage.id}_results`, stageResponses);

      // Check success criteria
      const allSuccessful = stage.successCriteria.length > 0;
      if (allSuccessful) {
        console.log(`\n✓ Stage completed successfully`);
      }
    }

    console.log(`\n${"=".repeat(60)}`);
    console.log(`WORKFLOW COMPLETED: ${this.currentWorkflow.name}`);
    console.log(`${"=".repeat(60)}\n`);

    return workflowResults;
  }

  /**
   * Get current workflow
   */
  public getCurrentWorkflow(): WorkflowDefinition | undefined {
    return this.currentWorkflow;
  }

  /**
   * Get workflow stage by index
   */
  public getStage(index: number): WorkflowStage | undefined {
    return this.currentWorkflow?.stages[index];
  }

  /**
   * Get total number of stages
   */
  public getTotalStages(): number {
    return this.currentWorkflow?.stages.length ?? 0;
  }

  /**
   * Create a workflow stage
   */
  public static createStage(
    id: string,
    name: string,
    primaryAgent: AgentRole,
    tasks: Task[],
    successCriteria: string[],
    supportingAgents?: AgentRole[]
  ): WorkflowStage {
    return {
      id,
      name,
      primaryAgent,
      supportingAgents,
      tasks,
      successCriteria
    };
  }
}
