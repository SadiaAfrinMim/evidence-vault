"use client"
import Link from "next/link"
import { ChevronRight, Shield, FileText, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-accent" />
            <h1 className="text-xl font-semibold text-foreground">Evidence Vault</h1>
          </div>
          <p className="text-sm text-muted-foreground">SentryLink Comply Phase A</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">Professional Evidence Management</h2>
              <p className="text-lg text-muted-foreground">
                Organize, track, and manage evidence with precision. Access detailed information, fulfill requests, and
                maintain compliance effortlessly.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-3">
              {[
                { icon: FileText, label: "Evidence Vault", desc: "Browse and filter evidence" },
                { icon: Clock, label: "Request To-Do", desc: "Track pending requests" },
                { icon: Shield, label: "Secure Access", desc: "Protected evidence details" },
              ].map((feature) => (
                <div key={feature.label} className="flex items-start gap-3">
                  <feature.icon className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">{feature.label}</p>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link href="/vault">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Access Evidence Vault
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Right Column - Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Evidence Items", value: "2,847" },
              { label: "Open Requests", value: "143" },
              { label: "Compliance Score", value: "98.5%" },
              { label: "Active Users", value: "24" },
            ].map((stat) => (
              <Card key={stat.label} className="p-6 bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
