import { FlowConfig } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FlowListProps {
  flows: FlowConfig[];
  selectedFlowIndex: number | null;
  onSelectFlow: (index: number) => void;
  onCreateFlow: () => void;
}

export default function FlowList({
  flows,
  selectedFlowIndex,
  onSelectFlow,
  onCreateFlow,
}: FlowListProps) {
  return (
    <div className="w-[280px] border-r bg-background flex flex-col h-full">
      <div className="p-4 border-b">
        <Button
          className="w-full"
          onClick={onCreateFlow}
          data-testid="button-create-flow"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Fluxo
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {flows.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Nenhum fluxo criado</p>
            </div>
          ) : (
            flows.map((flow, index) => (
              <Card
                key={index}
                className={`p-4 cursor-pointer hover-elevate ${
                  selectedFlowIndex === index ? "border-primary" : ""
                }`}
                onClick={() => onSelectFlow(index)}
                data-testid={`card-flow-${index}`}
              >
                <h3 className="font-medium text-sm truncate" data-testid={`text-flow-name-${index}`}>
                  {flow.flowName || "Sem nome"}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {flow.steps.length} step{flow.steps.length !== 1 ? "s" : ""}
                </p>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
