# MCP Multi-Agent System - Quick Reference Card

## System Initialization

```typescript
import { initializeSystem } from "./src/index";
import { WorkflowOrchestrator } from "./src/orchestrator/WorkflowOrchestrator";

const mcpServer = initializeSystem("Company Name");
const orchestrator = new WorkflowOrchestrator(mcpServer);
```

## Available Agent Roles

```typescript
import { AgentRole } from "./src/types";

AgentRole.ProductManager       // Requirements & planning
AgentRole.Architect            // System design
AgentRole.BackendDeveloper     // API & database
AgentRole.FrontendDeveloper    // UI & components
AgentRole.QA                   // Testing & quality
AgentRole.SecurityEngineer     // Security & compliance
AgentRole.DevOpsEngineer       // CI/CD & deployment
```

## Creating a Task

```typescript
const task = {
  id: "task-001",
  title: "Task Name",
  description: "Task description",
  assignedTo: [AgentRole.ProductManager],
  status: "pending" as const,
  priority: "high" as const,
  createdAt: new Date()
};
```

## Creating a Workflow Stage

```typescript
const stage = WorkflowOrchestrator.createStage(
  "stage-id",
  "Stage Name",
  AgentRole.ProductManager,          // Primary agent
  [task1, task2],                    // Tasks
  ["Criterion 1", "Criterion 2"],   // Success criteria
  [AgentRole.Architect]              // Supporting agents (optional)
);
```

## Defining a Workflow

```typescript
orchestrator.defineWorkflow(
  "Project Name",
  "Project Description",
  "Initial requirements/prompt",
  [stage1, stage2, stage3]           // Workflow stages
);
```

## Executing a Workflow

```typescript
const results = await orchestrator.executeWorkflow();
// Returns: Map<string, AgentResponse[]>
```

## Working with Shared Context

```typescript
// Store data accessible to all agents
mcpServer.updateSharedContext("requirements", { /* data */ });

// Retrieve shared data
const data = mcpServer.getSharedContextValue("requirements");
```

## Storing Artifacts

```typescript
// Store design documents, specs, etc.
mcpServer.storeArtifact("api-specification", apiSpec);

// Retrieve artifacts
const spec = mcpServer.getArtifact("api-specification");
```

## Getting Status Information

```typescript
// Get company state
const state = mcpServer.getCompanyState();

// Get task lists
const completed = mcpServer.getCompletedTasks();
const pending = mcpServer.getPendingTasks();

// Get message history
const messages = mcpServer.getMessageHistory();

// Generate status report
const report = mcpServer.generateStatusReport();
console.log(report);
```

## Agent Response Structure

```typescript
interface AgentResponse {
  agentId: string;                  // Agent identifier
  agentRole: AgentRole;             // Agent's role
  taskId?: string;                  // Task being executed
  response: string;                 // Generated output
  confidence: number;               // 0.0 to 1.0 confidence
  suggestedNextSteps?: string[];    // Recommended actions
  errors?: string[];               // Any errors
}
```

## Company State Structure

```typescript
interface CompanyState {
  id: string;                      // Company ID
  name: string;                    // Company name
  createdAt: Date;                 // Creation time
  currentWorkflow?: WorkflowDefinition;
  completedTasks: Task[];          // Finished tasks
  pendingTasks: Task[];            // Pending tasks
  messageHistory: Message[];       // All messages
  artifacts: Map<string, unknown>; // Stored artifacts
}
```

## Creating a Custom Agent

```typescript
import { BaseAgent } from "./src/agents/BaseAgent";
import { AgentRole, Task, AgentResponse } from "./src/types";

export class CustomAgent extends BaseAgent {
  constructor() {
    super(
      "custom-id",
      "Agent Name",
      AgentRole.ProductManager, // Use appropriate role
      ["capability1", "capability2"]
    );
  }

  async execute(task: Task): Promise<AgentResponse> {
    const response = await this.analyze(task.description);
    return {
      agentId: this.context.agentId,
      agentRole: this.context.role,
      taskId: task.id,
      response,
      confidence: 0.85
    };
  }

  protected async analyze(input: string): Promise<string> {
    // Custom logic here
    return `Analysis of: ${input}`;
  }
}

// Register with server
mcpServer.registerAgent(new CustomAgent());
```

## Running the Example

```bash
npm run example
```

## Project Scripts

```bash
npm install        # Install dependencies
npm run build      # Build TypeScript
npm run dev        # Run in development
npm run example    # Run example workflow
npm test          # Run tests (if configured)
```

## File Locations

```
Project Root: mcp-multi-agent-company/

Key Files:
- src/index.ts                          Main entry point
- src/server/MCPServer.ts              MCP Server
- src/orchestrator/WorkflowOrchestrator.ts  Orchestrator
- src/agents/                          All agents
- src/types.ts                         Type definitions
- examples/run-workflow.ts             Example usage

Documentation:
- README.md                            Overview
- docs/ARCHITECTURE.md                 Technical design
- docs/USER_GUIDE.md                   Usage guide
- PROJECT_SUMMARY.md                   Project summary
```

## Common Patterns

### Pattern 1: Simple Single-Stage Workflow
```typescript
const stages = [
  WorkflowOrchestrator.createStage(
    "s1", "Planning", AgentRole.ProductManager,
    [task], ["Complete"]
  )
];

orchestrator.defineWorkflow("Simple", "Desc", "Prompt", stages);
await orchestrator.executeWorkflow();
```

### Pattern 2: Multi-Agent Parallel Execution
```typescript
const task = {
  assignedTo: [
    AgentRole.BackendDeveloper,
    AgentRole.FrontendDeveloper  // Run simultaneously
  ]
};
```

### Pattern 3: Sequential Stages with Dependencies
```typescript
// Stage 1 → Stage 2 → Stage 3
// Each stage uses results from previous stage
const stages = [stage1, stage2, stage3];
```

### Pattern 4: Export Results
```typescript
import fs from "fs";

const state = mcpServer.getCompanyState();
fs.writeFileSync(
  "output.json",
  JSON.stringify({
    company: { id: state.id, name: state.name },
    tasks: mcpServer.getCompletedTasks(),
    artifacts: Array.from(state.artifacts.entries())
  }, null, 2)
);
```

## Common Task Priorities

```typescript
"high"      // Critical, blocking path
"medium"    // Important but not blocking
"low"       // Nice to have, can defer
```

## Task Status Values

```typescript
TaskStatus.Pending     // Not yet started
TaskStatus.InProgress  // Currently executing
TaskStatus.Completed   // Finished successfully
TaskStatus.Failed      // Failed execution
TaskStatus.Blocked     // Waiting on dependency
```

## Agent Capabilities by Role

### ProductManager
- requirement_gathering
- feature_definition
- priority_analysis
- mvp_scope_definition
- roadmap_planning

### Architect
- architecture_design
- technology_selection
- system_integration
- data_flow_definition
- scalability_planning

### BackendDeveloper
- api_design
- database_schema
- business_logic
- integration_planning
- performance_optimization

### FrontendDeveloper
- ui_design
- component_structure
- state_management
- api_integration
- responsive_design

### QA
- test_case_generation
- edge_case_identification
- requirement_verification
- defect_detection
- test_automation

### SecurityEngineer
- threat_modeling
- vulnerability_assessment
- authentication_design
- encryption_strategy
- compliance_planning

### DevOpsEngineer
- cicd_planning
- containerization
- deployment_strategy
- infrastructure_automation
- monitoring_setup

## Debugging Tips

1. **Check Agent Registration**
   ```typescript
   const agent = mcpServer.getAgent(AgentRole.ProductManager);
   if (!agent) console.log("Agent not registered!");
   ```

2. **View Task Status**
   ```typescript
   const pending = mcpServer.getPendingTasks();
   const completed = mcpServer.getCompletedTasks();
   ```

3. **Check Shared Context**
   ```typescript
   const value = mcpServer.getSharedContextValue("key");
   console.log("Context value:", value);
   ```

4. **Get Full Status Report**
   ```typescript
   console.log(mcpServer.generateStatusReport());
   ```

5. **View All Artifacts**
   ```typescript
   const artifacts = mcpServer.getCompanyState().artifacts;
   artifacts.forEach((content, name) => console.log(name, content));
   ```

## Performance Tips

1. **Parallel Agent Execution**: Assign multiple agents to same task
2. **Caching**: Store frequently accessed data in shared context
3. **Artifact Management**: Retrieve artifacts only when needed
4. **Message Queue**: Monitor queue size for bottlenecks
5. **Logging**: Use sparingly in production for better performance

## Resources

- **Main README**: `README.md` - Project overview
- **Architecture Guide**: `docs/ARCHITECTURE.md` - Design details
- **User Guide**: `docs/USER_GUIDE.md` - Detailed usage
- **Example Workflow**: `examples/run-workflow.ts` - Running example
- **Type Definitions**: `src/types.ts` - All interfaces

---

**Print this card and keep it handy for quick reference!**

Version 1.0 | January 2024
