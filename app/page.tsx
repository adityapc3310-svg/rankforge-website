import { Ambient3D } from "@/components/three/Ambient3D"
import { NavV3 } from "@/components/v3/NavV3"
import { Hero3D } from "@/components/v4/Hero3D"
import { ProblemV3 } from "@/components/v3/ProblemV3"
import { SystemOrbit3D } from "@/components/v4/SystemOrbit3D"
import { TwoModesV3 } from "@/components/v3/TwoModesV3"
import { AIActsV3 } from "@/components/v3/AIActsV3"
import { ConsistencyV3 } from "@/components/v3/ConsistencyV3"
import { IntelligenceV3 } from "@/components/v3/IntelligenceV3"
import { OfflineV3 } from "@/components/v3/OfflineV3"
import { ShowcaseV3 } from "@/components/v3/ShowcaseV3"
import { WhyV3 } from "@/components/v3/WhyV3"
import { FAQV3 } from "@/components/v3/FAQV3"
import { FinalCTAV3 } from "@/components/v3/FinalCTAV3"
import { FooterV3 } from "@/components/v3/FooterV3"
import { FAQS } from "@/lib/content"

// FAQPage structured data — rendered into the static HTML so Google can show
// rich results and learn what "RankForge" is.
const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }}
      />
      <Ambient3D />
      <NavV3 />
      <main className="relative">
        <Hero3D />
        <ProblemV3 />
        <SystemOrbit3D />
        <TwoModesV3 />
        <AIActsV3 />
        <ConsistencyV3 />
        <IntelligenceV3 />
        <OfflineV3 />
        <ShowcaseV3 />
        <WhyV3 />
        <FAQV3 />
        <FinalCTAV3 />
      </main>
      <FooterV3 />
    </>
  )
}
