"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Search, Filter, Eye, ArrowUpDown, Shield, Clock, User, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

// Mock data for evidence items
const MOCK_EVIDENCE = [
  {
    id: "EV001",
    title: "Q4 Financial Records",
    description: "Complete financial statements for Q4 2023",
    category: "Financial",
    status: "Active",
    createdBy: "John Smith",
    createdDate: "2024-01-15",
    lastModified: "2024-01-20",
    fileSize: "2.4 MB",
  },
  {
    id: "EV002",
    title: "Employee Training Documentation",
    description: "Compliance training records and certifications",
    category: "Personnel",
    status: "Active",
    createdBy: "Sarah Johnson",
    createdDate: "2024-01-10",
    lastModified: "2024-01-18",
    fileSize: "1.8 MB",
  },
  {
    id: "EV003",
    title: "System Audit Log - January",
    description: "Complete audit trail for system access",
    category: "Audit",
    status: "Archived",
    createdBy: "Mike Chen",
    createdDate: "2023-12-20",
    lastModified: "2024-01-05",
    fileSize: "5.2 MB",
  },
  {
    id: "EV004",
    title: "Vendor Contract - Azure Services",
    description: "Service agreement and terms with Microsoft Azure",
    category: "Legal",
    status: "Active",
    createdBy: "Lisa Park",
    createdDate: "2024-01-08",
    lastModified: "2024-01-12",
    fileSize: "890 KB",
  },
  {
    id: "EV005",
    title: "Data Privacy Impact Assessment",
    description: "GDPR compliance assessment document",
    category: "Compliance",
    status: "Active",
    createdBy: "David Brown",
    createdDate: "2024-01-20",
    lastModified: "2024-01-22",
    fileSize: "3.1 MB",
  },
  {
    id: "EV006",
    title: "Employee Security Incident Report",
    description: "Investigation report on Q1 security incidents",
    category: "Security",
    status: "Active",
    createdBy: "Emma Wilson",
    createdDate: "2024-01-18",
    lastModified: "2024-01-19",
    fileSize: "1.5 MB",
  },
]

const CATEGORIES = ["Financial", "Personnel", "Audit", "Legal", "Compliance", "Security"]
const STATUSES = ["Active", "Archived"]

export default function EvidenceVaultContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",").filter(Boolean) || [],
  )
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(
    searchParams.get("statuses")?.split(",").filter(Boolean) || [],
  )
  const [sortBy, setSortBy] = useState<"date" | "name" | "size">("date")

  // Update URL params whenever filters change
  const updateUrl = (search: string, cats: string[], stats: string[]) => {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (cats.length > 0) params.set("categories", cats.join(","))
    if (stats.length > 0) params.set("statuses", stats.join(","))
    router.push(`/vault?${params.toString()}`)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    updateUrl(value, selectedCategories, selectedStatuses)
  }

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]
    setSelectedCategories(newCategories)
    updateUrl(searchTerm, newCategories, selectedStatuses)
  }

  const handleStatusToggle = (status: string) => {
    const newStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status]
    setSelectedStatuses(newStatuses)
    updateUrl(searchTerm, selectedCategories, newStatuses)
  }

  const filteredEvidence = useMemo(() => {
    return MOCK_EVIDENCE.filter((item) => {
      const matchesSearch =
        !searchTerm ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category)

      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(item.status)

      return matchesSearch && matchesCategory && matchesStatus
    }).sort((a, b) => {
      if (sortBy === "date") return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      if (sortBy === "name") return a.title.localeCompare(b.title)
      if (sortBy === "size") {
        const aSize = Number.parseFloat(a.fileSize)
        const bSize = Number.parseFloat(b.fileSize)
        return bSize - aSize
      }
      return 0
    })
  }, [searchTerm, selectedCategories, selectedStatuses, sortBy])

  const hasActiveFilters = searchTerm !== "" || selectedCategories.length > 0 || selectedStatuses.length > 0

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
              <h1 className="text-2xl font-bold text-foreground">Evidence Vault</h1>
              <p className="text-sm text-muted-foreground">
                {filteredEvidence.length} of {MOCK_EVIDENCE.length} items
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="space-y-4 mb-8">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, description, or ID..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 bg-card border-border"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Category Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 border-border bg-transparent">
                  <Tag className="w-4 h-4" />
                  Category
                  {selectedCategories.length > 0 && (
                    <span className="ml-1 px-2 py-0.5 bg-accent text-accent-foreground rounded text-xs">
                      {selectedCategories.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {CATEGORIES.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 border-border bg-transparent">
                  <Filter className="w-4 h-4" />
                  Status
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
                {STATUSES.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={selectedStatuses.includes(status)}
                    onCheckedChange={() => handleStatusToggle(status)}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 border-border bg-transparent">
                  <ArrowUpDown className="w-4 h-4" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuCheckboxItem checked={sortBy === "date"} onCheckedChange={() => setSortBy("date")}>
                  Newest First
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={sortBy === "name"} onCheckedChange={() => setSortBy("name")}>
                  Alphabetical
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={sortBy === "size"} onCheckedChange={() => setSortBy("size")}>
                  Largest First
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategories([])
                  setSelectedStatuses([])
                  router.push("/vault")
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Evidence List */}
        <div className="space-y-3">
          {filteredEvidence.length === 0 ? (
            <Card className="p-12 text-center bg-card border border-border">
              <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium text-foreground mb-2">No evidence found</p>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategories([])
                  setSelectedStatuses([])
                  router.push("/vault")
                }}
              >
                Reset Filters
              </Button>
            </Card>
          ) : (
            filteredEvidence.map((item) => (
              <Link key={item.id} href={`/vault/${item.id}`}>
                <Card className="p-5 bg-card border border-border hover:border-accent transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground truncate">{item.title}</h3>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${
                            item.status === "Active" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {item.status}
                        </span>
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary whitespace-nowrap">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(item.createdDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {item.createdBy}
                        </div>
                        <div>{item.fileSize}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
