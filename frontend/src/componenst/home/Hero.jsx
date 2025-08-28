import React from 'react'
import './styles/Hero.scss'

const Hero = () => {
  return (
    <div className='inner hero-inner'>
      <h1 className='tit'>
        <span>developer</span>
        <span className='star-spin'>back<i className="star">✱</i>front</span>
        <span>portfolio</span>
      </h1>
      <p className='txt'>시맨틱 마크업을 통해 웹 접근성, 웹 표준을 준수하여 차별이 없는 웹을 지향합니다.
        <br />CSS(SCSS), Javascript, Jquery를 활용한 퍼블리싱을 좋아하고,
        <br />Node.js, express, React를 공부하여 프론트앤드로서의 성장과 도전에도 욕심이 많습니다.</p>
      <div className="arrow">
        ⬇
      </div>
    </div>
  )
}

export default Hero