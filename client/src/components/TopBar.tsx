import { Button } from "@/components/ui/button";
import { Upload, Download, Save, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface TopBarProps {
  onImport: () => void;
  onExport: () => void;
  onSave: () => void;
  hasUnsavedChanges?: boolean;
}

export default function TopBar({ onImport, onExport, onSave, hasUnsavedChanges }: TopBarProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">JS</span>
        </div>
        <h1 className="text-xl font-semibold" data-testid="text-app-title">
          Editor de Fluxos de Petição
        </h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onImport}
          data-testid="button-import"
        >
          <Upload className="w-4 h-4 mr-2" />
          Importar
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          data-testid="button-export"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={onSave}
          data-testid="button-save"
        >
          <Save className="w-4 h-4 mr-2" />
          {hasUnsavedChanges ? "Salvar*" : "Salvar"}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          data-testid="button-theme-toggle"
        >
          {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </Button>
      </div>
    </header>
  );
}
