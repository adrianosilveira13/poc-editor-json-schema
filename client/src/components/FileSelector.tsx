import { FileType } from "@shared/schema";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";

interface FileSelectorProps {
  selectedFiles: string[];
  onChange: (files: string[]) => void;
}

export default function FileSelector({ selectedFiles, onChange }: FileSelectorProps) {
  const { data: fileTypes = [], isLoading } = useQuery<FileType[]>({
    queryKey: ["/api/file-types"],
  });

  const availableFiles = fileTypes.filter(
    (file) => !selectedFiles.includes(file.id)
  );

  const canAddMore = selectedFiles.length < 2;

  const addFile = (fileId: string) => {
    if (selectedFiles.length < 2) {
      onChange([...selectedFiles, fileId]);
    }
  };

  const removeFile = (fileId: string) => {
    onChange(selectedFiles.filter((id) => id !== fileId));
  };

  const getFileType = (fileId: string) => {
    return fileTypes.find((file) => file.id === fileId);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium uppercase tracking-wide">
          Arquivos Necessários (Máximo 2)
        </Label>
        {selectedFiles.length > 0 && (
          <span className="text-xs text-muted-foreground">
            {selectedFiles.length}/2 selecionados
          </span>
        )}
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          {selectedFiles.map((fileId) => {
            const fileType = getFileType(fileId);
            if (!fileType) return null;

            return (
              <div
                key={fileId}
                className="flex items-start gap-3 p-3 border rounded-md bg-card"
                data-testid={`selected-file-${fileId}`}
              >
                <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{fileType.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {fileType.description}
                  </p>
                  <div className="flex gap-1 mt-2">
                    {fileType.extensions.map((ext) => (
                      <Badge key={ext} variant="secondary" className="text-xs">
                        {ext}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(fileId)}
                  data-testid={`button-remove-file-${fileId}`}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {canAddMore && (
        <Select onValueChange={addFile} disabled={isLoading}>
          <SelectTrigger data-testid="select-file-type">
            <SelectValue placeholder={isLoading ? "Carregando..." : "Selecionar arquivo..."} />
          </SelectTrigger>
          <SelectContent>
            {availableFiles.map((file) => (
              <SelectItem key={file.id} value={file.id} data-testid={`option-file-${file.id}`}>
                <div className="flex flex-col gap-1">
                  <span className="font-medium">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {file.description}
                  </span>
                </div>
              </SelectItem>
            ))}
            {availableFiles.length === 0 && !isLoading && (
              <SelectItem value="none" disabled>
                Nenhum arquivo disponível
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      )}

      {!canAddMore && (
        <p className="text-xs text-muted-foreground">
          Limite máximo de 2 arquivos atingido
        </p>
      )}

      {selectedFiles.length === 0 && (
        <p className="text-xs text-muted-foreground">
          Nenhum arquivo selecionado (opcional)
        </p>
      )}
    </div>
  );
}
