"use client"

import { useState, useEffect } from "react"

interface AppStateInfo {
  locale: string
  isLoading: boolean
  timestamp: string
  userAgent: string
  url: string
  performance: {
    memory?: {
      usedJSHeapSize: number
      totalJSHeapSize: number
      jsHeapSizeLimit: number
    }
  }
}

export default function AppStateDevPanel() {
  const [appState, setAppState] = useState<AppStateInfo | null>(null)

  useEffect(() => {
    const updateAppState = () => {
      const state: AppStateInfo = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        performance: {
          memory: (performance as any).memory
            ? {
                usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
                totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
                jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit,
              }
            : undefined,
        },
      }
      setAppState(state)
    }

    updateAppState()
    const interval = setInterval(updateAppState, 1000)

    return () => clearInterval(interval)
  }, [locale, isLoading])

  if (!appState) {
    return <div className="p-4">Loading app state...</div>
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen font-mono text-sm">
      <h1 className="text-lg font-bold mb-4">App State DevTools Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Environment</h2>
          <div className="space-y-1">
            <div>
              <strong>URL:</strong> {appState.url}
            </div>
            <div>
              <strong>Timestamp:</strong> {appState.timestamp}
            </div>
          </div>
        </div>

        {appState.performance.memory && (
          <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
            <h2 className="font-semibold mb-2">Memory Usage</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <strong>Used:</strong> {Math.round(appState.performance.memory.usedJSHeapSize / 1024 / 1024)} MB
              </div>
              <div>
                <strong>Total:</strong> {Math.round(appState.performance.memory.totalJSHeapSize / 1024 / 1024)} MB
              </div>
              <div>
                <strong>Limit:</strong> {Math.round(appState.performance.memory.jsHeapSizeLimit / 1024 / 1024)} MB
              </div>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: `${(appState.performance.memory.usedJSHeapSize / appState.performance.memory.jsHeapSizeLimit) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        )}

        <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
          <h2 className="font-semibold mb-2">User Agent</h2>
          <div className="text-xs break-all">{appState.userAgent}</div>
        </div>
      </div>
    </div>
  )
}
