"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function SlideShow({
  images = [],
  link,
}: {
  images?: string[];
  link?: string;
}) {
  if (!images || images.length === 0) return null;

  const slides = images.filter(Boolean);

  if (slides.length === 0) return null;

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4500,
          stopOnInteraction: true,
        }),
      ]}
      className="relative mx-auto w-full"
    >
      <CarouselContent>
        {slides.map((image, index) => {
          const content = (
            <Image
              className="h-auto max-h-[70vh] w-full rounded-2xl object-cover"
              src={image}
              width={1600}
              height={900}
              alt={`Captura ${index + 1} del proyecto`}
              sizes="(min-width: 1024px) 896px, 100vw"
            />
          );

          return (
            <CarouselItem key={index}>
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-2xl"
                >
                  {content}
                </a>
              ) : (
                <div className="overflow-hidden rounded-2xl">{content}</div>
              )}
            </CarouselItem>
          );
        })}
      </CarouselContent>
      {slides.length > 1 ? (
        <>
          <CarouselPrevious className="left-2 border-sage/40 bg-charcoal/80 text-mint hover:bg-sage hover:text-charcoal" />
          <CarouselNext className="right-2 border-sage/40 bg-charcoal/80 text-mint hover:bg-sage hover:text-charcoal" />
        </>
      ) : null}
    </Carousel>
  );
}
