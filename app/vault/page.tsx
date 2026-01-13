import { Suspense } from "react"
import EvidenceVaultContent from "./vault-content"

function LoadingFallback() {
  return null
}

export default function EvidenceVaultPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <EvidenceVaultContent />
    </Suspense>
  )
}
