import React from 'react'
import Aboutme from '../componenst/home/Aboutme'
import Contact from '../componenst/home/Contact'
import Footer from '../componenst/home/Footer'
import Header from '../componenst/home/Header'
import Hero from '../componenst/home/Hero'
import Work from '../componenst/home/Work'

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Work />
      <Contact />
      <Aboutme />
      <Footer />
    </div>
  )
}

export default Home