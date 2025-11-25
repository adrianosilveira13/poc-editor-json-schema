import { StepDefinition, FileType } from "@shared/schema";

export interface IStorage {
  getStepDefinitions(): Promise<StepDefinition[]>;
  getFileTypes(): Promise<FileType[]>;
}

export class MemStorage implements IStorage {
  private stepDefinitions: StepDefinition[];
  private fileTypes: FileType[];

  constructor() {
    this.fileTypes = [
      {
        id: "pdf-peticao",
        name: "PDF da Petição Inicial",
        description: "Arquivo PDF contendo a petição inicial do processo",
        extensions: [".pdf"],
      },
      {
        id: "pdf-sentenca",
        name: "PDF da Sentença",
        description: "Arquivo PDF contendo a sentença judicial",
        extensions: [".pdf"],
      },
      {
        id: "pdf-acordao",
        name: "PDF do Acórdão",
        description: "Arquivo PDF contendo o acórdão do tribunal",
        extensions: [".pdf"],
      },
      {
        id: "docx-documentos",
        name: "Documentos DOCX",
        description: "Documentos em formato Word com informações do caso",
        extensions: [".docx", ".doc"],
      },
      {
        id: "pdf-provas",
        name: "PDF de Provas Documentais",
        description: "Conjunto de documentos probatórios em PDF",
        extensions: [".pdf"],
      },
    ];

    this.stepDefinitions = [
      {
        type: "gerar-topicos-direito",
        name: "Gerar Tópicos de Direito",
        description: "Gera tópicos de direito baseados em fatos e legislação usando IA",
        requiresPrompt: true,
        category: "Geração de Conteúdo",
        formFields: [
          {
            name: "promptName",
            label: "Nome do Prompt",
            type: "text",
            storageLocation: "prompt",
            required: true,
            placeholder: "Ex: prompt-topicos-trabalhistas",
          },
          {
            name: "promptTemplate",
            label: "Template do Prompt",
            type: "textarea",
            storageLocation: "prompt",
            required: true,
            placeholder: "Ex: Gere tópicos de direito para {tipo_acao} baseado em {fatos_cliente}",
            description: "Use {variavel} para placeholders que serão substituídos em tempo de execução",
          },
        ],
      },
      {
        type: "buscar-jurisprudencia",
        name: "Buscar Jurisprudência",
        description: "Busca jurisprudência relevante em tribunais usando busca vetorial",
        requiresPrompt: false,
        category: "Pesquisa",
        formFields: [
          {
            name: "tribunais",
            label: "Tribunais para Busca",
            type: "multiselect",
            storageLocation: "config",
            required: false,
            description: "Selecione os tribunais onde buscar jurisprudência",
            options: [
              { value: "stf", label: "STF - Supremo Tribunal Federal" },
              { value: "stj", label: "STJ - Superior Tribunal de Justiça" },
              { value: "tst", label: "TST - Tribunal Superior do Trabalho" },
              { value: "trf1", label: "TRF1 - Tribunal Regional Federal da 1ª Região" },
              { value: "trf2", label: "TRF2 - Tribunal Regional Federal da 2ª Região" },
              { value: "trf3", label: "TRF3 - Tribunal Regional Federal da 3ª Região" },
              { value: "trf4", label: "TRF4 - Tribunal Regional Federal da 4ª Região" },
              { value: "trf5", label: "TRF5 - Tribunal Regional Federal da 5ª Região" },
              { value: "tjsp", label: "TJSP - Tribunal de Justiça de São Paulo" },
              { value: "tjrj", label: "TJRJ - Tribunal de Justiça do Rio de Janeiro" },
            ],
          },
          {
            name: "dataInicio",
            label: "Data Início",
            type: "date",
            storageLocation: "config",
            required: false,
          },
          {
            name: "dataFim",
            label: "Data Fim",
            type: "date",
            storageLocation: "config",
            required: false,
          },
        ],
      },
      {
        type: "escrever-fatos",
        name: "Escrever Fatos",
        description: "Escreve os fatos principais do caso para facilitar a análise",
        requiresPrompt: true,
        category: "Processamento",
        formFields: [
          {
            name: "promptName",
            label: "Nome do Prompt",
            type: "text",
            storageLocation: "prompt",
            required: true,
            placeholder: "Ex: prompt-escrever-fatos",
          },
          {
            name: "promptTemplate",
            label: "Template do Prompt",
            type: "textarea",
            storageLocation: "prompt",
            required: true,
            placeholder: "Ex: Escreva os fatos principais de {documento}",
            description: "Use {variavel} para placeholders",
          },
        ],
      },
      {
        type: "gerar-pedidos",
        name: "Gerar Pedidos",
        description: "Gera a seção de pedidos da petição com base nos argumentos",
        requiresPrompt: true,
        category: "Geração de Conteúdo",
        formFields: [
          {
            name: "promptName",
            label: "Nome do Prompt",
            type: "text",
            storageLocation: "prompt",
            required: true,
            placeholder: "Ex: prompt-pedidos",
          },
          {
            name: "promptTemplate",
            label: "Template do Prompt",
            type: "textarea",
            storageLocation: "prompt",
            required: true,
            placeholder: "Ex: Gere os pedidos baseado em {argumentos}",
            description: "Use {variavel} para placeholders",
          },
        ],
      },
      {
        type: "gerar-ementa-fake",
        name: "Gerar Ementa Fake",
        description: "Gera uma ementa fictícia para fins de teste e demonstração",
        requiresPrompt: true,
        category: "Geração de Conteúdo",
        formFields: [
          {
            name: "promptName",
            label: "Nome do Prompt",
            type: "text",
            storageLocation: "prompt",
            required: true,
            placeholder: "Ex: prompt-ementa-fake",
          },
          {
            name: "promptTemplate",
            label: "Template do Prompt",
            type: "textarea",
            storageLocation: "prompt",
            required: true,
            placeholder: "Ex: Gere uma ementa fake sobre {tema}",
            description: "Use {variavel} para placeholders",
          },
        ],
      },
      {
        type: "custom",
        name: "Step Customizado",
        description: "Crie um step totalmente personalizado com prompt próprio",
        requiresPrompt: true,
        category: "Personalizado",
        formFields: [
          {
            name: "promptName",
            label: "Nome do Prompt",
            type: "text",
            storageLocation: "prompt",
            required: true,
            placeholder: "Ex: meu-prompt-custom",
          },
          {
            name: "promptTemplate",
            label: "Template do Prompt",
            type: "textarea",
            storageLocation: "prompt",
            required: true,
            placeholder: "Digite seu prompt personalizado aqui",
            description: "Use {variavel} para placeholders que serão substituídos",
          },
        ],
      },
    ];
  }

  async getStepDefinitions(): Promise<StepDefinition[]> {
    return this.stepDefinitions;
  }

  async getFileTypes(): Promise<FileType[]> {
    return this.fileTypes;
  }
}

export const storage = new MemStorage();
