
"use client";

import { useState } from "react";
import { Music, ArrowLeft, Send, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { FileUpload } from "@/components/FileUpload";
import { PlatformSelector } from "@/components/PlatformSelector";
import { TerritorySelector } from "@/components/TerritorySelector";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const genres = [
  "Pop", "Rock", "Hip Hop", "Electronic", "R&B", "Jazz", "Classical",
  "Country", "Latin", "Metal", "Indie", "Folk", "Blues", "Reggae"
];

const languages = [
  "English", "Spanish", "French", "German", "Italian", "Portuguese",
  "Japanese", "Korean", "Mandarin", "Hindi", "Arabic", "Russian"
];

export default function SubmitPage() {
  const [submissionStatus, setSubmissionStatus] = useState<"draft" | "review" | "submitted">("draft");
  const [explicitContent, setExplicitContent] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverArt, setCoverArt] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("submitted");
    // Handle form submission
  };

  const getStatusConfig = () => {
    switch (submissionStatus) {
      case "draft":
        return {
          label: "Draft",
          icon: Clock,
          className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
        };
      case "review":
        return {
          label: "In Review",
          icon: Clock,
          className: "bg-blue-500/10 text-blue-500 border-blue-500/20"
        };
      case "submitted":
        return {
          label: "Submitted",
          icon: CheckCircle2,
          className: "bg-green-500/10 text-green-500 border-green-500/20"
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-background dark">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-[#0D0D0D]/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Back to Home
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <div className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-300",
                statusConfig.className
              )}>
                <StatusIcon className="w-3.5 h-3.5" />
                <span>{statusConfig.label}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-blue)]/10 via-transparent to-[var(--neon-purple)]/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--neon-blue)/5,transparent_50%),radial-gradient(circle_at_bottom_left,_var(--neon-purple)/5,transparent_50%)]" />
        
        <div className="relative container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-purple)] flex items-center justify-center">
                <Music className="w-6 h-6 text-[#0D0D0D]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Submit Your Music
                </h1>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">
              Distribute your music to major streaming platforms worldwide. Fill out the form below to get started.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form */}
      <section className="container mx-auto px-4 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          {/* Track Information */}
          <div className="p-6 md:p-8 border border-border rounded-xl bg-card space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">Track Information</h2>
              <p className="text-sm text-muted-foreground">Basic details about your release</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="track-title">Track Title *</Label>
                <Input
                  id="track-title"
                  placeholder="Enter track title"
                  required
                  className="transition-all duration-200 focus:shadow-[0_0_20px_rgba(0,212,255,0.1)]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="artist-name">Artist Name *</Label>
                <Input
                  id="artist-name"
                  placeholder="Enter artist name"
                  required
                  className="transition-all duration-200 focus:shadow-[0_0_20px_rgba(0,212,255,0.1)]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="album-title">Album Title</Label>
                <Input
                  id="album-title"
                  placeholder="Enter album title (optional)"
                  className="transition-all duration-200 focus:shadow-[0_0_20px_rgba(0,212,255,0.1)]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="release-date">Release Date *</Label>
                <Input
                  id="release-date"
                  type="date"
                  required
                  className="transition-all duration-200 focus:shadow-[0_0_20px_rgba(0,212,255,0.1)]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="genre">Genre *</Label>
                <Select required>
                  <SelectTrigger className="transition-all duration-200 focus:shadow-[0_0_20px_rgba(0,212,255,0.1)]">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre.toLowerCase()}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language *</Label>
                <Select required>
                  <SelectTrigger className="transition-all duration-200 focus:shadow-[0_0_20px_rgba(0,212,255,0.1)]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language} value={language.toLowerCase()}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="track-number">Track Number</Label>
                <Input
                  id="track-number"
                  type="number"
                  placeholder="1"
                  min="1"
                  className="transition-all duration-200 focus:shadow-[0_0_20px_rgba(0,212,255,0.1)]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30">
              <div className="space-y-0.5">
                <Label htmlFor="explicit-content" className="cursor-pointer">
                  Explicit Content
                </Label>
                <p className="text-xs text-muted-foreground">
                  Does this track contain explicit lyrics or content?
                </p>
              </div>
              <Switch
                id="explicit-content"
                checked={explicitContent}
                onCheckedChange={setExplicitContent}
              />
            </div>
          </div>

          {/* Metadata & Codes */}
          <div className="p-6 md:p-8 border border-border rounded-xl bg-card space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">Metadata & Codes</h2>
              <p className="text-sm text-muted-foreground">Industry standard identifiers</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="isrc">ISRC Code</Label>
                <Input
                  id="isrc"
                  placeholder="US-XXX-XX-XXXXX"
                  className="transition-all duration-200 focus:shadow-[0_0_20px_rgba(0,212,255,0.1)]"
                />
                <p className="text-xs text-muted-foreground">
                  Leave blank to auto-generate
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="upc">UPC/EAN Code</Label>
                <Input
                  id="upc"
                  placeholder="123456789012"
                  className="transition-all duration-200 focus:shadow-[0_0_20px_rgba(0,212,255,0.1)]"
                />
                <p className="text-xs text-muted-foreground">
                  Leave blank to auto-generate
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Track Description</Label>
              <Textarea
                id="description"
                placeholder="Write a brief description of your track..."
                className="min-h-[120px] resize-none transition-all duration-200 focus:shadow-[0_0_20px_rgba(0,212,255,0.1)]"
              />
            </div>
          </div>

          {/* File Uploads */}
          <div className="p-6 md:p-8 border border-border rounded-xl bg-card space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">Upload Files</h2>
              <p className="text-sm text-muted-foreground">Audio file and cover artwork</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FileUpload
                label="Audio File *"
                accept=".mp3,.wav,.flac"
                type="audio"
                onFileSelect={setAudioFile}
              />

              <FileUpload
                label="Cover Art *"
                accept=".jpg,.jpeg,.png"
                type="image"
                onFileSelect={setCoverArt}
              />
            </div>
          </div>

          {/* Platform Selection */}
          <div className="p-6 md:p-8 border border-border rounded-xl bg-card space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">Distribution</h2>
              <p className="text-sm text-muted-foreground">Choose platforms and territories</p>
            </div>

            <PlatformSelector />
            
            <div className="pt-6 border-t border-border">
              <TerritorySelector />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="min-w-[120px]"
            >
              Save Draft
            </Button>
            <Button
              type="submit"
              size="lg"
              className="min-w-[160px] bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] hover:opacity-90 text-[#0D0D0D] font-semibold shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:shadow-[0_0_40px_rgba(0,212,255,0.4)] transition-all duration-300"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Release
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
