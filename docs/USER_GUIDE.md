# MCP Multi-Agent AI System - User Guide

## Table of Contents

1. [Getting Started](#getting-started)
2. [Quick Start](#quick-start)
3. [Running Your First Workflow](#running-your-first-workflow)
4. [Creating Custom Workflows](#creating-custom-workflows)
5. [Working with Agents](#working-with-agents)
6. [Advanced Usage](#advanced-usage)
7. [API Reference](#api-reference)
8. [Examples & Recipes](#examples--recipes)
9. [FAQ](#faq)
10. [Support & Resources](#support--resources)

## Getting Started

### System Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher (or yarn 3.0+)
- **RAM**: Minimum 2GB recommended
- **Disk Space**: 500MB for project and dependencies
- **Operating System**: Windows, macOS, or Linux

### Installation

1. **Clone or Extract Project**
   ```bash
   cd mcp-multi-agent-company
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build TypeScript**
   ```bash
   npm run build
   ```

4. **Verify Installation**
   ```bash
   npm run example
   ```

If the example runs successfully, you're ready to go!

## Quick Start

### 5-Minute Quick Start

1. **Create a new file** `my-first-workflow.ts`:

```typescript
import { initializeSystem } from "./src/index";
import { WorkflowOrchestrator } from "./src/orchestrator/WorkflowOrchestrator";
import { AgentRole } from "./src/types";

async function main() {
  // 1. Initialize the system
  const mcpServer = initializeSystem("My First Company");
  
  // 2. Create orchestrator
  const orchestrator = new WorkflowOrchestrator(mcpServer);
  
  // 3. Define workflow stages
  const stages = [
    WorkflowOrchestrator.createStage(
      "stage-1",
      "Requirements",
      AgentRole.ProductManager,
      [
        {
          id: "task-1",
          title: "Analyze Requirements",
          description: "Analyze user requirements for a TODO app",
          assignedTo: [AgentRole.ProductManager],
          status: "pending",
          priority: "high",
          createdAt: new Date()
        }
      ],
      ["Requirements documented"]
    )
  ];
  
  // 4. Create and execute workflow
  orchestrator.defineWorkflow(
    "TODO App Development",
    "Develop a simple TODO application",
    "Build a web-based TODO app with auth and database",
    stages
  );
  
  // 5. Execute and see results
  const results = await orchestrator.executeWorkflow();
  console.log("Workflow completed!");
}

main().catch(console.error);
```

2. **Run it**:
   ```bash
   npx ts-node my-first-workflow.ts
   ```

## Running Your First Workflow

### The E-commerce Example

The project includes a complete e-commerce platform example:

```bash
npm run example
```

**What It Does**:
1. Creates 7 AI agents (PM, Architect, Backend Dev, Frontend Dev, QA, Security, DevOps)
2. Executes 6 workflow stages
3. Generates complete specification for an e-commerce platform
4. Outputs architecture diagrams, API specs, database schemas, test plans, security design, and deployment strategy

### Output Analysis

When you run the example, you'll see:

```
[Orchestrator] Starting workflow: E-commerce Platform Development

========== STAGE 1: Requirements & Product Planning ==========
[ProductManager] Response:
  Product Requirements Analysis
  1. User Stories & Use Cases...
  
Confidence: 85.0%

========== STAGE 2: System Architecture & Technology Selection ==========
[Architect] Response:
  System Architecture Design
  1. Architecture Pattern: Microservices...
```

Each section shows:
- **Stage Name** and **Agent** executing
- **Detailed Response** from the agent
- **Confidence Score** indicating quality
- **Suggested Next Steps** for implementation

## Creating Custom Workflows

### Step 1: Define Your Project

```typescript
const projectName = "My Amazing Product";
const projectDescription = "A description of what you're building";
const initialPrompt = "Your detailed requirements and goals";
```

### Step 2: Design Workflow Stages

Each stage represents a work phase:

```typescript
const stages = [
  // Stage 1: Requirements
  WorkflowOrchestrator.createStage(
    "stage-requirements",
    "Requirements Analysis",
    AgentRole.ProductManager,
    [
      {
        id: "task-001",
        title: "Gather Requirements",
        description: "Analyze project requirements",
        assignedTo: [AgentRole.ProductManager],
        status: "pending",
        priority: "high",
        createdAt: new Date()
      }
    ],
    ["Requirements documented", "Scope defined"]
  ),
  
  // Stage 2: Architecture Design
  WorkflowOrchestrator.createStage(
    "stage-architecture",
    "Architecture Design",
    AgentRole.Architect,
    [
      {
        id: "task-002",
        title: "Design System Architecture",
        description: "Create architecture for the system",
        assignedTo: [AgentRole.Architect],
        status: "pending",
        priority: "high",
        createdAt: new Date()
      }
    ],
    ["Architecture designed"],
    [AgentRole.SecurityEngineer] // Supporting agents
  ),
  
  // ... add more stages as needed
];
```

### Step 3: Execute the Workflow

```typescript
import { initializeSystem } from "./src/index";
import { WorkflowOrchestrator } from "./src/orchestrator/WorkflowOrchestrator";

async function runWorkflow() {
  const mcpServer = initializeSystem("My Company");
  const orchestrator = new WorkflowOrchestrator(mcpServer);
  
  orchestrator.defineWorkflow(
    "My Project Name",
    "Project description",
    "Initial prompt/requirements",
    stages
  );
  
  const results = await orchestrator.executeWorkflow();
  
  console.log("Workflow Results:", results);
  console.log("Company Status:", mcpServer.generateStatusReport());
}

runWorkflow();
```

### Step 4: Capture Results

```typescript
// Get completed tasks
const completedTasks = mcpServer.getCompletedTasks();

// Get message history
const messages = mcpServer.getMessageHistory();

// Get artifacts
const artifacts = mcpServer.getCompanyState().artifacts;

// Save to file
const state = mcpServer.getCompanyState();
// ... save state to JSON/database
```

## Working with Agents

### Available Agents

```typescript
import { AgentRole } from "./src/types";

// Available roles:
// AgentRole.ProductManager
// AgentRole.Architect
// AgentRole.BackendDeveloper
// AgentRole.FrontendDeveloper
// AgentRole.QA
// AgentRole.SecurityEngineer
// AgentRole.DevOpsEngineer
```

### Agent Capabilities

**ProductManagerAgent**:
- ✓ Requirement gathering
- ✓ Feature prioritization
- ✓ MVP scope definition
- ✓ Roadmap creation

**ArchitectAgent**:
- ✓ System design
- ✓ Technology selection
- ✓ Integration planning
- ✓ Scalability design

**BackendDeveloperAgent**:
- ✓ API design
- ✓ Database schema
- ✓ Business logic
- ✓ Performance optimization

**FrontendDeveloperAgent**:
- ✓ UI/UX design
- ✓ Component structure
- ✓ State management
- ✓ Responsive design

**QAAgent**:
- ✓ Test case generation
- ✓ Edge case identification
- ✓ Test automation planning
- ✓ Quality metrics

**SecurityEngineerAgent**:
- ✓ Threat modeling
- ✓ Vulnerability assessment
- ✓ Authentication design
- ✓ Compliance planning

**DevOpsEngineerAgent**:
- ✓ CI/CD planning
- ✓ Containerization
- ✓ Infrastructure automation
- ✓ Deployment strategy

### Assigning Tasks to Agents

```typescript
// Single agent
const task1 = {
  assignedTo: [AgentRole.ProductManager]
};

// Multiple agents (parallel)
const task2 = {
  assignedTo: [
    AgentRole.BackendDeveloper,
    AgentRole.FrontendDeveloper
  ]
};
```

### Custom Agent Creation

Create a specialized agent:

```typescript
import { BaseAgent } from "./src/agents/BaseAgent";
import { AgentRole, Task, AgentResponse } from "./src/types";

export class MyCustomAgent extends BaseAgent {
  constructor() {
    super(
      "custom-001",
      "My Custom Agent",
      AgentRole.ProductManager, // Use appropriate role or create new enum
      ["capability1", "capability2"]
    );
  }

  async execute(task: Task): Promise<AgentResponse> {
    try {
      const response = await this.analyze(task.description);
      return {
        agentId: this.context.agentId,
        agentRole: this.context.role,
        taskId: task.id,
        response: response,
        confidence: 0.85
      };
    } catch (error) {
      return {
        agentId: this.context.agentId,
        agentRole: this.context.role,
        taskId: task.id,
        response: "Failed",
        confidence: 0,
        errors: [String(error)]
      };
    }
  }

  protected async analyze(input: string): Promise<string> {
    // Your custom logic here
    return `Custom analysis of: ${input}`;
  }
}

// Register with server
const mcpServer = initializeSystem();
mcpServer.registerAgent(new MyCustomAgent());
```

## Advanced Usage

### Working with Shared Context

```typescript
// Store shared data
mcpServer.updateSharedContext("project_budget", {
  total: 100000,
  allocated: { backend: 30000, frontend: 25000 }
});

// Agents can access it
const budget = mcpServer.getSharedContextValue("project_budget");

// Useful for:
// - Sharing design decisions
// - Passing requirements between agents
// - Maintaining project constraints
// - Storing calculations/analyses
```

### Artifact Management

```typescript
// Store design documents
mcpServer.storeArtifact("api-spec", {
  endpoints: [...],
  schema: {...}
});

// Retrieve for export
const apiSpec = mcpServer.getArtifact("api-spec");

// Export all artifacts
const artifacts = mcpServer.getCompanyState().artifacts;
artifacts.forEach((content, name) => {
  // Save to file
  // Export to database
  // Generate documentation
});
```

### Task Dependencies

```typescript
const designTask = {
  id: "task-design",
  title: "Design Architecture",
  // ...
};

const implementationTask = {
  id: "task-impl",
  title: "Implement Backend",
  dependencies: ["task-design"], // Wait for design first
  // ...
};
```

### Workflow State Tracking

```typescript
// Check progress
console.log("Completed:", mcpServer.getCompletedTasks().length);
console.log("Pending:", mcpServer.getPendingTasks().length);

// Get detailed state
const state = mcpServer.getCompanyState();
console.log("Messages:", state.messageHistory.length);
console.log("Artifacts:", state.artifacts.size);

// Generate report
const report = mcpServer.generateStatusReport();
console.log(report);
```

## API Reference

### MCPServer Class

```typescript
class MCPServer {
  // Agent Management
  registerAgent(agent: BaseAgent): void
  getAgent(role: AgentRole): BaseAgent | undefined
  getAllAgents(): BaseAgent[]
  
  // Task Management
  createTask(...): Task
  executeTask(task: Task): Promise<AgentResponse[]>
  getPendingTasks(): Task[]
  getCompletedTasks(): Task[]
  
  // Context Management
  updateSharedContext(key: string, value: unknown): void
  getSharedContextValue(key: string): unknown
  
  // Artifact Management
  storeArtifact(name: string, content: unknown): void
  getArtifact(name: string): unknown
  
  // State & Monitoring
  getCompanyState(): CompanyState
  getMessageHistory(): Message[]
  generateStatusReport(): string
  
  // Message Routing
  routeMessage(message: Message): void
}
```

### WorkflowOrchestrator Class

```typescript
class WorkflowOrchestrator {
  // Workflow Management
  defineWorkflow(...): WorkflowDefinition
  executeWorkflow(): Promise<Map<string, AgentResponse[]>>
  getCurrentWorkflow(): WorkflowDefinition | undefined
  
  // Stage Management
  getStage(index: number): WorkflowStage | undefined
  getTotalStages(): number
  
  // Static Helper
  static createStage(...): WorkflowStage
}
```

### BaseAgent Class

```typescript
abstract class BaseAgent {
  // Context Access
  getContext(): AgentContext
  setSharedContext(context: Map<string, unknown>): void
  
  // Memory Management
  storeMemory(key: string, value: unknown): void
  retrieveMemory(key: string): unknown
  
  // Communication
  receiveMessage(message: Message): void
  getMessages(): Message[]
  clearMessages(): void
  
  // Abstract Methods
  abstract execute(task: Task): Promise<AgentResponse>
  abstract analyze(input: string): Promise<string>
}
```

## Examples & Recipes

### Recipe 1: Two-Stage Simple Project

```typescript
const stages = [
  WorkflowOrchestrator.createStage(
    "planning",
    "Planning",
    AgentRole.ProductManager,
    [/* tasks */],
    ["Plan complete"]
  ),
  WorkflowOrchestrator.createStage(
    "execution",
    "Execution",
    AgentRole.Architect,
    [/* tasks */],
    ["Architecture complete"]
  )
];
```

### Recipe 2: Parallel Agent Execution

```typescript
const task = {
  assignedTo: [
    AgentRole.BackendDeveloper,
    AgentRole.FrontendDeveloper,
    AgentRole.QAAgent // All execute simultaneously
  ]
};
```

### Recipe 3: Export Results to JSON

```typescript
import fs from "fs";

const state = mcpServer.getCompanyState();
const output = {
  company: {
    id: state.id,
    name: state.name,
    createdAt: state.createdAt
  },
  tasks: {
    completed: mcpServer.getCompletedTasks(),
    pending: mcpServer.getPendingTasks()
  },
  artifacts: Array.from(state.artifacts.entries()).map(([name, content]) => ({
    name,
    content
  }))
};

fs.writeFileSync("project-output.json", JSON.stringify(output, null, 2));
```

### Recipe 4: Build Custom Workflow Template

```typescript
function createCompleteWorkflow(projectName: string, description: string) {
  return [
    // Requirements stage
    WorkflowOrchestrator.createStage("s1", "Requirements", AgentRole.ProductManager, [...], [...]),
    // Architecture stage
    WorkflowOrchestrator.createStage("s2", "Architecture", AgentRole.Architect, [...], [...]),
    // Development stage
    WorkflowOrchestrator.createStage("s3", "Development", AgentRole.BackendDeveloper, [...], [...]),
    // QA stage
    WorkflowOrchestrator.createStage("s4", "Quality Assurance", AgentRole.QA, [...], [...]),
    // Deployment stage
    WorkflowOrchestrator.createStage("s5", "Deployment", AgentRole.DevOpsEngineer, [...], [...])
  ];
}
```

## FAQ

### Q: How many agents can I register?
**A**: Unlimited. You can register any number of agent instances, including custom agents.

### Q: Can agents communicate directly?
**A**: Agents communicate through the MCP Server via messages and shared context. Direct agent-to-agent communication is routed through the server.

### Q: What happens if a task fails?
**A**: The agent returns an AgentResponse with errors and confidence = 0. The task is marked as failed but doesn't stop the workflow.

### Q: Can I run workflows in parallel?
**A**: The current implementation runs stages sequentially, but tasks within a stage can execute in parallel if assigned to multiple agents.

### Q: How do I persist workflow results?
**A**: Export the CompanyState to JSON/database using the getCompanyState() method.

### Q: Can I pause and resume workflows?
**A**: Not in the current implementation, but you can save state and reconstruct from saved CompanyState.

### Q: What's the maximum workflow size?
**A**: Limited by available memory. For large workflows, consider breaking into multiple smaller workflows.

## Support & Resources

### Documentation Files
- `README.md` - Project overview and setup
- `docs/ARCHITECTURE.md` - Technical architecture details
- `docs/USER_GUIDE.md` - This file

### Code Examples
- `examples/run-workflow.ts` - Complete e-commerce workflow example

### Getting Help
1. Check FAQ section above
2. Review example code in `examples/`
3. Read ARCHITECTURE.md for technical details
4. Examine agent implementations in `src/agents/`

### Additional Resources
- TypeScript documentation: https://www.typescriptlang.org/docs/
- Node.js documentation: https://nodejs.org/docs/
- MCP Specification: Model Context Protocol documentation

---

**Version**: 1.0.0  
**Last Updated**: January 2024
