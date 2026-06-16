import img from "@/public/image/area/img1.jpg";
import Image from "next/image";

export default function Card(){
    return(
        <>
            <div>
                <div className="pt-5 px-3 flex flex-col items-start justify-start gap-3">
                    <p>01</p>
                    <div>
                        <h3>Business Law</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate. </p>
                    </div>
                    <button>
                        Learn More
                    </button>
                </div>
                <div className="relative w-full h-[250px]">
                    <Image src={img} alt="Business Law" fill className="object-cover" />
                </div>
            </div>
        </>
    )
}