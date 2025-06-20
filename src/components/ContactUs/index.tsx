import { Link } from "@/i18n/navigation"
import Image from "next/image"

interface ContactUsProps {
  title: string
  className?: string
  buttontitle: string
  description?: string | React.ReactNode
  linkTo: string
}

const ContactUs: React.FC<ContactUsProps> = ({
  title,
  className = "",
  buttontitle,
  description,
  linkTo
}) => {
  return (
    <section className={`relative xl:px-0 px-6 md:py-32 py-16 ${className}`}>
      {/* Background gradient overlays */}
      <Image
        className="hidden md:block absolute bg-center top-0 left-0 right-0 w-full h-full z-[-10]"
        src="/images/backgrounds/gradient-overlay.png"
        alt="gradient overlay"
        fill
        priority
        sizes="100vw"
      />
      <Image
        className="block md:hidden absolute bg-center top-0 left-0 right-0 w-full h-full z-[-10]"
        src="/images/backgrounds/gradient-overlay-mobile.png"
        alt="gradient overlay mobile"
        fill
        priority
        sizes="100vw"
      />

      <div className="max-w-[832px] w-full mx-auto md:py-0 py-8 flex justify-center items-center flex-col text-center bg-transparent rounded-3xl md:backdrop-blur-0 backdrop-blur-12">
        <Image
          className="!mb-0"
          src="/images/icons/message.svg"
          alt="message icon"
          width={120}
          height={120}
        />
        <p className="text-white text-4xl md:text-5xl leading-[122.222%] md:leading-[116.667%] font-normal mt-8 mb-6">
          {title}
        </p>
        <span className="text-gray-300 text-base leading-6">
          {description ? (
            description
          ) : (
            <>
              Ready to get involved? Fill out our membership form and take the
              first step in shaping the future of Adoptium.
            </>
          )}
        </span>
        <Link href={linkTo}>
          <button className="bg-transparent mt-10 border-2 border-pink-500/0 text-white text-base leading-6 font-bold w-[191px] h-[48px] rounded-2xl gradient-border">
            {buttontitle}
          </button>
        </Link>
      </div>
    </section>
  )
}

export default ContactUs
