import { AmbientBackground } from "@/components/Backgrounds"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { StatsBar } from "@/components/StatsBar"
import { Features } from "@/components/Features"
import { DashboardShowcase } from "@/components/DashboardShowcase"
import { AISection } from "@/components/AISection"
import { Comparison } from "@/components/Comparison"
import { Testimonials } from "@/components/Testimonials"
import { Roadmap } from "@/components/Roadmap"
import { Pricing } from "@/components/Pricing"
import { FinalCTA } from "@/components/FinalCTA"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <Navbar />
      <main className="relative">
        <Hero />
        <StatsBar />
        <Features />
        <DashboardShowcase />
        <AISection />
        <Comparison />
        <Testimonials />
        <Roadmap />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
