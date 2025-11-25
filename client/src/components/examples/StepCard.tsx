import StepCard from '../StepCard';
import { Step } from '@shared/schema';
import { useState } from 'react';

const mockStep: Step = {
  id: "1",
  type: "gerar-argumentos",
  promptName: "prompt-argumentos-trabalhistas",
  promptTemplate: "Gere argumentos para {tipo_acao} baseado em {fatos_cliente} citando {leis_relevantes}.",
  parameters: {
    inputVars: ["fatos_cliente", "leis_relevantes"],
    outputVar: "argumentos_gerados",
    requiredFields: ["citar-artigo-5"],
  },
};

export default function StepCardExample() {
  const [step, setStep] = useState<Step>(mockStep);

  return (
    <div className="p-8 max-w-2xl">
      <StepCard
        step={step}
        index={0}
        onChange={setStep}
        onDelete={() => console.log('Delete step')}
      />
    </div>
  );
}
