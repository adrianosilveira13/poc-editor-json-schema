import FlowList from '../FlowList';
import { FlowConfig } from '@shared/schema';
import { useState } from 'react';

const mockFlows: FlowConfig[] = [
  {
    flowName: "Petição Inicial - Direito do Trabalho",
    steps: [
      {
        id: "1",
        type: "gerar-argumentos",
        promptName: "prompt-argumentos-trabalhistas",
        promptTemplate: "Gere argumentos para {tipo_acao}",
        parameters: {
          inputVars: ["tipo_acao", "fatos_cliente"],
          outputVar: "argumentos_gerados",
        },
      },
    ],
  },
  {
    flowName: "Recurso - Direito Civil",
    steps: [
      {
        id: "1",
        type: "resumir-fatos",
        promptName: "resumo-fatos-recurso",
        promptTemplate: "Resuma os fatos principais",
      },
    ],
  },
];

export default function FlowListExample() {
  const [selected, setSelected] = useState<number | null>(0);

  return (
    <div className="h-screen">
      <FlowList
        flows={mockFlows}
        selectedFlowIndex={selected}
        onSelectFlow={(index) => setSelected(index)}
        onCreateFlow={() => console.log('Create flow')}
      />
    </div>
  );
}
