/**
 * Base Agent Class - Template for all AI agents
 */

import { AgentContext, AgentRole, Message, AgentResponse, Task } from "../types";

export abstract class BaseAgent {
  protected context: AgentContext;
  protected messageQueue: Message[] = [];

  constructor(agentId: string, agentName: string, role: AgentRole, capabilities: string[]) {
    this.context = {
      agentId,
      agentName,
      role,
      capabilities,
      memory: new Map()
    };
  }

  /**
   * Get the agent's context information
   */
  public getContext(): AgentContext {
    return this.context;
  }

  /**
   * Set shared context from MCP server
   */
  public setSharedContext(sharedContext: Map<string, unknown>): void {
    this.context.sharedContext = sharedContext;
  }

  /**
   * Receive a message from another agent
   */
  public receiveMessage(message: Message): void {
    this.messageQueue.push(message);
  }

  /**
   * Get pending messages
   */
  public getMessages(): Message[] {
    return this.messageQueue;
  }

  /**
   * Clear processed messages
   */
  public clearMessages(): void {
    this.messageQueue = [];
  }

  /**
   * Store information in agent memory
   */
  public storeMemory(key: string, value: unknown): void {
    this.context.memory.set(key, value);
  }

  /**
   * Retrieve information from agent memory
   */
  public retrieveMemory(key: string): unknown {
    return this.context.memory.get(key);
  }

  /**
   * Main execution method - must be implemented by subclasses
   */
  abstract execute(task: Task): Promise<AgentResponse>;

  /**
   * Analyze input and generate response
   */
  protected abstract analyze(input: string): Promise<string>;

  /**
   * Helper method to log agent activity
   */
  protected log(message: string): void {
    console.log(`[${this.context.agentName}] ${message}`);
  }
}
