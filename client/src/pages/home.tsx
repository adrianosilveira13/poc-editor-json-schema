import { useState, useEffect } from "react";
import { FlowConfig, Step } from "@shared/schema";
import TopBar from "@/components/TopBar";
import FlowList from "@/components/FlowList";
import FlowEditor from "@/components/FlowEditor";
import JsonPreview from "@/components/JsonPreview";
import { saveFlows, loadFlows, exportFlow, importFlow } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export default function Home() {
  const [flows, setFlows] = useState<FlowConfig[]>([]);
  const [selectedFlowIndex, setSelectedFlowIndex] = useState<number | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isPreviewCollapsed, setIsPreviewCollapsed] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadedFlows = loadFlows();
    setFlows(loadedFlows);
    if (loadedFlows.length > 0) {
      setSelectedFlowIndex(0);
    }
  }, []);

  const selectedFlow = selectedFlowIndex !== null ? flows[selectedFlowIndex] : null;

  const createNewFlow = () => {
    const newFlow: FlowConfig = {
      flowName: "Novo Fluxo",
      requiredFiles: [],
      steps: [
        {
          id: generateId(),
          type: "custom",
          promptName: "",
          promptTemplate: "",
          parameters: {
            inputVars: [],
            outputVar: "",
            requiredFields: [],
          },
        },
      ],
    };
    setFlows([...flows, newFlow]);
    setSelectedFlowIndex(flows.length);
    setHasUnsavedChanges(true);
  };

  const updateSelectedFlow = (updatedFlow: FlowConfig) => {
    if (selectedFlowIndex === null) return;
    const newFlows = [...flows];
    newFlows[selectedFlowIndex] = updatedFlow;
    setFlows(newFlows);
    setHasUnsavedChanges(true);
  };

  const saveAllFlows = () => {
    saveFlows(flows);
    setHasUnsavedChanges(false);
    toast({
      title: "Salvo com sucesso",
      description: "Todas as configurações foram salvas localmente.",
    });
  };

  const handleExport = () => {
    if (!selectedFlow) {
      toast({
        title: "Nenhum fluxo selecionado",
        description: "Selecione um fluxo para exportar.",
        variant: "destructive",
      });
      return;
    }
    exportFlow(selectedFlow);
    toast({
      title: "Exportado",
      description: `Fluxo "${selectedFlow.flowName}" exportado com sucesso.`,
    });
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const importedFlow = await importFlow(file);
        setFlows([...flows, importedFlow]);
        setSelectedFlowIndex(flows.length);
        setHasUnsavedChanges(true);
        toast({
          title: "Importado",
          description: `Fluxo "${importedFlow.flowName}" importado com sucesso.`,
        });
      } catch (error) {
        toast({
          title: "Erro ao importar",
          description: error instanceof Error ? error.message : "Arquivo inválido",
          variant: "destructive",
        });
      }
    };
    input.click();
  };

  return (
    <div className="h-screen flex flex-col">
      <TopBar
        onImport={handleImport}
        onExport={handleExport}
        onSave={saveAllFlows}
        hasUnsavedChanges={hasUnsavedChanges}
      />
      <div className="flex-1 flex overflow-hidden">
        <FlowList
          flows={flows}
          selectedFlowIndex={selectedFlowIndex}
          onSelectFlow={setSelectedFlowIndex}
          onCreateFlow={createNewFlow}
        />
        <FlowEditor flow={selectedFlow} onChange={updateSelectedFlow} />
        <JsonPreview
          flow={selectedFlow}
          isCollapsed={isPreviewCollapsed}
          onToggleCollapse={() => setIsPreviewCollapsed(!isPreviewCollapsed)}
        />
      </div>
    </div>
  );
}
