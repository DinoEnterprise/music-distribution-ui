
"use client";

import { useState } from "react";
import { Globe, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const territories = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany",
  "France", "Spain", "Italy", "Japan", "South Korea",
  "Brazil", "Mexico", "Argentina", "India", "China",
  "Netherlands", "Sweden", "Norway", "Denmark", "Finland",
];

interface TerritorySelectorProps {
  onSelectionChange?: (mode: "worldwide" | "custom", territories?: string[]) => void;
}

export function TerritorySelector({ onSelectionChange }: TerritorySelectorProps) {
  const [mode, setMode] = useState<"worldwide" | "custom">("worldwide");
  const [selectedTerritories, setSelectedTerritories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTerritories = territories.filter((territory) =>
    territory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMode = (newMode: "worldwide" | "custom") => {
    setMode(newMode);
    if (newMode === "worldwide") {
      setSelectedTerritories([]);
      onSelectionChange?.("worldwide");
    } else {
      onSelectionChange?.("custom", selectedTerritories);
    }
  };

  const toggleTerritory = (territory: string) => {
    setSelectedTerritories((prev) => {
      const newSelection = prev.includes(territory)
        ? prev.filter((t) => t !== territory)
        : [...prev, territory];
      
      onSelectionChange?.("custom", newSelection);
      return newSelection;
    });
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-foreground">Distribution Territory</label>

      {/* Mode Toggle */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => toggleMode("worldwide")}
          className={cn(
            "flex items-center justify-center gap-2 p-4 rounded-lg border transition-all duration-200",
            mode === "worldwide"
              ? "border-[var(--neon-blue)] bg-[var(--neon-blue)]/5 shadow-[0_0_20px_rgba(0,212,255,0.15)]"
              : "border-border bg-card hover:border-[var(--neon-blue)]/50"
          )}
        >
          <Globe className={cn(
            "w-5 h-5",
            mode === "worldwide" ? "text-[var(--neon-blue)]" : "text-muted-foreground"
          )} />
          <span className={cn(
            "font-medium",
            mode === "worldwide" ? "text-[var(--neon-blue)]" : "text-foreground"
          )}>
            Worldwide
          </span>
        </button>

        <button
          type="button"
          onClick={() => toggleMode("custom")}
          className={cn(
            "flex items-center justify-center gap-2 p-4 rounded-lg border transition-all duration-200",
            mode === "custom"
              ? "border-[var(--neon-blue)] bg-[var(--neon-blue)]/5 shadow-[0_0_20px_rgba(0,212,255,0.15)]"
              : "border-border bg-card hover:border-[var(--neon-blue)]/50"
          )}
        >
          <span className={cn(
            "font-medium",
            mode === "custom" ? "text-[var(--neon-blue)]" : "text-foreground"
          )}>
            Custom Selection
          </span>
        </button>
      </div>

      {/* Custom Territory Selection */}
      {mode === "custom" && (
        <div className="space-y-4 p-4 border border-border rounded-lg bg-card">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search territories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="max-h-64 overflow-y-auto space-y-2">
            {filteredTerritories.map((territory) => {
              const isSelected = selectedTerritories.includes(territory);
              
              return (
                <button
                  key={territory}
                  type="button"
                  onClick={() => toggleTerritory(territory)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-md border transition-all duration-200",
                    isSelected
                      ? "border-[var(--neon-blue)] bg-[var(--neon-blue)]/5"
                      : "border-transparent bg-muted/50 hover:bg-muted"
                  )}
                >
                  <span className="text-sm font-medium text-foreground">{territory}</span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[var(--neon-blue)] flex items-center justify-center">
                      <svg className="w-3 h-3 text-[#0D0D0D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {selectedTerritories.length > 0 && (
            <div className="pt-3 border-t border-border">
              <p className="text-xs font-medium text-[var(--neon-blue)]">
                {selectedTerritories.length} {selectedTerritories.length === 1 ? "territory" : "territories"} selected
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
