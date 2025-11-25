import { FormField } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DynamicFormFieldsProps {
  fields: FormField[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
  stepIndex?: number;
}

export default function DynamicFormFields({
  fields,
  values,
  onChange,
  stepIndex = 0,
}: DynamicFormFieldsProps) {
  const renderField = (field: FormField) => {
    const value = values[field.name] || "";
    const fieldId = `${field.name}-${stepIndex}`;

    switch (field.type) {
      case "text":
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={fieldId} className="text-xs font-medium uppercase tracking-wide">
              {field.label} {field.required && "*"}
            </Label>
            <Input
              id={fieldId}
              value={value}
              onChange={(e) => onChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              data-testid={`input-${field.name}-${stepIndex}`}
            />
            {field.description && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={fieldId} className="text-xs font-medium uppercase tracking-wide">
              {field.label} {field.required && "*"}
            </Label>
            <Textarea
              id={fieldId}
              value={value}
              onChange={(e) => onChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className="min-h-32 font-mono text-sm resize-y"
              data-testid={`input-${field.name}-${stepIndex}`}
            />
            {field.description && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
          </div>
        );

      case "select":
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={fieldId} className="text-xs font-medium uppercase tracking-wide">
              {field.label} {field.required && "*"}
            </Label>
            <Select value={value} onValueChange={(val) => onChange(field.name, val)}>
              <SelectTrigger data-testid={`select-${field.name}-${stepIndex}`}>
                <SelectValue placeholder={field.placeholder || "Selecione..."} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field.description && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
          </div>
        );

      case "multiselect":
        const selectedValues = Array.isArray(value) ? value : [];
        return (
          <div key={field.name} className="space-y-3">
            <Label className="text-xs font-medium uppercase tracking-wide">
              {field.label} {field.required && "*"}
            </Label>
            {field.description && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
            <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-3">
              {field.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${fieldId}-${option.value}`}
                    checked={selectedValues.includes(option.value)}
                    onCheckedChange={(checked) => {
                      const newValues = checked
                        ? [...selectedValues, option.value]
                        : selectedValues.filter((v: string) => v !== option.value);
                      onChange(field.name, newValues);
                    }}
                    data-testid={`checkbox-${field.name}-${option.value}`}
                  />
                  <label
                    htmlFor={`${fieldId}-${option.value}`}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            {selectedValues.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Nenhum selecionado (todos serão considerados)
              </p>
            )}
          </div>
        );

      case "date":
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={fieldId} className="text-xs font-medium uppercase tracking-wide">
              {field.label} {field.required && "*"}
            </Label>
            <Input
              id={fieldId}
              type="date"
              value={value}
              onChange={(e) => onChange(field.name, e.target.value)}
              data-testid={`input-${field.name}-${stepIndex}`}
            />
            {field.description && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
          </div>
        );

      case "checkbox":
        return (
          <div key={field.name} className="flex items-center space-x-2">
            <Checkbox
              id={fieldId}
              checked={!!value}
              onCheckedChange={(checked) => onChange(field.name, checked)}
              data-testid={`checkbox-${field.name}-${stepIndex}`}
            />
            <label htmlFor={fieldId} className="text-sm cursor-pointer">
              {field.label} {field.required && "*"}
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="space-y-4">{fields.map((field) => renderField(field))}</div>;
}
