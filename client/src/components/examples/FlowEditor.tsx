import FlowEditor from '../FlowEditor';
import { FlowConfig } from '@shared/schema';
import { useState } from 'react';

const mockFlow: FlowConfig = {
  flowName: "Petição Inicial - Direito do Trabalho",
  steps: [
    {
      id: "1",
      type: "gerar-argumentos",
      promptName: "prompt-argumentos-trabalhistas",
      promptTemplate: "Gere argumentos para {tipo_acao} baseado em {fatos_cliente}",
      parameters: {
        inputVars: ["tipo_acao", "fatos_cliente"],
        outputVar: "argumentos_gerados",
      },
    },
  ],
};

export default function FlowEditorExample() {
  const [flow, setFlow] = useState<FlowConfig>(mockFlow);

  return (
    <div className="h-screen">
      <FlowEditor flow={flow} onChange={setFlow} />
    </div>
  );
}
