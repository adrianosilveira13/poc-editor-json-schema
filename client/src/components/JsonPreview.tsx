import { FlowConfig, flowConfigSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, CheckCircle2, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ZodError } from "zod";

interface JsonPreviewProps {
  flow: FlowConfig | null;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function JsonPreview({ flow, isCollapsed, onToggleCollapse }: JsonPreviewProps) {
  const [copied, setCopied] = useState(false);

  const validationResult = flow ? validateFlow(flow) : { valid: false, errors: [] };
  const jsonString = flow ? JSON.stringify(flow, null, 2) : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isCollapsed) {
    return (
      <div className="w-12 border-l bg-background flex items-start justify-center pt-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          data-testid="button-expand-preview"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-[360px] border-l bg-background flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-medium">Preview JSON</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            disabled={!flow}
            data-testid="button-copy-json"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            data-testid="button-collapse-preview"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {copied && (
        <div className="px-4 py-2 bg-primary/10 text-primary text-xs text-center">
          JSON copiado!
        </div>
      )}

      <ScrollArea className="flex-1">
        <pre className="p-4 font-mono text-sm" data-testid="text-json-preview">
          {flow ? jsonString : "Selecione um fluxo para visualizar"}
        </pre>
      </ScrollArea>

      <div className="border-t p-4">
        <div className="flex items-start gap-2">
          {validationResult.valid ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-600">Schema válido</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Configuração pronta para uso
                </p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-destructive">Erros de validação</p>
                {validationResult.errors.length > 0 && (
                  <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                    {validationResult.errors.slice(0, 3).map((error, i) => (
                      <li key={i} className="list-disc list-inside">
                        {error}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function validateFlow(flow: FlowConfig): { valid: boolean; errors: string[] } {
  try {
    flowConfigSchema.parse(flow);
    return { valid: true, errors: [] };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        valid: false,
        errors: error.errors.map((e) => `${e.path.join(".")}: ${e.message}`),
      };
    }
    return { valid: false, errors: ["Erro desconhecido"] };
  }
}
