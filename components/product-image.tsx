"use client"

import { useState } from "react"
import Image from "next/image"

interface ProductImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export default function ProductImage({ src, alt, width = 400, height = 400, className = "" }: ProductImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)


  const handleLoad = () => {
    setIsLoading(false)
  }

 
  const handleError = () => {
    setIsLoading(false)
    setError(true)
  }

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: width / height }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <span className="sr-only">Đang tải...</span>
        </div>
      )}

      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
          <div className="text-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mx-auto mb-2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p>Không thể tải hình ảnh</p>
          </div>
        </div>
      ) : (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover"
          onLoad={handleLoad}
          onError={handleError}
          sizes={`(max-width: 768px) 100vw, ${width}px`}
          priority={false}
        />
      )}
    </div>
  )
}

