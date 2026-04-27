import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"

import Hero from "./components/sections/Hero"
import Benefits from "./components/sections/Benefits"
import Economy from "./components/sections/Economy"
import CTAForm from "./components/sections/CTAForm"
import Services from "./components/sections/Services"
import MapSection from "./components/sections/MapSection"
import CTAFinal from "./components/sections/CTAFinal"

export default function Home() {
  return (
    <>
      {/* <Header /> */}

      <main>
        <Hero />
        <Benefits />
        <Economy />
        <Services />
        <CTAForm />
        <CTAFinal />
        <MapSection />
      </main>

      <Footer />
    </>
  )
}