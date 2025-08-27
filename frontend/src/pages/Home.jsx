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
      <main>
        <section id="Hero">
          <Hero />
        </section>
        <section id="Aboutme">
          <Aboutme />
        </section>
        <section id="Work">
          <Work />
        </section>
        <section id="Contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home