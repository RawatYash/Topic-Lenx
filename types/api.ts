// API Response Types
export interface APIErrorResponse {
  error: string
}

export interface Topic {
  id: number
  name: string
  count: number
  percentage: number
  summary: string
}

export interface ClusterPoint {
  id: number
  x: number
  y: number
  topic: number
  text: string
}

export interface ProcessClusterResponse {
  success: boolean
  data?: {
    id: string
    topics: Topic[]
    clusterData: ClusterPoint[]
  }
  error?: string
}

// Expected Query Parameters
export interface ClusterRequestParams {
  clusterCount: number
  columns: string[]
}

// For future extension of analysis results
export interface ExtendedAnalysisData {
  // Reserved for future additional analysis data
  // Example: metadata?: Record<string, unknown>
} 