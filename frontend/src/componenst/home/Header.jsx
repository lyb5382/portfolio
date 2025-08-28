import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import './styles/Header.scss'
import { useTheme } from '../../context/ThemeContext'

const Header = () => {
  const { isDark, theme, toggleTheme } = useTheme()
  const [scroll, setScroll] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true)
      } else {
        setScroll(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
  }, [setScroll])
  return (
    <header className={`${scroll ? 'scroll' : ''}`}>
      <div className="inner">
        <h4>logo</h4>
        <div className="right-warp">
          <Nav />
          <button className='btn' onClick={toggleTheme}>{isDark ? '🌙' : '☀️'} {theme}</button>
        </div>
      </div>
    </header>
  )
}

export default Header