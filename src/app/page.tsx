"use client";

import Link from "next/link";
import { Music, Upload, Globe, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background dark">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-[#0D0D0D]/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-purple)] flex items-center justify-center">
                <Music className="w-5 h-5 text-[#0D0D0D]" />
              </div>
              <span className="text-lg font-bold text-foreground">SoundDistro</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">Sign In</Button>
              <Link href="/submit">
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] hover:opacity-90 text-[#0D0D0D] font-semibold shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all duration-300"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-blue)]/10 via-transparent to-[var(--neon-purple)]/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--neon-blue)/5,transparent_50%),radial-gradient(circle_at_bottom_left,_var(--neon-purple)/5,transparent_50%)]" />
        
        <div className="relative container mx-auto px-4 lg:px-8 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--neon-blue)]/20 bg-[var(--neon-blue)]/5">
              <Zap className="w-4 h-4 text-[var(--neon-blue)]" />
              <span className="text-sm font-medium text-[var(--neon-blue)]">
                Professional Music Distribution
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Distribute Your Music
              <br />
              <span className="bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] bg-clip-text text-transparent">
                Everywhere
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get your music on Spotify, Apple Music, TikTok, and 150+ platforms worldwide. 
              Keep 100% of your rights and royalties.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/submit">
                <Button 
                  size="lg"
                  className="min-w-[200px] bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] hover:opacity-90 text-[#0D0D0D] font-semibold shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:shadow-[0_0_40px_rgba(0,212,255,0.4)] transition-all duration-300"
                >
                  Submit Your Music
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button 
                size="lg"
                variant="outline"
                className="min-w-[200px] border-border hover:border-[var(--neon-blue)]/50 hover:bg-[var(--neon-blue)]/5 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--neon-blue)]" />
                <span>No hidden fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--neon-blue)]" />
                <span>Keep 100% rights</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--neon-blue)]" />
                <span>Fast approval</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional tools and features to help you reach millions of listeners worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Upload,
                title: "Easy Upload",
                description: "Upload your tracks in minutes with our intuitive interface. Drag and drop your audio and artwork."
              },
              {
                icon: Globe,
                title: "Global Reach",
                description: "Distribute to 150+ platforms including Spotify, Apple Music, TikTok, Amazon Music, and more."
              },
              {
                icon: Zap,
                title: "Fast Processing",
                description: "Your music goes live within 24-48 hours. Get your releases out faster than ever before."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 border border-border rounded-xl bg-card hover:border-[var(--neon-blue)]/50 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--neon-blue)]/20 to-[var(--neon-purple)]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-[var(--neon-blue)]" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden p-12 border border-[var(--neon-blue)]/20 rounded-2xl bg-gradient-to-br from-[var(--neon-blue)]/5 to-[var(--neon-purple)]/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--neon-blue)/10,transparent_50%)]" />
            
            <div className="relative text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Ready to Share Your Music?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of artists distributing their music worldwide. Get started today and reach listeners everywhere.
              </p>
              <Link href="/submit">
                <Button 
                  size="lg"
                  className="min-w-[200px] bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] hover:opacity-90 text-[#0D0D0D] font-semibold shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:shadow-[0_0_40px_rgba(0,212,255,0.4)] transition-all duration-300"
                >
                  Submit Your Music
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-purple)] flex items-center justify-center">
                <Music className="w-4 h-4 text-[#0D0D0D]" />
              </div>
              <span className="text-sm font-medium text-foreground">SoundDistro</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 SoundDistro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}