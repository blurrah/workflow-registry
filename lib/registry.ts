import registryData from "@/registry.json";

export interface RegistryStep {
  name: string;
  type: string;
  description: string;
  dependencies: string[];
  files: string[];
  category?: string;
  provider?: string;
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
  }));
}

export function getStepByName(name: string): RegistryStep | undefined {
  const step = registryData.steps.find((s) => s.name === name);
  return step ? { ...step, category: getCategoryFromStep(step) } : undefined;
}
