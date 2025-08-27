import React from 'react'
import Nav from './Nav'
import './styles/Header.scss'

const Header = () => {
  return (
    <header>
      <div className="inner">
        <h4>logo</h4>
        <div className="right-warp">
          <Nav />
          <button>🌙</button>
        </div>
      </div>
    </header>
  )
}

export default Header