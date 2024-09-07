"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

let interval: NodeJS.Timeout;

export default function ImageStack({
    images,
    offset = 5,
    scaleFactor = 0.08,
}: {
    images: string[];
    offset?: number;
    scaleFactor?: number;
}) {
    const [cards, setCards] = useState<string[]>(images);

    useEffect(() => {
        const interval = setInterval(() => {
            setCards((prevCards) => {
                const newArray = [...prevCards];
                newArray.unshift(newArray.pop()!);
                return newArray;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-32 w-full relative">
            {cards.map((img, index) => (
                <motion.div
                    key={img}
                    className="absolute h-full w-32 rounded-md overflow-hidden"
                    style={{ transformOrigin: "right center" }}
                    animate={{
                        left: index * offset,
                        scale: 1 - index * scaleFactor,
                        zIndex: cards.length - index,
                    }}
                >
                    <Image
                        src={img}
                        alt={`Image ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        loading="lazy"
                    />
                </motion.div>
            ))}
        </div>
    );
}