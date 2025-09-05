import React, { useEffect, useState } from 'react'
import Nav from "./Nav"
import "./styles/Header.scss"
import { useTheme } from '../../context/ThemeContext'
const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [meue, setMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    handleScroll()

    window.addEventListener('scroll', handleScroll)

  }, [])

  useEffect(() => {
    const onkey = (e) => e.key == 'Escape' && setMenu(false)
    document.addEventListener('keydown', onkey)
    return () => document.removeEventListener('keydown', onkey)
  }, [])

  return (
    <header className={`${scrolled ? "scroll" : ""} ${meue ? 'is-open' : ''}`}>
      <div className="inner">
        <h4>LOGO</h4>
        <div className="right-wrap">
          <button className='mob-nav-btn' onClick={() => setMenu(v => !v)}>
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </button>
          <Nav />
          <button className='btn' onClick={toggleTheme}>{theme}</button>

        </div>
      </div>
    </header>
  )
}

export default Header