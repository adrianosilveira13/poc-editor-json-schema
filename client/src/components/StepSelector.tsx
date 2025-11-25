import { StepType, StepDefinition } from "@shared/schema";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

interface StepSelectorProps {
  value: StepType | "";
  onChange: (type: StepType, definition: StepDefinition) => void;
}

export default function StepSelector({ value, onChange }: StepSelectorProps) {
  const [open, setOpen] = useState(false);

  const { data: stepDefinitions = [], isLoading } = useQuery<StepDefinition[]>({
    queryKey: ["/api/step-definitions"],
  });

  const selectedDefinition = stepDefinitions.find((def) => def.type === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          data-testid="button-step-selector"
        >
          {selectedDefinition ? selectedDefinition.name : "Selecione o tipo de step..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Buscar step..." />
          <CommandList>
            <CommandEmpty>
              {isLoading ? "Carregando..." : "Nenhum step encontrado."}
            </CommandEmpty>
            {!isLoading && (
              <CommandGroup>
                {stepDefinitions.map((definition) => (
                  <CommandItem
                    key={definition.type}
                    value={definition.name}
                    onSelect={() => {
                      onChange(definition.type, definition);
                      setOpen(false);
                    }}
                    data-testid={`option-step-${definition.type}`}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === definition.type ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{definition.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {definition.description}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {definition.category}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
