/**
 * MCP Server - Central coordination layer for multi-agent system
 * Manages agent communication, routing, and context
 */

import { BaseAgent } from "../agents/BaseAgent";
import {
  AgentRole,
  Message,
  Task,
  TaskStatus,
  CompanyState,
  AgentResponse,
  WorkflowDefinition
} from "../types";
import crypto from "crypto";

export class MCPServer {
  private agents: Map<AgentRole, BaseAgent> = new Map();
  private companyState: CompanyState;
  private messageQueue: Message[] = [];
  private taskQueue: Task[] = [];
  private sharedContext: Map<string, unknown> = new Map();

  constructor(companyName: string = "AI Software Company") {
    this.companyState = {
      id: crypto.randomUUID(),
      name: companyName,
      createdAt: new Date(),
      completedTasks: [],
      pendingTasks: [],
      messageHistory: [],
      artifacts: new Map()
    };
  }

  /**
   * Register an agent with the server
   */
  public registerAgent(agent: BaseAgent): void {
    const role = agent.getContext().role;
    this.agents.set(role, agent);
    agent.setSharedContext(this.sharedContext);
    this.log(`Agent registered: ${agent.getContext().agentName} (${role})`);
  }

  /**
   * Get a registered agent
   */
  public getAgent(role: AgentRole): BaseAgent | undefined {
    return this.agents.get(role);
  }

  /**
   * Get all registered agents
   */
  public getAllAgents(): BaseAgent[] {
    return Array.from(this.agents.values());
  }

  /**
   * Route a message between agents
   */
  public routeMessage(message: Message): void {
    this.messageHistory.push(message);

    for (const toRole of message.to) {
      const agent = this.getAgent(toRole as AgentRole);
      if (agent) {
        agent.receiveMessage(message);
        this.log(`Message routed from ${message.from} to ${toRole}`);
      }
    }
  }

  /**
   * Create and queue a task
   */
  public createTask(
    title: string,
    description: string,
    assignedTo: AgentRole[],
    priority: "high" | "medium" | "low" = "medium"
  ): Task {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      assignedTo,
      status: TaskStatus.Pending,
      priority,
      createdAt: new Date()
    };

    this.taskQueue.push(task);
    this.companyState.pendingTasks.push(task);
    this.log(`Task created: ${title} (ID: ${task.id})`);

    return task;
  }

  /**
   * Execute a task by delegating to appropriate agent
   */
  public async executeTask(task: Task): Promise<AgentResponse[]> {
    task.status = TaskStatus.InProgress;
    const responses: AgentResponse[] = [];

    for (const role of task.assignedTo) {
      const agent = this.getAgent(role);
      if (agent) {
        try {
          this.log(`Executing task ${task.title} with ${agent.getContext().agentName}`);
          const response = await agent.execute(task);
          responses.push(response);

          // Store response in shared context
          this.sharedContext.set(`task_${task.id}_${role}`, response);
        } catch (error) {
          this.log(`Error executing task with ${role}: ${error}`);
        }
      }
    }

    task.status = TaskStatus.Completed;
    task.completedAt = new Date();

    // Move to completed tasks
    const pendingIndex = this.companyState.pendingTasks.findIndex((t) => t.id === task.id);
    if (pendingIndex > -1) {
      this.companyState.pendingTasks.splice(pendingIndex, 1);
    }
    this.companyState.completedTasks.push(task);

    return responses;
  }

  /**
   * Update shared context that all agents can access
   */
  public updateSharedContext(key: string, value: unknown): void {
    this.sharedContext.set(key, value);
    this.log(`Shared context updated: ${key}`);
  }

  /**
   * Get shared context value
   */
  public getSharedContextValue(key: string): unknown {
    return this.sharedContext.get(key);
  }

  /**
   * Store artifact (design document, code, etc.)
   */
  public storeArtifact(name: string, content: unknown): void {
    this.companyState.artifacts.set(name, content);
    this.log(`Artifact stored: ${name}`);
  }

  /**
   * Retrieve artifact
   */
  public getArtifact(name: string): unknown {
    return this.companyState.artifacts.get(name);
  }

  /**
   * Get company state
   */
  public getCompanyState(): CompanyState {
    return this.companyState;
  }

  /**
   * Get message history
   */
  public getMessageHistory(): Message[] {
    return this.companyState.messageHistory;
  }

  /**
   * Get pending tasks
   */
  public getPendingTasks(): Task[] {
    return this.companyState.pendingTasks;
  }

  /**
   * Get completed tasks
   */
  public getCompletedTasks(): Task[] {
    return this.companyState.completedTasks;
  }

  /**
   * Generate system status report
   */
  public generateStatusReport(): string {
    const report = `
===========================================
        MCP SERVER STATUS REPORT
===========================================

Company Name: ${this.companyState.name}
Server ID: ${this.companyState.id}
Created At: ${this.companyState.createdAt}

REGISTERED AGENTS:
${Array.from(this.agents.values())
  .map((agent) => {
    const ctx = agent.getContext();
    return `  - ${ctx.agentName} (${ctx.role})\n    Capabilities: ${ctx.capabilities.join(", ")}`;
  })
  .join("\n")}

TASK STATUS:
  Completed: ${this.companyState.completedTasks.length}
  Pending: ${this.companyState.pendingTasks.length}
  Total: ${this.companyState.completedTasks.length + this.companyState.pendingTasks.length}

MESSAGE HISTORY:
  Total Messages: ${this.companyState.messageHistory.length}

ARTIFACTS STORED:
  ${this.companyState.artifacts.size} artifacts in repository

SHARED CONTEXT ITEMS:
  ${this.sharedContext.size} items

===========================================
    `;

    return report;
  }

  /**
   * Helper logging method
   */
  private log(message: string): void {
    console.log(`[MCP Server] ${message}`);
  }

  /**
   * Get message history length
   */
  private get messageHistory(): Message[] {
    return this.companyState.messageHistory;
  }
}
