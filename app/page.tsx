"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import UploadExcel from "@/components/upload-excel"
import ColumnSelection from "@/components/column-selection"
import ClusterConfiguration from "@/components/cluster-configuration"
import ResultsVisualization from "@/components/results-visualization"
import WellsFargoHeader from "@/components/wells-fargo-header"
import Footer from "@/components/footer"
import { mockClusterResponse } from "@/mocks/clusterData"
import type { ProcessClusterResponse } from "@/types/api"

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [file, setFile] = useState<File | null>(null)
  const [columns, setColumns] = useState<string[]>([])
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [clusterCount, setClusterCount] = useState(3)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [results, setResults] = useState<ProcessClusterResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = (uploadedFile: File, headers: string[]) => {
    setFile(uploadedFile)
    setColumns(headers)
    setCurrentStep(2)
  }

  const handleColumnSelection = (selected: string[]) => {
    setSelectedColumns(selected)
    setCurrentStep(3)
  }

  const handleClusterConfiguration = async (count: number) => {
    setClusterCount(count)
    setIsLoading(true)
    setError(null)
    setLoadingProgress(0)

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          const newProgress = prev + Math.random() * 15
          return newProgress >= 100 ? 100 : newProgress
        })
      }, 500)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 3500))

      clearInterval(progressInterval)
      setLoadingProgress(100)

      // Use mock data
      setResults(mockClusterResponse)

      // Small delay before showing results to ensure progress bar reaches 100%
      setTimeout(() => {
        setCurrentStep(4)
      }, 500)

      /* 
      // This would be the actual API call in production
      const formData = new FormData()
      if (file) {
        formData.append("file", file)
      }
      formData.append("columns", JSON.stringify(selectedColumns))
      formData.append("clusterCount", count.toString())
      
      const response = await fetch("/api/process-clusters", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to process data")
      }

      const data = await response.json()
      setResults(data)
      setCurrentStep(4)
      */
    } catch (error) {
      console.error("Error processing data:", error)
      setError(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    // In a real implementation with a backend, this would download an Excel file
    // For now, we'll create a mock Excel file with some basic content

    // simple CSV string with the topic data
    let csvContent = "Topic ID,Topic Name,Count,Percentage,Summary\n"
    if (mockClusterResponse.data) {
      mockClusterResponse.data.topics.forEach((topic) => {
        csvContent += `${topic.id},"${topic.name}",${topic.count},${topic.percentage}%,"${topic.summary}"\n`
      })
    }

    // blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)

    // Create and trigger download
    const downloadLink = document.createElement("a")
    downloadLink.href = url
    downloadLink.download = "cluster_analysis_results.csv"
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
    URL.revokeObjectURL(url)

    /* 
    // This would be the actual download in production
    if (results) {
      const downloadLink = document.createElement("a")
      downloadLink.href = `/api/download-results?id=${results.id}`
      downloadLink.download = "cluster_analysis_results.xlsx"
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
    */
  }

  return (
    <div className="flex flex-col min-h-screen">
      <WellsFargoHeader />
      <main className="container mx-auto py-10 px-4 flex-grow">
        <h1 className="text-3xl font-bold mb-8 text-center">
          TopicLen<sub className="text-sm">x</sub>
        </h1>

        <Tabs defaultValue={`step-${currentStep}`} value={`step-${currentStep}`} className="max-w-5xl mx-auto">
          {" "}
          {/* Increased max width */}
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="step-1" disabled={currentStep !== 1}>
              Upload Data
            </TabsTrigger>
            <TabsTrigger value="step-2" disabled={currentStep < 2}>
              Select Columns
            </TabsTrigger>
            <TabsTrigger value="step-3" disabled={currentStep < 3}>
              Configure Clusters
            </TabsTrigger>
            <TabsTrigger value="step-4" disabled={currentStep < 4}>
              View Results
            </TabsTrigger>
          </TabsList>
          <Card>
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && "Upload Excel File"}
                {currentStep === 2 && "Select Text Columns"}
                {currentStep === 3 && "Configure Clustering"}
                {currentStep === 4 && "Clustering Results"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Upload an Excel file containing the text data you want to analyze"}
                {currentStep === 2 && "Select the columns you want to analyze"}
                {currentStep === 3 && "Configure the number of clusters"}
                {currentStep === 4 && "Explore the clustering results"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isLoading && (
                <div className="mb-6 space-y-2">
                  <Progress value={loadingProgress} className="h-2" />
                  <p className="text-sm text-center text-muted-foreground">
                    Processing data... {Math.round(loadingProgress)}%
                  </p>
                </div>
              )}

              <TabsContent value="step-1">
                <UploadExcel onUpload={handleFileUpload} />
              </TabsContent>

              <TabsContent value="step-2">
                <ColumnSelection
                  columns={columns}
                  selectedColumns={selectedColumns}
                  onSelectionChange={setSelectedColumns}
                />
              </TabsContent>

              <TabsContent value="step-3">
                <ClusterConfiguration
                  clusterCount={clusterCount}
                  onClusterCountChange={setClusterCount}
                  isLoading={isLoading}
                />
              </TabsContent>

              <TabsContent value="step-4">{results && <ResultsVisualization results={results} />}</TabsContent>
            </CardContent>

            <CardFooter className="flex justify-between">
              {currentStep > 1 && (
                <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)} disabled={isLoading}>
                  Back
                </Button>
              )}

              {currentStep < 4 ? (
                <Button
                  onClick={() => {
                    if (currentStep === 1 && file) setCurrentStep(2)
                    else if (currentStep === 2 && selectedColumns.length > 0) handleColumnSelection(selectedColumns)
                    else if (currentStep === 3) handleClusterConfiguration(clusterCount)
                  }}
                  disabled={
                    (currentStep === 1 && !file) || (currentStep === 2 && selectedColumns.length === 0) || isLoading
                  }
                >
                  {isLoading ? "Processing..." : "Next"}
                </Button>
              ) : (
                <Button onClick={handleDownload}>Download Results</Button>
              )}
            </CardFooter>
          </Card>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}
