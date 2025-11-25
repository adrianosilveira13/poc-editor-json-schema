import { JurisprudenciaConfig } from "@shared/schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface JurisprudenciaConfigFormProps {
  config: JurisprudenciaConfig;
  onChange: (config: JurisprudenciaConfig) => void;
}

const tribunaisDisponiveis = [
  { id: "stf", name: "STF - Supremo Tribunal Federal" },
  { id: "stj", name: "STJ - Superior Tribunal de Justiça" },
  { id: "tst", name: "TST - Tribunal Superior do Trabalho" },
  { id: "trf1", name: "TRF1 - Tribunal Regional Federal da 1ª Região" },
  { id: "trf2", name: "TRF2 - Tribunal Regional Federal da 2ª Região" },
  { id: "trf3", name: "TRF3 - Tribunal Regional Federal da 3ª Região" },
  { id: "trf4", name: "TRF4 - Tribunal Regional Federal da 4ª Região" },
  { id: "trf5", name: "TRF5 - Tribunal Regional Federal da 5ª Região" },
  { id: "tjsp", name: "TJSP - Tribunal de Justiça de São Paulo" },
  { id: "tjrj", name: "TJRJ - Tribunal de Justiça do Rio de Janeiro" },
];

export default function JurisprudenciaConfigForm({
  config,
  onChange,
}: JurisprudenciaConfigFormProps) {
  const selectedTribunais = config.tribunais || [];

  const toggleTribunal = (tribunalId: string) => {
    const newTribunais = selectedTribunais.includes(tribunalId)
      ? selectedTribunais.filter((id) => id !== tribunalId)
      : [...selectedTribunais, tribunalId];
    onChange({ ...config, tribunais: newTribunais });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Label className="text-xs font-medium uppercase tracking-wide">
          Tribunais para Busca
        </Label>
        <div className="space-y-2 max-h-48 overflow-y-auto border rounded-md p-3">
          {tribunaisDisponiveis.map((tribunal) => (
            <div key={tribunal.id} className="flex items-center space-x-2">
              <Checkbox
                id={`tribunal-${tribunal.id}`}
                checked={selectedTribunais.includes(tribunal.id)}
                onCheckedChange={() => toggleTribunal(tribunal.id)}
                data-testid={`checkbox-tribunal-${tribunal.id}`}
              />
              <label
                htmlFor={`tribunal-${tribunal.id}`}
                className="text-sm cursor-pointer flex-1"
              >
                {tribunal.name}
              </label>
            </div>
          ))}
        </div>
        {selectedTribunais.length === 0 && (
          <p className="text-xs text-muted-foreground">
            Nenhum tribunal selecionado (todos serão buscados)
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dataInicio" className="text-xs font-medium uppercase tracking-wide">
            Data Início
          </Label>
          <Input
            id="dataInicio"
            type="date"
            value={config.dataInicio || ""}
            onChange={(e) => onChange({ ...config, dataInicio: e.target.value })}
            data-testid="input-data-inicio"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataFim" className="text-xs font-medium uppercase tracking-wide">
            Data Fim
          </Label>
          <Input
            id="dataFim"
            type="date"
            value={config.dataFim || ""}
            onChange={(e) => onChange({ ...config, dataFim: e.target.value })}
            data-testid="input-data-fim"
          />
        </div>
      </div>
    </div>
  );
}
