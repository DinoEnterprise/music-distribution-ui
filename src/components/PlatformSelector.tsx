
"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const platforms = [
  { id: "spotify", name: "Spotify", logo: "🎵" },
  { id: "apple-music", name: "Apple Music", logo: "🍎" },
  { id: "youtube-music", name: "YouTube Music", logo: "📺" },
  { id: "tiktok", name: "TikTok", logo: "🎵" },
  { id: "amazon-music", name: "Amazon Music", logo: "📦" },
  { id: "deezer", name: "Deezer", logo: "🎧" },
  { id: "tidal", name: "Tidal", logo: "🌊" },
  { id: "soundcloud", name: "SoundCloud", logo: "☁️" },
  { id: "pandora", name: "Pandora", logo: "📻" },
  { id: "instagram", name: "Instagram", logo: "📷" },
];

interface PlatformSelectorProps {
  onSelectionChange?: (selected: string[]) => void;
}

export function PlatformSelector({ onSelectionChange }: PlatformSelectorProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) => {
      const newSelection = prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId];
      
      setSelectAll(newSelection.length === platforms.length);
      onSelectionChange?.(newSelection);
      return newSelection;
    });
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedPlatforms([]);
      onSelectionChange?.([]);
    } else {
      const allIds = platforms.map((p) => p.id);
      setSelectedPlatforms(allIds);
      onSelectionChange?.(allIds);
    }
    setSelectAll(!selectAll);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">Distribution Platforms</label>
        <button
          type="button"
          onClick={toggleSelectAll}
          className="text-sm text-[var(--neon-blue)] hover:text-[var(--neon-blue)]/80 font-medium transition-colors"
        >
          {selectAll ? "Deselect All" : "Select All"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id);
          
          return (
            <button
              key={platform.id}
              type="button"
              onClick={() => togglePlatform(platform.id)}
              className={cn(
                "relative border rounded-lg p-4 transition-all duration-200 hover:scale-105",
                isSelected
                  ? "border-[var(--neon-blue)] bg-[var(--neon-blue)]/5 shadow-[0_0_20px_rgba(0,212,255,0.15)]"
                  : "border-border bg-card hover:border-[var(--neon-blue)]/50"
              )}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[var(--neon-blue)] flex items-center justify-center">
                  <Check className="w-3 h-3 text-[#0D0D0D]" />
                </div>
              )}
              
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl">{platform.logo}</span>
                <span className="text-xs font-medium text-foreground text-center">
                  {platform.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {selectedPlatforms.length > 0 && (
        <div className="flex items-center gap-2 px-3 py-2 bg-[var(--neon-blue)]/5 border border-[var(--neon-blue)]/20 rounded-lg">
          <span className="text-xs font-medium text-[var(--neon-blue)]">
            {selectedPlatforms.length} {selectedPlatforms.length === 1 ? "platform" : "platforms"} selected
          </span>
        </div>
      )}
    </div>
  );
}
