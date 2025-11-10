import "server-only";
import fs from "fs";
import path from "path";

export interface RegistryStep {
  name: string;
  type: string;
  description: string;
  dependencies: string[];
  files: string[];
  category?: string;
  provider?: string;
}

export interface StepDetail extends RegistryStep {
  code: string;
  usage: string;
  envVars: Array<{ name: string; description: string }>;
  title: string;
}

// Get category from step name/description
function getCategoryFromStep(step: RegistryStep): string {
  const name = step.name.toLowerCase();
  const desc = step.description.toLowerCase();

  if (
    name.includes("slack") ||
    name.includes("discord") ||
    name.includes("email") ||
    name.includes("sms")
  ) {
    return "notifications";
  }
  if (name.includes("ai") || name.includes("generate")) {
    return "ai";
  }
  if (
    name.includes("database") ||
    name.includes("query") ||
    name.includes("validate") ||
    name.includes("parse")
  ) {
    return "data";
  }
  if (
    name.includes("upload") ||
    name.includes("storage") ||
    name.includes("blob")
  ) {
    return "storage";
  }
  if (
    name.includes("pdf") ||
    name.includes("qr") ||
    name.includes("image") ||
    name.includes("compress")
  ) {
    return "documents";
  }
  if (
    name.includes("webhook") ||
    name.includes("api") ||
    name.includes("fetch")
  ) {
    return "integrations";
  }
  if (name.includes("scrape") || name.includes("geocode")) {
    return "utilities";
  }

  return "utilities";
}

function getRegistryData() {
  const registryPath = path.join(process.cwd(), "registry.json");
  const fileContent = fs.readFileSync(registryPath, "utf-8");
  return JSON.parse(fileContent);
}

export function getAllSteps(): RegistryStep[] {
  const registryData = getRegistryData();
  return registryData.items.map((step) => ({
    ...step,
    category: getCategoryFromStep(step),
  }));
}

export function getStepByName(name: string): RegistryStep | undefined {
  const registryData = getRegistryData();
  const step = registryData.items.find((s) => s.name === name);
  return step ? { ...step, category: getCategoryFromStep(step) } : undefined;
}

export function getStepDetail(name: string): StepDetail | null {
  const step = getStepByName(name);
  if (!step) return null;

  try {
    // Read the step file
    const filePath = path.join(process.cwd(), step.files[0]?.path || "");
    const code = fs.readFileSync(filePath, "utf-8");

    // Extract env vars from code
    const envVarMatches = code.matchAll(/process\.env\.(\w+)/g);
    const envVars = Array.from(
      new Set([...envVarMatches].map((m) => m[1]))
    ).map((varName) => ({
      name: varName,
      description: getEnvVarDescription(varName),
    }));

    // Generate title from name
    const title = step.name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Generate usage example
    const functionName = extractFunctionName(code);
    const usage = generateUsageExample(functionName, step.name);

    return {
      ...step,
      code,
      usage,
      envVars,
      title,
    };
  } catch (error) {
    console.error(`Error reading step ${name}:`, error);
    return null;
  }
}

function extractFunctionName(code: string): string {
  const match = code.match(/export\s+async\s+function\s+(\w+)/);
  return match ? match[1] : "workflowStep";
}

function generateUsageExample(functionName: string, stepName: string): string {
  return `import { ${functionName} } from './steps/${stepName}';

export async function myWorkflow() {
  'use workflow';

  // Call the step - will automatically retry on transient failures
  const result = await ${functionName}({
    // Add your parameters here
  });

  return result;
}`;
}

function getEnvVarDescription(varName: string): string {
  const descriptions: Record<string, string> = {
    SLACK_BOT_TOKEN: "Your Slack Bot User OAuth Token",
    RESEND_API_KEY: "Your Resend API key for sending emails",
    RESEND_FROM_EMAIL: "Default sender email address",
    TWILIO_ACCOUNT_SID: "Your Twilio Account SID",
    TWILIO_AUTH_TOKEN: "Your Twilio Auth Token",
    TWILIO_PHONE_NUMBER: "Your Twilio phone number",
    OPENAI_API_KEY: "Your OpenAI API key",
    VERCEL_BLOB_READ_WRITE_TOKEN: "Vercel Blob storage token",
    DATABASE_URL: "PostgreSQL database connection string",
    GEOCODING_API_KEY: "API key for geocoding service (e.g., Google Maps)",
  };

  return descriptions[varName] || `Environment variable: ${varName}`;
}
