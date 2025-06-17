"use client"

import { useState, useEffect } from "react"

export function DevToolsInfo() {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false)
  const [devToolsConfig, setDevToolsConfig] = useState(null)

  useEffect(() => {
    // Check if DevTools is open
    const checkDevTools = () => {
      const threshold = 160
      setIsDevToolsOpen(
        window.outerHeight - window.innerHeight > threshold || window.outerWidth - window.innerWidth > threshold,
      )
    }

    // Fetch DevTools configuration
    fetch("/.well-known/appspecific/com.chrome.devtools.json")
      .then((res) => res.json())
      .then(setDevToolsConfig)
      .catch(() => {}) // Ignore errors

    checkDevTools()
    window.addEventListener("resize", checkDevTools)

    return () => window.removeEventListener("resize", checkDevTools)
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black text-white text-xs px-3 py-2 rounded-lg shadow-lg">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isDevToolsOpen ? "bg-green-400" : "bg-gray-400"}`}></div>
          <span>DevTools: {isDevToolsOpen ? "Open" : "Closed"}</span>
        </div>
        {devToolsConfig && <div className="mt-1 text-gray-300">Config loaded ✓</div>}
      </div>
    </div>
  )
}
