"use client"

import type React from "react"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight, Grid, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageData {
  id: number
  src: string
  alt: string
  category: string
  title: string
}

const images: ImageData[] = [
  {
    id: 1,
    src: "/images/mountain-vista.jpg",
    alt: "Majestic mountain landscape with snow-capped peaks",
    category: "nature",
    title: "Mountain Vista",
  },
  {
    id: 2,
    src: "/images/city-lights.jpg",
    alt: "City skyline illuminated at night",
    category: "urban",
    title: "City Lights",
  },
  {
    id: 3,
    src: "/images/ocean-waves.jpg",
    alt: "Powerful ocean waves crashing on shore",
    category: "nature",
    title: "Ocean Waves",
  },
  {
    id: 4,
    src: "/images/modern-architecture.jpg",
    alt: "Contemporary building with geometric design",
    category: "urban",
    title: "Modern Architecture",
  },
  {
    id: 5,
    src: "/images/forest-trail.jpg",
    alt: "Peaceful forest path through tall trees",
    category: "nature",
    title: "Forest Trail",
  },
  {
    id: 6,
    src: "/images/street-art.jpg",
    alt: "Colorful street art mural on urban wall",
    category: "urban",
    title: "Street Art",
  },
  {
    id: 7,
    src: "/images/portrait-study.jpg",
    alt: "Professional portrait photography",
    category: "people",
    title: "Portrait Study",
  },
  {
    id: 8,
    src: "/images/abstract-colors.jpg",
    alt: "Abstract art with vibrant colors and patterns",
    category: "abstract",
    title: "Abstract Colors",
  },
  {
    id: 9,
    src: "/images/wildlife-photography.jpg",
    alt: "Wildlife animal in natural habitat",
    category: "nature",
    title: "Wildlife Photography",
  },
  {
    id: 10,
    src: "/images/live-concert.jpg",
    alt: "Live music concert with crowd",
    category: "people",
    title: "Live Concert",
  },
  {
    id: 11,
    src: "/images/geometric-art.jpg",
    alt: "Geometric patterns and abstract shapes",
    category: "abstract",
    title: "Geometric Art",
  },
  {
    id: 12,
    src: "/images/night-streets.jpg",
    alt: "Urban streets illuminated at night",
    category: "urban",
    title: "Night Streets",
  },
  {
    id: 13,
    src: "/images/sunset-landscape.jpg",
    alt: "Beautiful sunset over natural landscape",
    category: "nature",
    title: "Sunset Landscape",
  },
  {
    id: 14,
    src: "/images/urban-skyline.jpg",
    alt: "Metropolitan skyline during golden hour",
    category: "urban",
    title: "Urban Skyline",
  },
  {
    id: 15,
    src: "/images/nature-macro.jpg",
    alt: "Close-up macro photography of nature",
    category: "nature",
    title: "Nature Macro",
  },
  {
    id: 16,
    src: "/images/people-gathering.jpg",
    alt: "People gathering in social setting",
    category: "people",
    title: "People Gathering",
  },
]

const categories = ["all", "nature", "urban", "people", "abstract"]

export default function ImageGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [lightboxImage, setLightboxImage] = useState<ImageData | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredImages = selectedCategory === "all" ? images : images.filter((img) => img.category === selectedCategory)

  const openLightbox = (image: ImageData) => {
    setLightboxImage(image)
    setCurrentImageIndex(filteredImages.findIndex((img) => img.id === image.id))
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  const navigateImage = (direction: "prev" | "next") => {
    const newIndex =
      direction === "next"
        ? (currentImageIndex + 1) % filteredImages.length
        : (currentImageIndex - 1 + filteredImages.length) % filteredImages.length

    setCurrentImageIndex(newIndex)
    setLightboxImage(filteredImages[newIndex])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox()
    if (e.key === "ArrowLeft") navigateImage("prev")
    if (e.key === "ArrowRight") navigateImage("next")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Grid className="w-8 h-8" />
            Image Gallery
          </h1>
          <p className="text-gray-600">Explore our curated collection of stunning photography</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Filter className="w-5 h-5 text-gray-500 mt-2" />
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="capitalize transition-all duration-300 hover:scale-105"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-105 cursor-pointer bg-white"
              onClick={() => openLightbox(image)}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                  <p className="text-sm capitalize bg-white bg-opacity-20 px-2 py-1 rounded-full">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No images found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 z-10"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6" />
          </Button>

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 z-10"
            onClick={(e) => {
              e.stopPropagation()
              navigateImage("prev")
            }}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 z-10"
            onClick={(e) => {
              e.stopPropagation()
              navigateImage("next")
            }}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>

          {/* Image Container */}
          <div className="max-w-4xl max-h-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImage.src || "/placeholder.svg"}
              alt={lightboxImage.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Image Info */}
            <div className="text-white text-center mt-4">
              <h2 className="text-2xl font-bold mb-2">{lightboxImage.title}</h2>
              <p className="text-gray-300 capitalize">
                {lightboxImage.category} • {currentImageIndex + 1} of {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .grid > div {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .grid > div:nth-child(1) { animation-delay: 0.1s; }
        .grid > div:nth-child(2) { animation-delay: 0.2s; }
        .grid > div:nth-child(3) { animation-delay: 0.3s; }
        .grid > div:nth-child(4) { animation-delay: 0.4s; }
        .grid > div:nth-child(5) { animation-delay: 0.5s; }
        .grid > div:nth-child(6) { animation-delay: 0.6s; }
        .grid > div:nth-child(7) { animation-delay: 0.7s; }
        .grid > div:nth-child(8) { animation-delay: 0.8s; }
        .grid > div:nth-child(9) { animation-delay: 0.9s; }
        .grid > div:nth-child(10) { animation-delay: 1.0s; }
        .grid > div:nth-child(11) { animation-delay: 1.1s; }
        .grid > div:nth-child(12) { animation-delay: 1.2s; }
      `}</style>
    </div>
  )
}
