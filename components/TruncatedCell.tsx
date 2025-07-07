"use client"

import { useState, useRef, useEffect } from "react"

interface TruncatedCellProps {
  children: React.ReactNode
  className?: string
}

export function TruncatedCell({ children, className = "" }: TruncatedCellProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const isOverflowing = textRef.current.scrollWidth > textRef.current.clientWidth
        setIsTruncated(isOverflowing)
      }
    }

    checkTruncation()
    
    // Check again when the window resizes
    window.addEventListener('resize', checkTruncation)
    return () => window.removeEventListener('resize', checkTruncation)
  }, [children])

  return (
    <div className="relative">
      <div
        ref={textRef}
        className={`overflow-hidden text-ellipsis whitespace-nowrap ${className}`}
        onMouseEnter={() => isTruncated && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
      
      {showTooltip && isTruncated && (
        <div className="absolute bottom-full left-0 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md shadow-lg z-50 whitespace-nowrap max-w-sm pointer-events-none">
          {children}
          <div className="absolute top-full left-2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  )
}
