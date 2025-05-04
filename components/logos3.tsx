"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

interface Logo {
  id: string;
  description: string;
  image: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const Logos3 = ({
  heading = "Trusted by these companies",
  logos = [],
}: Logos3Props) => {
  return (
    <section className={`py-16 sm:py-24 lg:py-32 overflow-hidden ${""}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl text-pretty">
            {heading}
          </h1>
        </div>

        <div className="pt-10 md:pt-16 lg:pt-20">
          <div className="relative flex items-center justify-center max-w-6xl mx-auto">
            <Carousel opts={{ loop: true }} plugins={[AutoScroll({ playOnInit: true })]}>
              <CarouselContent className="ml-0">
                {logos.length > 0 ? (
                  logos.map((logo) => (
                    <CarouselItem
                      key={logo.id}
                      className="flex justify-center basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                    >
                      <div className="mx-4 flex items-center justify-center">
                        <Image
                          width={100}
                          height={100}
                          src={logo.image.startsWith("/") ? logo.image : `/${logo.image}`} // Adjust image path handling
                          alt={logo.description}
                          className={`object-contain ${logo.className}`}
                        />
                      </div>
                    </CarouselItem>
                  ))
                ) : (
                  <div className="text-center py-8">No logos available</div>
                )}
              </CarouselContent>
            </Carousel>

            {/* Gradient overlays adjust responsively */}
            <div className="hidden overflow-hidden md:block absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
            <div className="hidden overflow-hidden md:block absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Logos3 };
