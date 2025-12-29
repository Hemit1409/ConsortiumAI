/**
 * Main Entry Point - MCP Multi-Agent AI System
 */

import { MCPServer } from "./server/MCPServer";
import { WorkflowOrchestrator } from "./orchestrator/WorkflowOrchestrator";
import * as Agents from "./agents";
import { AgentRole } from "./types";

/**
 * Initialize the system
 */
export function initializeSystem(companyName: string = "AI Software Company"): MCPServer {
  const server = new MCPServer(companyName);

  // Register all agents
  server.registerAgent(new Agents.ProductManagerAgent());
  server.registerAgent(new Agents.ArchitectAgent());
  server.registerAgent(new Agents.BackendDeveloperAgent());
  server.registerAgent(new Agents.FrontendDeveloperAgent());
  server.registerAgent(new Agents.QAAgent());
  server.registerAgent(new Agents.SecurityEngineerAgent());
  server.registerAgent(new Agents.DevOpsEngineerAgent());

  return server;
}

/**
 * Get all available agent roles
 */
export function getAvailableAgents(): typeof AgentRole {
  return AgentRole;
}

/**
 * Export core components for external use
 */
export { MCPServer } from "./server/MCPServer";
export { WorkflowOrchestrator } from "./orchestrator/WorkflowOrchestrator";
export * from "./types";
export * from "./agents";

console.log("MCP Multi-Agent AI System initialized successfully");
