"use client"

import { useState, useEffect } from "react"

interface ApiCall {
  id: string
  method: string
  url: string
  status: number
  duration: number
  timestamp: string
  requestHeaders: Record<string, string>
  responseHeaders: Record<string, string>
  requestBody?: any
  responseBody?: any
}

export default function ApiInspectorDevPanel() {
  const [apiCalls, setApiCalls] = useState<ApiCall[]>([])
  const [selectedCall, setSelectedCall] = useState<ApiCall | null>(null)

  useEffect(() => {
    // Intercept fetch requests
    const originalFetch = window.fetch

    window.fetch = async (...args) => {
      const startTime = Date.now()
      const [resource, config] = args
      const url = typeof resource === "string" ? resource : resource.url
      const method = config?.method || "GET"

      try {
        const response = await originalFetch(...args)
        const endTime = Date.now()

        // Clone response to read body without consuming it
        const responseClone = response.clone()
        let responseBody
        try {
          responseBody = await responseClone.json()
        } catch {
          responseBody = await responseClone.text()
        }

        const apiCall: ApiCall = {
          id: Math.random().toString(36).substr(2, 9),
          method,
          url,
          status: response.status,
          duration: endTime - startTime,
          timestamp: new Date().toISOString(),
          requestHeaders: Object.fromEntries(new Headers(config?.headers).entries()),
          responseHeaders: Object.fromEntries(response.headers.entries()),
          requestBody: config?.body ? JSON.parse(config.body as string) : undefined,
          responseBody,
        }

        setApiCalls((prev) => [apiCall, ...prev].slice(0, 50)) // Keep last 50 calls

        return response
      } catch (error) {
        const endTime = Date.now()

        const apiCall: ApiCall = {
          id: Math.random().toString(36).substr(2, 9),
          method,
          url,
          status: 0,
          duration: endTime - startTime,
          timestamp: new Date().toISOString(),
          requestHeaders: Object.fromEntries(new Headers(config?.headers).entries()),
          responseHeaders: {},
          requestBody: config?.body ? JSON.parse(config.body as string) : undefined,
          responseBody: { error: error.message },
        }

        setApiCalls((prev) => [apiCall, ...prev].slice(0, 50))

        throw error
      }
    }

    return () => {
      window.fetch = originalFetch
    }
  }, [])

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold">API Inspector DevTools Panel</h1>
        <button onClick={() => setApiCalls([])} className="px-3 py-1 bg-red-500 text-white rounded text-sm">
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-semibold">API Calls ({apiCalls.length})</h2>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {apiCalls.length === 0 ? (
              <div className="p-4 text-gray-500 text-center">
                No API calls yet. Make some requests to see them here.
              </div>
            ) : (
              apiCalls.map((call) => (
                <div
                  key={call.id}
                  className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedCall?.id === call.id ? "bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedCall(call)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          call.method === "GET"
                            ? "bg-green-100 text-green-800"
                            : call.method === "POST"
                              ? "bg-blue-100 text-blue-800"
                              : call.method === "PUT"
                                ? "bg-yellow-100 text-yellow-800"
                                : call.method === "DELETE"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {call.method}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          call.status >= 200 && call.status < 300
                            ? "bg-green-100 text-green-800"
                            : call.status >= 400
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {call.status || "ERR"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{call.duration}ms</span>
                  </div>
                  <div className="mt-1 text-sm font-mono truncate">{call.url}</div>
                  <div className="text-xs text-gray-500">{new Date(call.timestamp).toLocaleTimeString()}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Call Details</h2>
          </div>
          <div className="p-4">
            {selectedCall ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Request</h3>
                  <div className="text-sm space-y-1">
                    <div>
                      <strong>Method:</strong> {selectedCall.method}
                    </div>
                    <div>
                      <strong>URL:</strong> {selectedCall.url}
                    </div>
                    <div>
                      <strong>Status:</strong> {selectedCall.status}
                    </div>
                    <div>
                      <strong>Duration:</strong> {selectedCall.duration}ms
                    </div>
                  </div>
                </div>

                {Object.keys(selectedCall.requestHeaders).length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Request Headers</h3>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                      {JSON.stringify(selectedCall.requestHeaders, null, 2)}
                    </pre>
                  </div>
                )}

                {selectedCall.requestBody && (
                  <div>
                    <h3 className="font-medium mb-2">Request Body</h3>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                      {JSON.stringify(selectedCall.requestBody, null, 2)}
                    </pre>
                  </div>
                )}

                {Object.keys(selectedCall.responseHeaders).length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Response Headers</h3>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                      {JSON.stringify(selectedCall.responseHeaders, null, 2)}
                    </pre>
                  </div>
                )}

                {selectedCall.responseBody && (
                  <div>
                    <h3 className="font-medium mb-2">Response Body</h3>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto max-h-64">
                      {JSON.stringify(selectedCall.responseBody, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-500 text-center">Select an API call to view details</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
