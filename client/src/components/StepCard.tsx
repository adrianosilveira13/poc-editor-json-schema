import { Step, StepDefinition, FormField } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp, GripVertical, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import StepSelector from "./StepSelector";
import ArrayInput from "./ArrayInput";
import DynamicFormFields from "./DynamicFormFields";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

interface StepCardProps {
  step: Step;
  index: number;
  onChange: (step: Step) => void;
  onDelete: () => void;
}

export default function StepCard({ step, index, onChange, onDelete }: StepCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentDefinition, setCurrentDefinition] = useState<StepDefinition | null>(null);

  const { data: stepDefinitions = [] } = useQuery<StepDefinition[]>({
    queryKey: ["/api/step-definitions"],
  });

  useEffect(() => {
    if (stepDefinitions.length > 0 && step.type) {
      const definition = stepDefinitions.find((def) => def.type === step.type);
      if (definition) {
        setCurrentDefinition(definition);
      }
    }
  }, [stepDefinitions, step.type]);

  const updateField = <K extends keyof Step>(field: K, value: Step[K]) => {
    onChange({ ...step, [field]: value });
  };

  const updateParameter = <K extends keyof NonNullable<Step["parameters"]>>(
    field: K,
    value: NonNullable<Step["parameters"]>[K]
  ) => {
    onChange({
      ...step,
      parameters: { ...step.parameters, [field]: value },
    });
  };

  const handleStepTypeChange = (type: Step["type"], definition: StepDefinition) => {
    setCurrentDefinition(definition);
    
    const updatedStep: Step = {
      ...step,
      type,
    };

    if (!definition.requiresPrompt) {
      updatedStep.promptName = undefined;
      updatedStep.promptTemplate = undefined;
    }

    onChange(updatedStep);
  };

  const getFieldStorageLocation = (fieldName: string): FormField | undefined => {
    return currentDefinition?.formFields?.find((field) => field.name === fieldName);
  };

  const handleDynamicFieldChange = (fieldName: string, value: any) => {
    const fieldDef = getFieldStorageLocation(fieldName);
    const storageLocation = fieldDef?.storageLocation || "config";

    if (storageLocation === "prompt") {
      if (fieldName === "promptName" || fieldName === "promptTemplate") {
        updateField(fieldName, value);
      }
    } else if (storageLocation === "parameters") {
      onChange({
        ...step,
        parameters: {
          ...step.parameters,
          [fieldName]: value,
        },
      });
    } else {
      const currentStepConfig = (step.config as any)?.[step.type] || {};
      onChange({
        ...step,
        config: {
          ...step.config,
          [step.type]: {
            ...currentStepConfig,
            [fieldName]: value,
          },
        } as any,
      });
    }
  };

  const getDynamicFieldValues = (): Record<string, any> => {
    const values: Record<string, any> = {};

    currentDefinition?.formFields?.forEach((field) => {
      const { name, storageLocation = "config" } = field;

      if (storageLocation === "prompt") {
        if (name === "promptName" && step.promptName !== undefined) {
          values[name] = step.promptName;
        } else if (name === "promptTemplate" && step.promptTemplate !== undefined) {
          values[name] = step.promptTemplate;
        }
      } else if (storageLocation === "parameters") {
        const paramValue = (step.parameters as any)?.[name];
        if (paramValue !== undefined) {
          values[name] = paramValue;
        }
      } else {
        const configValue = (step.config as any)?.[step.type]?.[name];
        if (configValue !== undefined) {
          values[name] = configValue;
        }
      }
    });

    return values;
  };

  const getStepDisplayName = () => {
    if (currentDefinition?.name) return currentDefinition.name;
    if (step.promptName) return step.promptName;
    return "Sem nome";
  };

  return (
    <Card className="overflow-hidden" data-testid={`card-step-${index}`}>
      <div className="flex items-center gap-3 p-4 border-b">
        <div className="cursor-move text-muted-foreground">
          <GripVertical className="w-5 h-5" />
        </div>
        <div className="flex-1 flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            Step {index + 1}
          </Badge>
          <span className="font-medium text-sm" data-testid={`text-step-name-${index}`}>
            {getStepDisplayName()}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          data-testid={`button-toggle-step-${index}`}
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          data-testid={`button-delete-step-${index}`}
        >
          <Trash2 className="w-4 h-4 text-destructive" />
        </Button>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase tracking-wide">Tipo do Step *</Label>
            <StepSelector
              value={step.type}
              onChange={handleStepTypeChange}
            />
          </div>

          {currentDefinition?.formFields && currentDefinition.formFields.length > 0 && (
            <>
              <div className="border-t pt-4">
                <h4 className="font-medium text-sm mb-4">Configuração do Step</h4>
                <DynamicFormFields
                  fields={currentDefinition.formFields}
                  values={getDynamicFieldValues()}
                  onChange={handleDynamicFieldChange}
                  stepIndex={index}
                />
              </div>
            </>
          )}

          <div className="border-t pt-4 space-y-4">
            <h4 className="font-medium text-sm">Parâmetros de Execução</h4>

            <ArrayInput
              label="Variáveis de Input"
              value={step.parameters?.inputVars || []}
              onChange={(value) => updateParameter("inputVars", value)}
              placeholder="Ex: fatos_cliente"
            />

            <div className="space-y-2">
              <Label htmlFor={`outputVar-${index}`} className="text-xs font-medium uppercase tracking-wide">
                Variável de Saída
              </Label>
              <Input
                id={`outputVar-${index}`}
                value={step.parameters?.outputVar || ""}
                onChange={(e) => updateParameter("outputVar", e.target.value)}
                placeholder="Ex: argumentos_gerados"
                data-testid={`input-output-var-${index}`}
              />
              <p className="text-xs text-muted-foreground">
                Nome da variável que conterá o resultado deste step
              </p>
            </div>

            <ArrayInput
              label="Campos Obrigatórios"
              value={step.parameters?.requiredFields || []}
              onChange={(value) => updateParameter("requiredFields", value)}
              placeholder="Ex: citar-artigo-5"
            />
          </div>
        </div>
      )}
    </Card>
  );
}
