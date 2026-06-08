import { AmbientBackground } from "@/components/Backgrounds"
import { NavV3 } from "@/components/v3/NavV3"
import { HeroV3 } from "@/components/v3/HeroV3"
import { ProblemV3 } from "@/components/v3/ProblemV3"
import { SystemV3 } from "@/components/v3/SystemV3"
import { TwoModesV3 } from "@/components/v3/TwoModesV3"
import { AIActsV3 } from "@/components/v3/AIActsV3"
import { ConsistencyV3 } from "@/components/v3/ConsistencyV3"
import { IntelligenceV3 } from "@/components/v3/IntelligenceV3"
import { OfflineV3 } from "@/components/v3/OfflineV3"
import { ShowcaseV3 } from "@/components/v3/ShowcaseV3"
import { WhyV3 } from "@/components/v3/WhyV3"
import { FinalCTAV3 } from "@/components/v3/FinalCTAV3"
import { FooterV3 } from "@/components/v3/FooterV3"

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <NavV3 />
      <main className="relative">
        <HeroV3 />
        <ProblemV3 />
        <SystemV3 />
        <TwoModesV3 />
        <AIActsV3 />
        <ConsistencyV3 />
        <IntelligenceV3 />
        <OfflineV3 />
        <ShowcaseV3 />
        <WhyV3 />
        <FinalCTAV3 />
      </main>
      <FooterV3 />
    </>
  )
}
