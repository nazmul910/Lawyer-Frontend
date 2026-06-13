
const AboutSection = () =>{
    return(
        <>
            <section className="flex flex-col gap-7 md:gap-14 lg:gap-0 lg:flex py-20 mt-10" id="about">
                <div className="">
                    <img src="/image/lawyer_client.jpeg" alt="" />
                </div>
                <div className=" px-6 md:px-10 lg:w-[90%] lg:px-10 xl:px-20 space-y-5 ">
                    <h1 className=" font-pt_serif font-bold text-2xl md:text-4xl">We Properly Understand Your Purpose</h1>
                    <p className=" text-secondary text-justify">Multiply replenish sea won't fishl own without dry. Deep behold from can't itself fourth i fish creeping multiply, without you our they dry together so lesser herb were.</p>
                    <p className=" text-secondary text-justify">Every appear very fill. Whales there beginning day second give me to whales likeness after forth their won't. Don fruit let multiply secon brought can't darkness saying. Stars can't after given one dry he subdue very called fourth image own won't open meat moved megathe red yielding do not .</p>
            <button className=" px-5 md:px-10 py-2 md:py-3 font-semibold bg-button-bg hover:text-button-bg hover:bg-button-color transition-all cursor-pointer duration-300 hover:border-0 border">
              Learn More
            </button>
                </div>
            </section> 
        </>
    )
}

export default AboutSection;