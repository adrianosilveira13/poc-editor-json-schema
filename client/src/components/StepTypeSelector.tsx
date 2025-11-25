import { StepType } from "@shared/schema";
import { Badge } from "@/components/ui/badge";

interface StepTypeSelectorProps {
  value: StepType;
  onChange: (type: StepType) => void;
}

const stepTypes: { value: StepType; label: string }[] = [
  { value: "gerar-argumentos", label: "Gerar Tópicos" },
  { value: "inserir-jurisprudencia", label: "Gerar Ementa Fake" },
  { value: "resumir-fatos", label: "Gerar Jurisprudência" },
  { value: "gerar-pedido-final", label: "Escrever Tópicos" },
  { value: "custom", label: "Custom" },
];

export default function StepTypeSelector({ value, onChange }: StepTypeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {stepTypes.map((type) => (
        <Badge
          key={type.value}
          variant={value === type.value ? "default" : "outline"}
          className="cursor-pointer hover-elevate"
          onClick={() => onChange(type.value)}
          data-testid={`badge-type-${type.value}`}
        >
          {type.label}
        </Badge>
      ))}
    </div>
  );
}
