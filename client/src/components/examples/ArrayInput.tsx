import ArrayInput from '../ArrayInput';
import { useState } from 'react';

export default function ArrayInputExample() {
  const [items, setItems] = useState<string[]>(["fatos_cliente", "leis_relevantes"]);

  return (
    <div className="p-8 max-w-md">
      <ArrayInput
        label="Variáveis de Input"
        value={items}
        onChange={setItems}
        placeholder="nome_variavel"
      />
    </div>
  );
}
