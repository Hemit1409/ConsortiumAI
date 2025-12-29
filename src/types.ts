/**
 * Core types and interfaces for the MCP multi-agent system
 */

export interface AgentContext {
  agentId: string;
  agentName: string;
  role: AgentRole;
  capabilities: string[];
  memory: Map<string, unknown>;
  sharedContext?: Map<string, unknown>;
}

export enum AgentRole {
  ProductManager = "ProductManager",
  Architect = "Architect",
  BackendDeveloper = "BackendDeveloper",
  FrontendDeveloper = "FrontendDeveloper",
  QA = "QA",
  SecurityEngineer = "SecurityEngineer",
  DevOpsEngineer = "DevOpsEngineer"
}

export interface Message {
  id: string;
  from: string;
  to: string[];
  subject: string;
  content: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: AgentRole[];
  status: TaskStatus;
  priority: "high" | "medium" | "low";
  dependencies?: string[];
  output?: string;
  createdAt: Date;
  completedAt?: Date;
}

export enum TaskStatus {
  Pending = "pending",
  InProgress = "in-progress",
  Completed = "completed",
  Failed = "failed",
  Blocked = "blocked"
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  initialPrompt: string;
  stages: WorkflowStage[];
  createdAt: Date;
}

export interface WorkflowStage {
  id: string;
  name: string;
  primaryAgent: AgentRole;
  supportingAgents?: AgentRole[];
  tasks: Task[];
  successCriteria: string[];
}

export interface AgentResponse {
  agentId: string;
  agentRole: AgentRole;
  taskId?: string;
  response: string;
  confidence: number;
  suggestedNextSteps?: string[];
  errors?: string[];
}

export interface CompanyState {
  id: string;
  name: string;
  createdAt: Date;
  currentWorkflow?: WorkflowDefinition;
  completedTasks: Task[];
  pendingTasks: Task[];
  messageHistory: Message[];
  artifacts: Map<string, unknown>;
}
