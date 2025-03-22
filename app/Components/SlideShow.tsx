"use client";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export default function SlideShow({
  images,
  link,
}: {
  images: string[];
  link: string;
}) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="w-[70%] mx-auto h-fit "
    >
      <CarouselContent className="flex items-center ">
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="flex-shrink-0 w-full flex justify-center"
          >
            <Link href={link} prefetch={true}>
              <Image
                className="object-contain rounded-xl"
                src={image}
                width={600}
                height={300}
                alt={`Screenshot image`}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
