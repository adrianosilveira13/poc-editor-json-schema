import { FlowConfig } from "@shared/schema";

const STORAGE_KEY = "petition-flows";

export function saveFlows(flows: FlowConfig[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(flows));
}

export function loadFlows(): FlowConfig[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function exportFlow(flow: FlowConfig): void {
  const dataStr = JSON.stringify(flow, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  const exportFileDefaultName = `${flow.flowName.replace(/\s+/g, '-')}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

export function importFlow(file: File): Promise<FlowConfig> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const flow = JSON.parse(e.target?.result as string);
        resolve(flow);
      } catch (error) {
        reject(new Error("Arquivo JSON inválido"));
      }
    };
    reader.onerror = () => reject(new Error("Erro ao ler arquivo"));
    reader.readAsText(file);
  });
}
