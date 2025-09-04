import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { SiNotion } from 'react-icons/si'

const Footer = () => {
  return (
    <div className='inner foot-inner'>
      <div className="left"></div>
      <div className="right">
        <a href="">
          <FaGithub size={28} />
        </a>
        <a href="">
          <SiNotion size={28} />
        </a>
      </div>
    </div>
  )
}

export default Footer