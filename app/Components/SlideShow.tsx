"use client";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function SlideShow({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="w-[60%] mx-auto h-fit "
    >
      <CarouselContent className="flex items-center ">
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="flex-shrink-0 w-full flex justify-center"
          >
            <Card className="w-fit bg-zinc-100">
              <CardContent className="w-fit">
                <Image
                  className="object-contain rounded-xl"
                  src={image}
                  width={600}
                  height={300}
                  alt={`Screenshot image`}
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
