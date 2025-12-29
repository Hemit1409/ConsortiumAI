/**
 * Example Workflow - E-commerce Platform Development
 * Demonstrates the multi-agent system in action
 */

import { MCPServer } from "../src/server/MCPServer";
import { WorkflowOrchestrator } from "../src/orchestrator/WorkflowOrchestrator";
import {
  ProductManagerAgent,
  ArchitectAgent,
  BackendDeveloperAgent,
  FrontendDeveloperAgent,
  QAAgent,
  SecurityEngineerAgent,
  DevOpsEngineerAgent
} from "../src/agents";
import { AgentRole, WorkflowStage, TaskStatus } from "../src/types";

/**
 * Initialize the MCP server with all agents
 */
function initializeMCPServer(): MCPServer {
  const server = new MCPServer("AI E-commerce Software Company");

  // Register all agents
  server.registerAgent(new ProductManagerAgent());
  server.registerAgent(new ArchitectAgent());
  server.registerAgent(new BackendDeveloperAgent());
  server.registerAgent(new FrontendDeveloperAgent());
  server.registerAgent(new QAAgent());
  server.registerAgent(new SecurityEngineerAgent());
  server.registerAgent(new DevOpsEngineerAgent());

  return server;
}

/**
 * Create the e-commerce platform workflow
 */
function createEcommercePlatformWorkflow(): WorkflowStage[] {
  return [
    // Stage 1: Requirements & Planning
    WorkflowOrchestrator.createStage(
      "stage-001",
      "Requirements & Product Planning",
      AgentRole.ProductManager,
      [
        {
          id: "task-001",
          title: "Gather and Analyze Requirements",
          description:
            "Analyze user requirements for an e-commerce platform with product catalog, shopping cart, checkout, and payment processing",
          assignedTo: [AgentRole.ProductManager],
          status: TaskStatus.Pending,
          priority: "high",
          createdAt: new Date()
        }
      ],
      [
        "Requirements documented",
        "MVP scope defined",
        "Feature priorities established",
        "Roadmap created"
      ]
    ),

    // Stage 2: System Architecture Design
    WorkflowOrchestrator.createStage(
      "stage-002",
      "System Architecture & Technology Selection",
      AgentRole.Architect,
      [
        {
          id: "task-002",
          title: "Design System Architecture",
          description:
            "Design the overall system architecture using microservices pattern, select technology stack, and define service interactions",
          assignedTo: [AgentRole.Architect],
          status: TaskStatus.Pending,
          priority: "high",
          createdAt: new Date()
        }
      ],
      [
        "Architecture diagram created",
        "Technology stack selected",
        "Service interactions defined",
        "Scalability plan documented"
      ],
      [AgentRole.Architect, AgentRole.BackendDeveloper, AgentRole.SecurityEngineer]
    ),

    // Stage 3: Backend & Frontend Development
    WorkflowOrchestrator.createStage(
      "stage-003",
      "Backend & Frontend Implementation Design",
      AgentRole.BackendDeveloper,
      [
        {
          id: "task-003",
          title: "Design Backend Implementation",
          description:
            "Design API endpoints, database schema, business logic, and middleware for backend services",
          assignedTo: [AgentRole.BackendDeveloper],
          status: TaskStatus.Pending,
          priority: "high",
          createdAt: new Date()
        },
        {
          id: "task-004",
          title: "Design Frontend Implementation",
          description:
            "Design UI components, page layouts, state management, and API integration for frontend application",
          assignedTo: [AgentRole.FrontendDeveloper],
          status: TaskStatus.Pending,
          priority: "high",
          createdAt: new Date()
        }
      ],
      [
        "API endpoints defined",
        "Database schema designed",
        "Component structure established",
        "State management planned"
      ],
      [AgentRole.BackendDeveloper, AgentRole.FrontendDeveloper]
    ),

    // Stage 4: Security & QA Planning
    WorkflowOrchestrator.createStage(
      "stage-004",
      "Security & Quality Assurance Planning",
      AgentRole.SecurityEngineer,
      [
        {
          id: "task-005",
          title: "Design Security Architecture",
          description:
            "Perform threat modeling, identify vulnerabilities, design authentication and encryption strategies, ensure compliance",
          assignedTo: [AgentRole.SecurityEngineer],
          status: TaskStatus.Pending,
          priority: "high",
          createdAt: new Date()
        },
        {
          id: "task-006",
          title: "Create Comprehensive Test Plan",
          description:
            "Generate test cases, identify edge cases, plan test automation, and define QA strategy",
          assignedTo: [AgentRole.QA],
          status: TaskStatus.Pending,
          priority: "high",
          createdAt: new Date()
        }
      ],
      [
        "Security vulnerabilities identified",
        "Authentication strategy defined",
        "Test cases documented",
        "Quality metrics established"
      ],
      [AgentRole.SecurityEngineer, AgentRole.QA]
    ),

    // Stage 5: DevOps & Deployment
    WorkflowOrchestrator.createStage(
      "stage-005",
      "DevOps & Deployment Strategy",
      AgentRole.DevOpsEngineer,
      [
        {
          id: "task-007",
          title: "Plan CI/CD & Deployment Strategy",
          description:
            "Design CI/CD pipeline, containerization strategy, infrastructure setup, monitoring and scaling solutions",
          assignedTo: [AgentRole.DevOpsEngineer],
          status: TaskStatus.Pending,
          priority: "high",
          createdAt: new Date()
        }
      ],
      [
        "CI/CD pipeline defined",
        "Dockerfiles created",
        "Kubernetes manifests prepared",
        "Monitoring strategy established"
      ],
      [AgentRole.DevOpsEngineer, AgentRole.SecurityEngineer]
    ),

    // Stage 6: Final Review & Compilation
    WorkflowOrchestrator.createStage(
      "stage-006",
      "Final Review & Deliverables Compilation",
      AgentRole.ProductManager,
      [
        {
          id: "task-008",
          title: "Compile Project Deliverables",
          description:
            "Aggregate all design documents, specifications, and plans into a comprehensive project deliverable",
          assignedTo: [
            AgentRole.ProductManager,
            AgentRole.Architect,
            AgentRole.DevOpsEngineer
          ],
          status: TaskStatus.Pending,
          priority: "high",
          createdAt: new Date()
        }
      ],
      [
        "All deliverables compiled",
        "Documentation complete",
        "Project ready for implementation"
      ]
    )
  ];
}

/**
 * Run the example workflow
 */
async function runExampleWorkflow() {
  console.log("\n");
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║   MCP Multi-Agent AI System - E-commerce Platform Example   ║");
  console.log("╚════════════════════════════════════════════════════════════╝");

  // Initialize MCP server and agents
  const mcpServer = initializeMCPServer();

  // Print server status
  console.log(mcpServer.generateStatusReport());

  // Create orchestrator
  const orchestrator = new WorkflowOrchestrator(mcpServer);

  // Define workflow stages
  const stages = createEcommercePlatformWorkflow();

  // Define and execute workflow
  orchestrator.defineWorkflow(
    "E-commerce Platform Development",
    "Complete design and planning for an AI-driven e-commerce platform with microservices architecture",
    "Design and plan a complete e-commerce platform that includes product catalog, shopping cart, checkout, payment processing, user authentication, and admin panel",
    stages
  );

  // Execute the workflow
  const results = await orchestrator.executeWorkflow();

  // Print final report
  console.log("\n" + "=".repeat(70));
  console.log("WORKFLOW EXECUTION SUMMARY");
  console.log("=".repeat(70));

  console.log(`\nTotal Stages: ${orchestrator.getTotalStages()}`);
  console.log(`Completed Tasks: ${mcpServer.getCompletedTasks().length}`);
  console.log(`Pending Tasks: ${mcpServer.getPendingTasks().length}`);

  console.log("\nCompany State:");
  const state = mcpServer.getCompanyState();
  console.log(`  Name: ${state.name}`);
  console.log(`  Company ID: ${state.id}`);
  console.log(`  Artifacts Generated: ${state.artifacts.size}`);
  console.log(`  Message History: ${mcpServer.getMessageHistory().length} messages`);

  console.log("\nAgent Contributions:");
  mcpServer.getAllAgents().forEach((agent) => {
    console.log(`  ✓ ${agent.getContext().agentName}`);
  });

  console.log("\n" + "=".repeat(70));
  console.log("WORKFLOW COMPLETED SUCCESSFULLY");
  console.log("=".repeat(70) + "\n");
}

// Export for use as module or run directly
export { runExampleWorkflow, initializeMCPServer, createEcommercePlatformWorkflow };

// Run if executed directly
if (require.main === module) {
  runExampleWorkflow().catch(console.error);
}
