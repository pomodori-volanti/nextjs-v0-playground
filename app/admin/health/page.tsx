"use client"

import { useState, useEffect } from "react"

interface HealthData {
  timestamp: string
  status: string
  version: string
  environment: string
  uptime: number
  memory: {
    used: number
    total: number
    external: number
  }
  responseTime: number
}

export default function HealthDashboard() {
  const [healthData, setHealthData] = useState<HealthData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchHealthData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/health")
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      const data = await response.json()
      setHealthData(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch health data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHealthData()
    // Refresh every 30 seconds
    const interval = setInterval(fetchHealthData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading && !healthData) {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Health Dashboard</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p>Loading health data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Health Dashboard</h1>
          <button
            onClick={fetchHealthData}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {healthData && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">System Status</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      healthData.status === "healthy"
                        ? "bg-green-100 text-green-800"
                        : healthData.status === "degraded"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {healthData.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span>{healthData.version}</span>
                </div>
                <div className="flex justify-between">
                  <span>Environment:</span>
                  <span>{healthData.environment}</span>
                </div>
                <div className="flex justify-between">
                  <span>Uptime:</span>
                  <span>{Math.floor(healthData.uptime / 60)} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Response Time:</span>
                  <span>{healthData.responseTime}ms</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Memory Usage</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Heap Used:</span>
                  <span>{healthData.memory.used} MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Heap Total:</span>
                  <span>{healthData.memory.total} MB</span>
                </div>
                <div className="flex justify-between">
                  <span>External:</span>
                  <span>{healthData.memory.external} MB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${Math.min((healthData.memory.used / healthData.memory.total) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  {Math.round((healthData.memory.used / healthData.memory.total) * 100)}% used
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">API Endpoints</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <a
                  href="/api/health"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border rounded-md hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium">/api/health</h3>
                  <p className="text-sm text-gray-500">Detailed health check</p>
                </a>
                <a
                  href="/api/ping"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border rounded-md hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium">/api/ping</h3>
                  <p className="text-sm text-gray-500">Simple connectivity test</p>
                </a>
                <a
                  href="/api/ready"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border rounded-md hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium">/api/ready</h3>
                  <p className="text-sm text-gray-500">Readiness probe</p>
                </a>
                <a
                  href="/api/status"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border rounded-md hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium">/api/status</h3>
                  <p className="text-sm text-gray-500">Detailed system info</p>
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-500">
          <p>Last updated: {healthData?.timestamp}</p>
          <p>Auto-refresh every 30 seconds</p>
        </div>
      </div>
    </div>
  )
}
