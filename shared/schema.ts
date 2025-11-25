import { z } from "zod";

export const stepTypeEnum = z.enum([
  "gerar-topicos-direito",
  "buscar-jurisprudencia",
  "escrever-fatos",
  "gerar-pedidos",
  "gerar-ementa-fake",
  "custom",
]);

export const fileTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  extensions: z.array(z.string()),
});

export const stepParametersSchema = z.object({
  inputVars: z.array(z.string()).optional(),
  outputVar: z.string().optional(),
  requiredFields: z.array(z.string()).optional(),
});

export const stepConfigSchema = z.record(z.string(), z.any()).optional();

export const stepSchema = z.object({
  id: z.string(),
  type: stepTypeEnum,
  promptName: z.string().optional(),
  promptTemplate: z.string().optional(),
  parameters: stepParametersSchema.optional(),
  config: stepConfigSchema.optional(),
});

export const flowConfigSchema = z.object({
  flowName: z.string().min(1, "Nome do fluxo é obrigatório"),
  requiredFiles: z.array(z.string()).max(2, "Máximo de 2 arquivos").optional(),
  steps: z.array(stepSchema).min(1, "Pelo menos um step é necessário"),
});

export const formFieldTypeEnum = z.enum([
  "text",
  "textarea",
  "select",
  "multiselect",
  "checkbox",
  "date",
  "array",
]);

export const storageLocationEnum = z.enum(["prompt", "config", "parameters"]);

export const formFieldSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: formFieldTypeEnum,
  storageLocation: storageLocationEnum.default("config"),
  required: z.boolean().optional(),
  placeholder: z.string().optional(),
  description: z.string().optional(),
  options: z.array(z.object({
    value: z.string(),
    label: z.string(),
  })).optional(),
});

export const stepDefinitionSchema = z.object({
  type: stepTypeEnum,
  name: z.string(),
  description: z.string(),
  requiresPrompt: z.boolean(),
  category: z.string(),
  formFields: z.array(formFieldSchema).optional(),
});

export type StepType = z.infer<typeof stepTypeEnum>;
export type FileType = z.infer<typeof fileTypeSchema>;
export type StepParameters = z.infer<typeof stepParametersSchema>;
export type StepConfig = z.infer<typeof stepConfigSchema>;
export type Step = z.infer<typeof stepSchema>;
export type FlowConfig = z.infer<typeof flowConfigSchema>;
export type FormFieldType = z.infer<typeof formFieldTypeEnum>;
export type StorageLocation = z.infer<typeof storageLocationEnum>;
export type FormField = z.infer<typeof formFieldSchema>;
export type StepDefinition = z.infer<typeof stepDefinitionSchema>;
