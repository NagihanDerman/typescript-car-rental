import { RefObject } from "react";
import Button from "./Button";
import { motion } from "framer-motion";

type Props = {
  // useRef ile referansı alınan bir elementin tipini tanımlarken RefObject kullanırız
  catalogRef: RefObject<HTMLDivElement>;
};

const Hero = ({ catalogRef }: Props) => {
  // katalog alanına sürekleme
  const handleClick = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hero">
      <div className="pt-36 padding-x flex-1 max-h-[920px]">
        <h1 className="hero__title">Feel the Freedom, Start the Journey</h1>

        <p className="hero__subtitle">
          "Are you ready for an unforgettable journey with gold-standard
          service? You can make every moment special by enhancing your car
          rental experience with Golden Options.
        </p>

        <Button
          title="Discover Cars"
          designs="mt-10"
          handleClick={handleClick}
        />
      </div>

      <div className="flex justify-center">
        <motion.img
          initial={{
            translateX: 200,
            scale: 0.7,
          }}
          animate={{
            translateX: 0,
            scale: 1,
          }}
          transition={{
            duration: 1,
          }}
          src="/hero.png"
          alt="bmw"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Hero;
