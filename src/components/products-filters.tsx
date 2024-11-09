"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { ProductGenderEnum } from "@/constants/enum";
import { ICategory } from "@/server/db/models/category-model";
import { ISubcategory } from "@/server/db/models/subcategory-model";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";

// category filter
export function ProductsCategoryFilter({
    categories,
    className,
    triggerClassName
}: {
    categories: ICategory[] | null;
    className?: string;
    triggerClassName?: string;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = React.useState(false);

    const [selectedCategory, setSelectedCategory] = React.useState<string>("");

    React.useEffect(() => {
        setSelectedCategory(searchParams.get("category") || "");
    }, [searchParams]);

    // Update filter
    const updateFilter = React.useCallback(
        (filterKey: string, value: string | string[]) => {
            const params = new URLSearchParams(searchParams);

            if (Array.isArray(value) && value.length > 0) {
                const encodedValues = value.map((v) => encodeURIComponent(v));
                params.set(filterKey, encodedValues.join(","));
            } else if (typeof value === "string" && value) {
                params.set(filterKey, encodeURIComponent(value));
            } else {
                params.delete(filterKey);
            }

            router.push(`${pathname}?${params.toString()}`);
        },

        [pathname, router, searchParams]
    );

    return (
        <div className={cn("flex gap-3", className)}>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn("w-[200px] justify-between capitalize", triggerClassName)}
                    >
                        {selectedCategory ? selectedCategory : "Select category"}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search category..." />
                        <CommandList>
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup>
                                {categories?.map((cat) => (
                                    <CommandItem
                                        className="py-2.5"
                                        key={cat._id.toString()}
                                        value={cat.slug}
                                        onSelect={() => {
                                            if (selectedCategory === cat.slug) {
                                                setSelectedCategory("");
                                                updateFilter("category", "");
                                                setIsOpen(false);

                                                return;
                                            }

                                            setSelectedCategory(cat.slug);
                                            setIsOpen(false);
                                            updateFilter("category", cat.slug);
                                        }}
                                    >
                                        <Label htmlFor={`category-${cat.slug}`}>{cat.name}</Label>
                                        <Check
                                            size={14}
                                            className={cn(
                                                "ml-auto",
                                                selectedCategory === cat.slug
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}

// sub category filter
export function ProductsSubcategoryFilter({
    subcategories,
    className,
    triggerClassName
}: {
    subcategories: ISubcategory[] | null;
    className?: string;
    triggerClassName?: string;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedSubcategories, setSelectedSubcategories] = React.useState<string[]>([]);

    React.useEffect(() => {
        setSelectedSubcategories(searchParams.get("gender")?.split(",") || []);
    }, [searchParams]);

    // Update filter
    const updateFilter = React.useCallback(
        (filterKey: string, value: string | string[]) => {
            const params = new URLSearchParams(searchParams);

            if (Array.isArray(value) && value.length > 0) {
                const encodedValues = value.map((v) => encodeURIComponent(v));
                params.set(filterKey, encodedValues.join(","));
            } else if (typeof value === "string" && value) {
                params.set(filterKey, encodeURIComponent(value));
            } else {
                params.delete(filterKey);
            }

            router.push(`${pathname}?${params.toString()}`);
        },

        [pathname, router, searchParams]
    );

    const handleSubcategoryCategoryChange = (slug: string) => {
        const newSubcategories = selectedSubcategories.includes(slug)
            ? selectedSubcategories.filter((c) => c !== slug)
            : [...selectedSubcategories, slug];
        setSelectedSubcategories(newSubcategories);
        updateFilter("subcategory", newSubcategories);
    };

    return (
        <div className={cn("flex gap-3", className)}>
            {/* filter sub category */}
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn("w-[200px] justify-between capitalize", triggerClassName)}
                    >
                        Select Sub Category
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search Sub category..." />
                        <CommandList>
                            <CommandEmpty>No sub category category found.</CommandEmpty>
                            <CommandGroup>
                                <ScrollArea className="h-[200px]">
                                    {subcategories?.map((subcat) => (
                                        <CommandItem
                                            className="py-2.5"
                                            key={subcat._id.toString()}
                                            value={subcat.slug}
                                            onSelect={() => {
                                                handleSubcategoryCategoryChange(subcat.slug);
                                                setIsOpen(false);
                                            }}
                                        >
                                            <Label htmlFor={`subcategory-${subcat.slug}`}>
                                                {subcat.name}
                                            </Label>

                                            <Check
                                                size={14}
                                                className={cn(
                                                    "ml-auto",
                                                    selectedSubcategories.includes(subcat.slug)
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </ScrollArea>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}

// gender filter
export function ProductsGenderFilter({
    className,
    triggerClassName
}: {
    className?: string;
    triggerClassName?: string;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedGender, setSelectedGender] = React.useState<string[]>([]);

    React.useEffect(() => {
        setSelectedGender(searchParams.get("gender")?.split(",") || []);
    }, [searchParams]);

    // Update filter
    const updateFilter = React.useCallback(
        (filterKey: string, value: string | string[]) => {
            const params = new URLSearchParams(searchParams);

            if (Array.isArray(value) && value.length > 0) {
                const encodedValues = value.map((v) => encodeURIComponent(v));
                params.set(filterKey, encodedValues.join(","));
            } else if (typeof value === "string" && value) {
                params.set(filterKey, encodeURIComponent(value));
            } else {
                params.delete(filterKey);
            }

            router.push(`${pathname}?${params.toString()}`);
        },

        [pathname, router, searchParams]
    );

    const handleGenderChange = (gender: string) => {
        const newSelectedGender = selectedGender.includes(gender)
            ? selectedGender.filter((g) => g !== gender)
            : [...selectedGender, gender];
        setSelectedGender(newSelectedGender);
        updateFilter("gender", newSelectedGender);
    };

    return (
        <div className={cn("flex gap-3", className)}>
            {/* filter gender */}
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn("w-[200px] justify-between capitalize", triggerClassName)}
                    >
                        Select Gender
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search Sub category..." />
                        <CommandList>
                            <CommandEmpty>No gender found.</CommandEmpty>
                            <CommandGroup>
                                {Object.values(ProductGenderEnum).map((gender) => (
                                    <CommandItem
                                        className="py-2.5"
                                        key={gender}
                                        value={gender}
                                        onSelect={() => {
                                            handleGenderChange(gender);
                                            setIsOpen(false);
                                        }}
                                    >
                                        <Label htmlFor={`gender-${gender}`}>{gender}</Label>

                                        <Check
                                            size={14}
                                            className={cn(
                                                "ml-auto",
                                                selectedGender.includes(gender)
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
