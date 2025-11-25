import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PromptConfigFormProps {
  promptName: string;
  promptTemplate: string;
  onPromptNameChange: (value: string) => void;
  onPromptTemplateChange: (value: string) => void;
  stepIndex: number;
}

export default function PromptConfigForm({
  promptName,
  promptTemplate,
  onPromptNameChange,
  onPromptTemplateChange,
  stepIndex,
}: PromptConfigFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`promptName-${stepIndex}`} className="text-xs font-medium uppercase tracking-wide">
          Nome do Prompt *
        </Label>
        <Input
          id={`promptName-${stepIndex}`}
          value={promptName}
          onChange={(e) => onPromptNameChange(e.target.value)}
          placeholder="Ex: prompt-argumentos-trabalhistas"
          data-testid={`input-prompt-name-${stepIndex}`}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`promptTemplate-${stepIndex}`} className="text-xs font-medium uppercase tracking-wide">
          Template do Prompt *
        </Label>
        <Textarea
          id={`promptTemplate-${stepIndex}`}
          value={promptTemplate}
          onChange={(e) => onPromptTemplateChange(e.target.value)}
          placeholder="Ex: Gere argumentos para {tipo_acao} baseado em {fatos_cliente}"
          className="min-h-32 font-mono text-sm resize-y"
          data-testid={`input-prompt-template-${stepIndex}`}
        />
        <p className="text-xs text-muted-foreground">
          Use {"{variavel}"} para placeholders que serão substituídos em tempo de execução
        </p>
      </div>
    </div>
  );
}
