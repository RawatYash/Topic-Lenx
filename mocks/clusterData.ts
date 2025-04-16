import type { ProcessClusterResponse } from '@/types/api'

export const mockClusterResponse: ProcessClusterResponse = {
  success: true,
  data: {
    id: "analysis-123",
    topics: [
      {
        id: 1,
        name: "Payment Processing",
        count: 2502,
        percentage: 33.5,
        summary: "Documents related to payment processing, billing cycles, and transaction issues. Common themes include transaction delays and fee structures.",
      },
      {
        id: 2,
        name: "Account Management",
        count: 1438,
        percentage: 19.2,
        summary: "Topics covering account maintenance, service requests, and general inquiries. Key areas include account updates and service modifications.",
      },
      {
        id: 3,
        name: "Transaction Services",
        count: 1057,
        percentage: 14.1,
        summary: "Topics related to banking transactions, deposits, and withdrawals. Common themes include processing times and transaction limits.",
      },
      {
        id: 4,
        name: "Regulatory Compliance",
        count: 1002,
        percentage: 13.4,
        summary: "Documents focusing on regulatory requirements, reporting, and compliance procedures. Includes documentation and verification processes.",
      },
      {
        id: 5,
        name: "Fee Structure",
        count: 905,
        percentage: 12.1,
        summary: "Topics about service fees, charges, and related policies. Includes fee schedules and service charge explanations.",
      },
      {
        id: 6,
        name: "Credit Services",
        count: 442,
        percentage: 5.9,
        summary: "Documents covering credit products, applications, and servicing. Includes credit terms and application processes.",
      },
      {
        id: 7,
        name: "New Accounts",
        count: 136,
        percentage: 1.8,
        summary: "Topics about account opening procedures and new service enrollment. Includes documentation requirements and processing timelines.",
      }
    ],
    clusterData: Array(50).fill(0).map((_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      topic: Math.floor(Math.random() * 7) + 1,
      text: `Sample text ${i} discussing a customer concern related to their account.`,
    })),
  }
}

export const mockErrorResponse: ProcessClusterResponse = {
  success: false,
  error: "Failed to process data: Invalid column selection"
} 