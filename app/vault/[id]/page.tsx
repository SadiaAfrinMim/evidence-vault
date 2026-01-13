"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronLeft, Download, Share2, Shield, Clock, User, Tag, FileText, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Mock data for evidence items (same as vault page)
const MOCK_EVIDENCE: Record<string, any> = {
  EV001: {
    id: "EV001",
    title: "Q4 Financial Records",
    description: "Complete financial statements for Q4 2023",
    category: "Financial",
    status: "Active",
    createdBy: "John Smith",
    createdDate: "2024-01-15",
    lastModified: "2024-01-20",
    fileSize: "2.4 MB",
    fullDescription: `This comprehensive document contains complete financial statements for Q4 2023, including:
    - Balance Sheet
    - Income Statement
    - Cash Flow Analysis
    - Financial Ratios and Analysis
    - Management Discussion and Analysis
    - Audit Notes`,
  },
  EV002: {
    id: "EV002",
    title: "Employee Training Documentation",
    description: "Compliance training records and certifications",
    category: "Personnel",
    status: "Active",
    createdBy: "Sarah Johnson",
    createdDate: "2024-01-10",
    lastModified: "2024-01-18",
    fileSize: "1.8 MB",
    fullDescription: `Employee training records including:
    - Compliance Training Certificates
    - Security Awareness Certifications
    - Annual Training Logs
    - Department-Specific Training Records
    - Trainer Certifications`,
  },
  EV003: {
    id: "EV003",
    title: "System Audit Log - January",
    description: "Complete audit trail for system access",
    category: "Audit",
    status: "Archived",
    createdBy: "Mike Chen",
    createdDate: "2023-12-20",
    lastModified: "2024-01-05",
    fileSize: "5.2 MB",
    fullDescription: `System audit log containing:
    - User Access Records
    - Failed Login Attempts
    - Administrative Changes
    - Data Access Logs
    - System Configuration Changes
    - Database Query Logs`,
  },
  EV004: {
    id: "EV004",
    title: "Vendor Contract - Azure Services",
    description: "Service agreement and terms with Microsoft Azure",
    category: "Legal",
    status: "Active",
    createdBy: "Lisa Park",
    createdDate: "2024-01-08",
    lastModified: "2024-01-12",
    fileSize: "890 KB",
    fullDescription: `Complete service agreement with Microsoft Azure including:
    - Service Level Agreements (SLA)
    - Pricing Terms
    - Data Protection Clauses
    - Term and Termination
    - Liability and Indemnification
    - Compliance Requirements`,
  },
  EV005: {
    id: "EV005",
    title: "Data Privacy Impact Assessment",
    description: "GDPR compliance assessment document",
    category: "Compliance",
    status: "Active",
    createdBy: "David Brown",
    createdDate: "2024-01-20",
    lastModified: "2024-01-22",
    fileSize: "3.1 MB",
    fullDescription: `GDPR compliance assessment including:
    - Data Processing Overview
    - Risk Assessment Matrix
    - Mitigation Measures
    - Compliance Checklist
    - Privacy Controls Documentation
    - Incident Response Procedures`,
  },
  EV006: {
    id: "EV006",
    title: "Employee Security Incident Report",
    description: "Investigation report on Q1 security incidents",
    category: "Security",
    status: "Active",
    createdBy: "Emma Wilson",
    createdDate: "2024-01-18",
    lastModified: "2024-01-19",
    fileSize: "1.5 MB",
    fullDescription: `Security incident investigation report:
    - Incident Summary
    - Timeline of Events
    - Root Cause Analysis
    - Impact Assessment
    - Corrective Actions
    - Preventive Measures
    - Follow-up Timeline`,
  },
}

export default function EvidenceDetailPage() {
  const params = useParams()
  const id = params.id as string
  const item = MOCK_EVIDENCE[id]
  const [isDownloading, setIsDownloading] = useState(false)

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center bg-card border border-border max-w-md">
          <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Evidence Not Found</h1>
          <p className="text-muted-foreground mb-6">The evidence item you're looking for could not be found.</p>
          <Link href="/vault">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Return to Evidence Vault</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const handleDownload = () => {
    setIsDownloading(true)
    setTimeout(() => setIsDownloading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/vault">
            <Button variant="ghost" size="sm" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back to Vault
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Title and Status */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-3">{item.title}</h1>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.status === "Active" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.status}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-border bg-transparent"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                <Download className="w-4 h-4" />
                {isDownloading ? "Downloading..." : "Download"}
              </Button>
              <Button variant="outline" size="sm" className="gap-2 border-border bg-transparent">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-4 bg-card border border-border">
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1">Identifier</p>
                <p className="text-lg font-mono text-foreground">{item.id}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Created Date</p>
                </div>
                <p className="text-foreground">
                  {new Date(item.createdDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Created By</p>
                </div>
                <p className="text-foreground">{item.createdBy}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card border border-border">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">File Size</p>
                </div>
                <p className="text-lg font-mono text-foreground">{item.fileSize}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Last Modified</p>
                </div>
                <p className="text-foreground">
                  {new Date(item.lastModified).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Category</p>
                </div>
                <p className="text-foreground">{item.category}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Description */}
        <Card className="p-6 bg-card border border-border mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Overview</h2>
          <p className="text-muted-foreground mb-6">{item.description}</p>

          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Full Details</h3>
            <p className="text-foreground whitespace-pre-line leading-relaxed">{item.fullDescription}</p>
          </div>
        </Card>

        {/* Request Access */}
        <Card className="p-6 bg-accent/5 border border-accent/20">
          <h3 className="text-lg font-semibold text-foreground mb-2">Need to Request This Evidence?</h3>
          <p className="text-muted-foreground mb-4">
            Create a fulfillment request to access or share this evidence item.
          </p>
          <Link href="/requests">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Go to Requests</Button>
          </Link>
        </Card>
      </main>
    </div>
  )
}
