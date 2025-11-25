import StepTypeSelector from '../StepTypeSelector';
import { StepType } from '@shared/schema';
import { useState } from 'react';

export default function StepTypeSelectorExample() {
  const [type, setType] = useState<StepType>("gerar-argumentos");

  return (
    <div className="p-8">
      <StepTypeSelector value={type} onChange={setType} />
      <p className="mt-4 text-sm text-muted-foreground">Selected: {type}</p>
    </div>
  );
}
