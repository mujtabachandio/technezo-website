"use client"

import { useEffect, useState } from 'react'
import { urlFor } from '@/sanity/lib/client'
import client from '@/sanity/lib/client'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import FeaturesStrip from './Featurs'
import Image from 'next/image'

interface Slide {
  _id: string
  title: string
  subtitle: string
  alt: string
  image: {
    asset: {
      _ref: string
      _type: string
    }
  }
}

export default function HeroSection() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  // Fetch slides from Sanity
  useEffect(() => {
    const fetchSlides = async () => {
      const data = await client.fetch(`*[_type == "slider"] | order(order asc) {
        _id, title, subtitle, alt, image
      }`)
      setSlides(data)
    }
    fetchSlides()
  }, [])

  // Autoplay effect
  useEffect(() => {
    if (!slides.length) return

    const interval = setInterval(() => {
      if (autoplay) {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, slides])

  const handleManualSlideChange = (index: number) => {
    setCurrentSlide(index)
    setAutoplay(false)
    setTimeout(() => setAutoplay(true), 10000)
  }

  const prevSlide = () => {
    handleManualSlideChange(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)
  }

  const nextSlide = () => {
    handleManualSlideChange(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)
  }

  if (!slides.length)
    return (
      <div className="h-80 md:h-[400px] bg-black text-white flex items-center justify-center">
        Loading slider...
      </div>
    )

  return (
    <section className="bg-black">
      <div className="relative w-full overflow-hidden min-h-[300px] md:min-h-screen max-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[currentSlide]._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
              <Image
                fill
                src={urlFor(slides[currentSlide].image).url()}
                alt={slides[currentSlide].alt}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 z-20 flex justify-center items-center px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[currentSlide]._id + '-content'}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.7 }}
              className="max-w-xl text-white text-center"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {slides[currentSlide].title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8">
                {slides[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrows */}
        <div className="absolute inset-y-0 left-0 z-30 flex items-center">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.9)" }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="bg-black/30 hover:bg-red-600/80 text-white rounded-r-md p-2 ml-2 md:ml-4 focus:outline-none"
          >
            <ChevronLeft size={24} />
          </motion.button>
        </div>

        <div className="absolute inset-y-0 right-0 z-30 flex items-center">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.9)" }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="bg-black/30 hover:bg-red-600/80 text-white rounded-l-md p-2 mr-2 md:mr-4 focus:outline-none"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center space-x-2 md:space-x-3">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleManualSlideChange(index)}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full focus:outline-none ${
                currentSlide === index ? 'bg-red-600' : 'bg-white/50 hover:bg-white'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                scale: currentSlide === index ? [1, 1.2, 1] : 1,
                transition: { duration: 0.5 },
              }}
            />
          ))}
        </div>
      </div>

      <FeaturesStrip />
    </section>
  )
}
