"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, CheckCircle2, Clock, AlertCircle, Plus, User, Calendar, FileText, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data for requests
const MOCK_REQUESTS = [
  {
    id: "REQ001",
    title: "Q4 Financial Records - External Audit",
    evidenceTitle: "Q4 Financial Records",
    evidenceId: "EV001",
    status: "Pending",
    priority: "High",
    requestedBy: "audit@external.com",
    requestedDate: "2024-01-22",
    dueDate: "2024-01-25",
    description: "External auditors require access to Q4 financial records for annual audit",
  },
  {
    id: "REQ002",
    title: "Training Documentation - HR Verification",
    evidenceTitle: "Employee Training Documentation",
    evidenceId: "EV002",
    status: "In Progress",
    priority: "Normal",
    requestedBy: "hr@company.com",
    requestedDate: "2024-01-20",
    dueDate: "2024-02-05",
    description: "HR needs to verify completion of compliance training for performance reviews",
  },
  {
    id: "REQ003",
    title: "System Audit Log - Security Review",
    evidenceTitle: "System Audit Log - January",
    evidenceId: "EV003",
    status: "Completed",
    priority: "High",
    requestedBy: "security@company.com",
    requestedDate: "2024-01-15",
    dueDate: "2024-01-18",
    description: "Security team completed review of system access logs",
  },
  {
    id: "REQ004",
    title: "Azure Contract - Renewal Discussion",
    evidenceTitle: "Vendor Contract - Azure Services",
    evidenceId: "EV004",
    status: "Pending",
    priority: "Normal",
    requestedBy: "procurement@company.com",
    requestedDate: "2024-01-21",
    dueDate: "2024-01-28",
    description: "Procurement team reviewing contract terms for renewal negotiations",
  },
  {
    id: "REQ005",
    title: "GDPR Assessment - Legal Team",
    evidenceTitle: "Data Privacy Impact Assessment",
    evidenceId: "EV005",
    status: "Pending",
    priority: "High",
    requestedBy: "legal@company.com",
    requestedDate: "2024-01-22",
    dueDate: "2024-01-24",
    description: "Legal team requires GDPR assessment for compliance certification",
  },
]

const REQUEST_STATUSES = ["Pending", "In Progress", "Completed"]

export default function RequestsToDo() {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    evidenceId: "",
    priority: "Normal",
    requestedBy: "",
    dueDate: "",
    description: "",
  })
  const [requests, setRequests] = useState(MOCK_REQUESTS)

  const handleStatusToggle = (status: string) => {
    setSelectedStatuses((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.evidenceId || !formData.requestedBy || !formData.dueDate) {
      alert("Please fill in all required fields")
      return
    }

    const newRequest = {
      id: `REQ${String(requests.length + 1).padStart(3, "0")}`,
      title: formData.title,
      evidenceTitle: `Evidence - ${formData.evidenceId}`,
      evidenceId: formData.evidenceId,
      status: "Pending",
      priority: formData.priority,
      requestedBy: formData.requestedBy,
      requestedDate: new Date().toISOString().split("T")[0],
      dueDate: formData.dueDate,
      description: formData.description,
    }

    setRequests([newRequest, ...requests])
    setFormData({
      title: "",
      evidenceId: "",
      priority: "Normal",
      requestedBy: "",
      dueDate: "",
      description: "",
    })
    setIsDialogOpen(false)
  }

  const filteredRequests =
    selectedStatuses.length === 0 ? requests : requests.filter((req) => selectedStatuses.includes(req.status))

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="w-5 h-5 text-accent" />
      case "In Progress":
        return <Clock className="w-5 h-5 text-primary" />
      case "Pending":
        return <AlertCircle className="w-5 h-5 text-destructive" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-accent/10 text-accent"
      case "In Progress":
        return "bg-primary/10 text-primary"
      case "Pending":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive/10 text-destructive"
      case "Normal":
        return "bg-primary/10 text-primary"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Request To-Do</h1>
              <p className="text-sm text-muted-foreground">
                {filteredRequests.length} of {requests.length} requests
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Plus className="w-4 h-4" />
            New Request
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Status Filter */}
        <div className="mb-8 flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 border-border bg-transparent">
                Filter by Status
                {selectedStatuses.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-accent text-accent-foreground rounded text-xs">
                    {selectedStatuses.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {REQUEST_STATUSES.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={selectedStatuses.includes(status)}
                  onCheckedChange={() => handleStatusToggle(status)}
                >
                  <div className="flex items-center gap-2">
                    {getStatusIcon(status)}
                    {status}
                  </div>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {selectedStatuses.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedStatuses([])}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Requests List */}
        <div className="space-y-3">
          {filteredRequests.length === 0 ? (
            <Card className="p-12 text-center bg-card border border-border">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium text-foreground mb-2">No requests found</p>
              <p className="text-muted-foreground mb-4">Try adjusting your status filter or create a new request</p>
            </Card>
          ) : (
            filteredRequests.map((request) => (
              <Card key={request.id} className="p-5 bg-card border border-border hover:border-accent transition-colors">
                <div className="flex items-start justify-between gap-4">
                  {/* Left Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(request.status)}
                      <h3 className="text-lg font-semibold text-foreground truncate">{request.title}</h3>
                    </div>

                    {/* Status and Priority Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2.5 py-1 rounded text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                      <span className={`px-2.5 py-1 rounded text-xs font-medium ${getPriorityColor(request.priority)}`}>
                        {request.priority} Priority
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{request.description}</p>

                    {/* Evidence Reference */}
                    <Link href={`/vault/${request.evidenceId}`}>
                      <div className="inline-flex items-center gap-2 px-3 py-2 rounded bg-muted hover:bg-muted/80 transition-colors mb-3">
                        <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{request.evidenceTitle}</span>
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                      </div>
                    </Link>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {request.requestedBy}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        Due {new Date(request.dueDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">ID: {request.id}</div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex-shrink-0">
                    <Button variant="outline" size="sm" className="gap-2 border-border bg-transparent">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>New Request</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmitRequest} className="space-y-3">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleFormChange}
                placeholder="Request title"
                className="w-full px-3 py-2 rounded border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="evidenceId" className="block text-sm font-medium mb-1">
                Evidence ID
              </label>
              <input
                id="evidenceId"
                name="evidenceId"
                type="text"
                value={formData.evidenceId}
                onChange={handleFormChange}
                placeholder="e.g., EV001"
                className="w-full px-3 py-2 rounded border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="priority" className="block text-sm font-medium mb-1">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 rounded border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium mb-1">
                  Due Date
                </label>
                <input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 rounded border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="requestedBy" className="block text-sm font-medium mb-1">
                Requested By
              </label>
              <input
                id="requestedBy"
                name="requestedBy"
                type="email"
                value={formData.requestedBy}
                onChange={handleFormChange}
                placeholder="your@email.com"
                className="w-full px-3 py-2 rounded border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="border-border">
                Cancel
              </Button>
              <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Create
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
