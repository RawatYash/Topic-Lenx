import type { ReactNode } from 'react'
import {
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  CartesianGrid as RechartsCartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer as RechartsResponsiveContainer,
  Cell as RechartsCell,
  ScatterChart as RechartsScatterChart,
  Scatter as RechartsScatter,
  ZAxis as RechartsZAxis,
  TooltipProps
} from 'recharts'

export type {
  TooltipProps
}

// Re-export recharts components with proper types
export const BarChart = RechartsBarChart
export const Bar = RechartsBar
export const XAxis = RechartsXAxis
export const YAxis = RechartsYAxis
export const CartesianGrid = RechartsCartesianGrid
export const Tooltip = RechartsTooltip
export const ResponsiveContainer = RechartsResponsiveContainer
export const Cell = RechartsCell
export const ScatterChart = RechartsScatterChart
export const Scatter = RechartsScatter
export const ZAxis = RechartsZAxis
