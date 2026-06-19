import ExpertiseSection from "@/components/pages/service-page/Expertise-Seciton";
import Hero from "@/components/pages/service-page/Hero";
import Faq from "@/components/shared/FaqSection";


export default function Service(){
    return(
        <>
            <section>
                <Hero/>
                <ExpertiseSection/>
                <Faq/>
            </section>
        </>
    )
}