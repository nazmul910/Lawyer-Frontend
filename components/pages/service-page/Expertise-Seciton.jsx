import Card from "@/components/utils/Card";
import TopTitleSection from "@/components/utils/Top-Tite-Seciton";

export default function ExpertiseSection(){
    return(
        <>
            <section className="container1 py-16 ">
                <div className="">
                    <TopTitleSection title="Discover the ideal legal assistance" subtitle="Our area of ​​expertise" description="Whether you’re facing a challenge or planning ahead, our team is ready to help you take the next step with confidence." />
                </div>

                <div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 2xl:gap-8 mt-10 md:mt-16">
                        <Card/>
                        <Card/>
                        <Card/>
                    </div>
                </div>

            </section>
        </>
    )
}