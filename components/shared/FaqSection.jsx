import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  { num: "01", q: "What is the process for hiring a lawyer?", a: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { num: "02", q: "How much does it cost to hire a lawyer?", a: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  { num: "03", q: "What should I look for when hiring a lawyer?", a: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="container1 py-16">
      <h2 className="text-[32px] font-playfair font-medium text-center">
        Frequently Asked Questions
      </h2>
      <p className="text-[16px] text-center mt-4">
        Here are some of our FAQs. If you have any other questions you'd like answered please feel free to email us.
      </p>

      <div className="mt-10 md:mt-16 max-w-3xl mx-auto">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className={`border-t border-[#dadada] ${i === faqs.length - 1 ? "border-b" : ""}`}>
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-start gap-5 py-5 text-left"
              >
                <span className="font-playfair text-[15px] text-gray-400 pt-[2px] min-w-[28px]">
                  {faq.num}
                </span>
                <span className="flex-1 text-[18px] font-inter font-medium">
                  {faq.q}
                </span>
                <span
                  className="w-7 h-7 flex items-center justify-center border border-[#dadada] rounded-full shrink-0 mt-[2px]"
                  style={{
                    transition: "transform 0.35s ease",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  <Plus size={14} />
                </span>
              </button>

              {/* grid trick — smooth open/close */}
              <div className={`faq-body ${isOpen ? "open" : ""}`}>
                <div className="overflow-hidden">
                  <p className="text-[16px] font-inter text-gray-500 leading-relaxed pb-5 pl-[calc(28px+1.25rem)]">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}