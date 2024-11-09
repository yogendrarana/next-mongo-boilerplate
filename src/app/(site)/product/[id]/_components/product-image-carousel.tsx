"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

type CarouselApi = UseEmblaCarouselType["1"];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters["0"];

interface ProductImageCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    images: { url: string; public_id: string }[];
    options?: CarouselOptions;
}

export function ProductImageCarousel({
    images,
    className,
    options,
    ...props
}: ProductImageCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);

    const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const scrollTo = React.useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLButtonElement>) => {
            if (event.key === "ArrowLeft") {
                scrollPrev();
            } else if (event.key === "ArrowRight") {
                scrollNext();
            }
        },
        [scrollNext, scrollPrev]
    );

    const onSelect = React.useCallback((emblaApi: CarouselApi) => {
        if (!emblaApi) return;

        setSelectedIndex(emblaApi.selectedScrollSnap());
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, []);

    React.useEffect(() => {
        if (!emblaApi) return;

        onSelect(emblaApi);
        emblaApi.on("reInit", onSelect);
        emblaApi.on("select", onSelect);
    }, [emblaApi, onSelect]);

    if (images.length === 0) {
        return (
            <div
                aria-label="Product Placeholder"
                role="img"
                aria-roledescription="placeholder"
                className="flex aspect-square size-full flex-1 items-center justify-center bg-secondary"
            >
                <Icons.placeholder className="size-9 text-muted-foreground" aria-hidden="true" />
            </div>
        );
    }

    return (
        <div
            aria-label="Product image carousel"
            className={cn("flex flex-col gap-4", className)}
            {...props}
        >
            <div ref={emblaRef} className="overflow-hidden rounded-lg">
                <div
                    className="flex touch-pan-y"
                    style={{
                        backfaceVisibility: "hidden"
                    }}
                >
                    {images.map((image, index) => (
                        <div
                            className="relative aspect-square min-w-0 flex-[0_0_100%] pl-4"
                            key={index}
                        >
                            <Image
                                aria-label={`Slide ${index + 1} of ${images.length}`}
                                role="group"
                                key={index}
                                aria-roledescription="slide"
                                src={image?.url}
                                alt="product image"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {images.length > 1 ? (
                <div className="flex w-full items-center justify-center gap-2">
                    {images.map((_, i) => (
                        <Button
                            key={i}
                            variant="secondary"
                            size="icon"
                            className={cn(
                                "h-5 w-5 rounded-full",
                                i === selectedIndex ? "bg-black border-none" : "bg-gray-100 border"
                            )}
                            onClick={() => scrollTo(i)}
                            onKeyDown={handleKeyDown}
                        ></Button>
                    ))}
                    <Button
                        variant="outline"
                        size="icon"
                        className="ml-auto h-10 w-10 rounded-sm"
                        disabled={prevBtnDisabled}
                        onClick={scrollPrev}
                    >
                        <ChevronLeftIcon className="size-3 sm:size-4" aria-hidden="true" />
                        <span className="sr-only">Previous slide</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-sm"
                        disabled={nextBtnDisabled}
                        onClick={scrollNext}
                    >
                        <ChevronRightIcon className="size-3 sm:size-4" aria-hidden="true" />
                        <span className="sr-only">Next slide</span>
                    </Button>
                </div>
            ) : null}
        </div>
    );
}
