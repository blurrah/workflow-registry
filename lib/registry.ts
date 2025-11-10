import registryData from "@/registry.json";

export interface RegistryStep {
  name: string;
  type: string;
  description: string;
  dependencies: string[];
  files: string[];
  category?: string;
  integrations: string[];
}

// Get integrations from step name
function getIntegrationsFromStep(step: RegistryStep): string[] {
  const name = step.name.toLowerCase();
  const integrations: string[] = [];

  // Check for specific integration services
  if (name.includes("slack")) integrations.push("Slack");
  if (name.includes("discord")) integrations.push("Discord");
  if (name.includes("telegram")) integrations.push("Telegram");
  if (name.includes("email") || name.includes("resend")) integrations.push("Resend");
  if (name.includes("sms") || name.includes("twilio")) integrations.push("Twilio");
  if (name.includes("vercel")) integrations.push("Vercel");
  if (name.includes("github")) integrations.push("GitHub");
  if (name.includes("shopify")) integrations.push("Shopify");
  if (name.includes("notion")) integrations.push("Notion");
  if (name.includes("airtable")) integrations.push("Airtable");
  if (name.includes("google-sheets") || name.includes("sheets")) integrations.push("Google Sheets");
  if (name.includes("google-drive") || name.includes("drive")) integrations.push("Google Drive");
  if (name.includes("openai")) integrations.push("OpenAI");
  if (name.includes("anthropic") || name.includes("claude")) integrations.push("Anthropic");
  
  // If no specific integration found, check for generic services
  if (integrations.length === 0) {
    if (name.includes("pdf")) integrations.push("PDF");
    if (name.includes("qr")) integrations.push("QR Code");
    if (name.includes("image")) integrations.push("Image Processing");
    if (name.includes("csv")) integrations.push("CSV");
    if (name.includes("database")) integrations.push("Database");
  }

  return integrations;
}

// Get category from step name/description
function getCategoryFromStep(step: RegistryStep): string {
  const name = step.name.toLowerCase();

  if (
    name.includes("slack") ||
    name.includes("discord") ||
    name.includes("email") ||
    name.includes("sms") ||
    name.includes("telegram")
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
    name.includes("blob") ||
    name.includes("drive")
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
    name.includes("fetch") ||
    name.includes("vercel") ||
    name.includes("github") ||
    name.includes("shopify") ||
    name.includes("notion") ||
    name.includes("airtable") ||
    name.includes("sheets")
  ) {
    return "integrations";
  }
  if (name.includes("scrape") || name.includes("geocode")) {
    return "utilities";
  }

  return "utilities";
}

export function getAllSteps(): RegistryStep[] {
  return registryData.items.map((step) => ({
    ...step,
    category: getCategoryFromStep(step),
    integrations: getIntegrationsFromStep(step),
  }));
}

export interface IntegrationInfo {
  name: string;
  count: number;
  steps: RegistryStep[];
}

export function getAllIntegrations(): IntegrationInfo[] {
  const steps = getAllSteps();
  const integrationMap = new Map<string, RegistryStep[]>();

  steps.forEach((step) => {
    step.integrations.forEach((integration) => {
      if (!integrationMap.has(integration)) {
        integrationMap.set(integration, []);
      }
      integrationMap.get(integration)!.push(step);
    });
  });

  return Array.from(integrationMap.entries())
    .map(([name, steps]) => ({
      name,
      count: steps.length,
      steps,
    }))
    .sort((a, b) => b.count - a.count);
}

export function getStepByName(name: string): RegistryStep | undefined {
  const step = registryData.items.find((s) => s.name === name);
  return step ? { ...step, category: getCategoryFromStep(step), integrations: getIntegrationsFromStep(step) } : undefined;
}
