import { FlowConfig, Step } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, FileQuestion } from "lucide-react";
import StepCard from "./StepCard";
import FileSelector from "./FileSelector";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface FlowEditorProps {
  flow: FlowConfig | null;
  onChange: (flow: FlowConfig) => void;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export default function FlowEditor({ flow, onChange }: FlowEditorProps) {
  if (!flow) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center max-w-sm">
          <FileQuestion className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium mb-2">Nenhum fluxo selecionado</h3>
          <p className="text-sm text-muted-foreground">
            Selecione um fluxo existente ou crie um novo para começar a editar
          </p>
        </div>
      </div>
    );
  }

  const updateFlowName = (flowName: string) => {
    onChange({ ...flow, flowName });
  };

  const updateRequiredFiles = (files: string[]) => {
    onChange({ ...flow, requiredFiles: files });
  };

  const addStep = () => {
    const newStep: Step = {
      id: generateId(),
      type: "custom",
      promptName: "",
      promptTemplate: "",
      parameters: {
        inputVars: [],
        outputVar: "",
        requiredFields: [],
      },
    };
    onChange({ ...flow, steps: [...flow.steps, newStep] });
  };

  const updateStep = (index: number, step: Step) => {
    const newSteps = [...flow.steps];
    newSteps[index] = step;
    onChange({ ...flow, steps: newSteps });
  };

  const deleteStep = (index: number) => {
    onChange({ ...flow, steps: flow.steps.filter((_, i) => i !== index) });
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <ScrollArea className="flex-1">
        <div className="max-w-4xl mx-auto px-8 py-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="flowName" className="text-xs font-medium uppercase tracking-wide">
              Nome do Fluxo *
            </Label>
            <Input
              id="flowName"
              value={flow.flowName}
              onChange={(e) => updateFlowName(e.target.value)}
              placeholder="Ex: Petição Inicial - Direito do Trabalho"
              className="text-2xl h-auto py-3 font-medium border-0 border-b rounded-none focus-visible:ring-0 focus-visible:border-primary px-0"
              data-testid="input-flow-name"
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <h2 className="text-lg font-medium">Arquivos de Entrada</h2>
            <p className="text-sm text-muted-foreground">
              Selecione os arquivos que serão processados por este fluxo (opcional, máximo 2)
            </p>
            <FileSelector
              selectedFiles={flow.requiredFiles || []}
              onChange={updateRequiredFiles}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Steps</h2>
              <Button onClick={addStep} size="sm" data-testid="button-add-step">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Step
              </Button>
            </div>

            <div className="space-y-4">
              {flow.steps.map((step, index) => (
                <StepCard
                  key={step.id}
                  step={step}
                  index={index}
                  onChange={(updatedStep) => updateStep(index, updatedStep)}
                  onDelete={() => deleteStep(index)}
                />
              ))}

              {flow.steps.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground text-sm">
                    Nenhum step adicionado. Clique em "Adicionar Step" para começar.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
