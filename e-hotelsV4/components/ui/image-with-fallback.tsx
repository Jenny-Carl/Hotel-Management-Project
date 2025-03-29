"use client"

import type React from "react"

import { useState } from "react"

interface ImageWithFallbackProps {
  src: string
  fallbackSrc?: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export function ImageWithFallback({
  src,
  fallbackSrc = "/placeholder.svg?height=300&width=400",
  alt,
  width,
  height,
  className,
  ...rest
}: ImageWithFallbackProps & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "width" | "height">) {
  const [imgSrc, setImgSrc] = useState(src)
  const [error, setError] = useState(false)

  const handleError = () => {
    if (!error) {
      setImgSrc(fallbackSrc)
      setError(true)
    }
  }

  return (
    <img
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
      className={className}
      {...rest}
    />
  )
}

