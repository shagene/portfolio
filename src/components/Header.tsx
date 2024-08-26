'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const rotatingTitles = [
  "Senior Software Developer",
  "UX Engineer",
  "Full-Stack Development Expert",
  "Design Systems Architecture Specialist",
  "Former Marine Sergeant",
  "10+ Years in Software Development"
];

const Header = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [titleIndex, setTitleIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused) {
        setTitleIndex((prevIndex) => (prevIndex + 1) % rotatingTitles.length)
      }
    }, 3000) // Change title every 3 seconds

    return () => clearInterval(intervalId)
  }, [isPaused])

  if (!mounted) return null

  return (
    <header className={`transition-all duration-300 fixed w-full z-50 ${
      scrolled 
        ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm shadow-md' 
        : 'bg-transparent'
    }`}>
      <nav className="container mx-auto flex justify-between items-center py-6 px-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-navy-blue dark:text-white transition-opacity duration-300 min-w-[300px]">
            {rotatingTitles[titleIndex]}
          </h2>
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="ml-2 text-sm text-usmc-scarlet dark:text-usmc-gold"
            aria-label={isPaused ? "Resume rotation" : "Pause rotation"}
          >
            {isPaused ? "▶️" : "⏸️"}
          </button>
        </div>
        <ul className="flex space-x-4">
          {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
            <li key={item}>
              <Link 
                href={`#${item.toLowerCase()}`} 
                className="hover:text-usmc-scarlet dark:hover:text-usmc-gold transition-colors px-2 py-1 rounded"
              >
                {item}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hover:text-usmc-scarlet dark:hover:text-usmc-gold transition-colors px-2 py-1 rounded"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header