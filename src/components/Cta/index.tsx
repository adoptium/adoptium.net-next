import React from "react";
import Link from "next/link";

interface CtaProps {
  title: string;
  description: string;
  linkText: string;
  link: string;
}

const Cta: React.FC<CtaProps> = ({ title, description, linkText, link }) => {
  return (
    <section className="py-16 max-w-[1048px] w-full mx-auto flex justify-center xl:px-0 px-6">
      <div className="lg:max-w-[560px] w-full mx-auto text-center">
        <p className="md:mt-6 my-10 text-grey text-base leading-6 font-normal mb-0">
          {description}
        </p>
        <Link href={link} className="inline-block">
          <button
            className="bg-transparent mt-10 border-2 border-pink-500/0 text-white text-base leading-6 font-normal w-[250px] h-[48px] rounded-2xl gradient-border transition-all duration-300 hover:border-pink-500/100 hover:text-pink"
            type="button"
          >
            {linkText}
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Cta;
