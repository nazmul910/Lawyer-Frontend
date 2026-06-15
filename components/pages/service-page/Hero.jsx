export default function Hero() {
  return (
    <>
      <section className="bg-[linear-gradient(135deg,#0e0e0e,#222C30,#0e0e0e)]">
        <div className="container1 h-[70vh]">
          <div className="flex flex-col items-center justify-center h-full text-center text-white">
            <div>
              <p className="text-[18px] uppercase font-pt_serif">Practice Areas</p>
            </div>
            <div className="w-[70%]">
              <h1 className="text-[86px] text-center border font-playfair letter-spacing-[-3px] leading-[86px] font-medium uppercase">Comprehensive legal support</h1>
            </div>
            <div className="w-1/3 mt-4">
              <p className="text-[20px]">
                We provide expert advice and advocacy across a wide range of
                legal issues.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
