'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const rotatingTitles = [
  "Senior Software Developer",
  "UX Engineer",
  "Full-Stack Development Expert",
  "Design Systems Architecture Specialist",
  "Marine Sergeant",
  "10+ Years in Software Development"
];

const Header = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [titleIndex, setTitleIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      // Close the menu when scrolling
      if (isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMenuOpen])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused) {
        setTitleIndex((prevIndex) => (prevIndex + 1) % rotatingTitles.length)
      }
    }, 3000) // Change title every 3 seconds

    return () => clearInterval(intervalId)
  }, [isPaused])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  if (!mounted) return null

  return (
    <header className={`transition-all duration-300 fixed w-full z-50 bg-white dark:bg-dark-bg ${
      scrolled ? 'shadow-md' : ''
    }`}>
      <nav className="container mx-auto flex justify-between items-center py-6 px-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-navy-blue dark:text-white transition-opacity duration-300 min-w-[300px] sm:min-w-0">
            {rotatingTitles[titleIndex]}
          </h2>
          {/* <button 
            onClick={() => setIsPaused(!isPaused)}
            className="ml-2 text-sm text-usmc-scarlet dark:text-usmc-gold"
            aria-label={isPaused ? "Resume rotation" : "Pause rotation"}
          >
            {isPaused ? "▶️" : "⏸️"}
          </button> */}
        </div>
        
        {/* Hamburger menu for mobile */}
        <button
          className="sm:hidden text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Desktop menu */}
        <ul className="hidden sm:flex space-x-4">
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

      {/* Mobile menu backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        ></div>
      )}

      {/* Mobile side menu */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-dark-bg shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } sm:hidden`}>
        <button
          className="absolute top-4 right-4 text-2xl text-navy-blue dark:text-white"
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          ×
        </button>
        <ul className="flex flex-col space-y-4 p-4 mt-16">
          {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
            <li key={item}>
              <Link 
                href={`#${item.toLowerCase()}`} 
                className="text-navy-blue dark:text-white hover:text-usmc-scarlet dark:hover:text-usmc-gold transition-colors px-2 py-1 rounded block"
                onClick={toggleMenu}
              >
                {item}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark')
                toggleMenu()
              }}
              className="text-navy-blue dark:text-white hover:text-usmc-scarlet dark:hover:text-usmc-gold transition-colors px-2 py-1 rounded"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header