import JsonPreview from '../JsonPreview';
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

export default function JsonPreviewExample() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen">
      <JsonPreview
        flow={mockFlow}
        isCollapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />
    </div>
  );
}
