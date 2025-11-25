import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface ArrayInputProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export default function ArrayInput({ label, value, onChange, placeholder }: ArrayInputProps) {
  const addItem = () => {
    onChange([...value, ""]);
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, newValue: string) => {
    const newArray = [...value];
    newArray[index] = newValue;
    onChange(newArray);
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium uppercase tracking-wide">{label}</Label>
      <div className="space-y-2">
        {value.map((item, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1"
              data-testid={`input-array-item-${index}`}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
              data-testid={`button-remove-item-${index}`}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={addItem}
          className="w-full"
          data-testid="button-add-item"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar
        </Button>
      </div>
    </div>
  );
}
