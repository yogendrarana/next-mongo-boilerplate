'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { SliderIcon } from '@radix-ui/react-icons';
import { Checkbox } from "@/components/ui/checkbox";
import { ProductGenderEnum } from '@/constants/enum';
import { useRouter, useSearchParams } from 'next/navigation';
import { ISubcategory } from '@/server/db/models/subcategory-model';

type Props = {
    category: string;
    subcategories: ISubcategory[] | null;
};

export default function ProductFilter({ category, subcategories }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGender, setSelectedGender] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState(searchParams.get('gte') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('lte') || '');
    const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

    useEffect(() => {
        setSelectedGender(searchParams.get('sex')?.split(',') || []);
        setSelectedSubcategories(searchParams.get('subcategory')?.split(',') || []);
    }, [searchParams]);

    const updateFilter = (key: string, value: string | string[]) => {
        const params = new URLSearchParams(searchParams);
        if (Array.isArray(value) && value.length > 0) {
            const encodedValues = value.map(v => encodeURIComponent(v));
            params.set(key, encodedValues.join(','));
        } else if (typeof value === 'string' && value) {
            params.set(key, encodeURIComponent(value));
        } else {
            params.delete(key);
        }
        router.push(`/category/${category}?${params.toString()}`);
    };

    const handleGenderChange = (sex: string) => {
        const newSelectedGender = selectedGender.includes(sex)
            ? selectedGender.filter(s => s !== sex)
            : [...selectedGender, sex];
        setSelectedGender(newSelectedGender);
        updateFilter('sex', newSelectedGender);
    };

    const handleSubcategoryChange = (slug: string) => {
        const newSelectedSubcategories = selectedSubcategories.includes(slug)
            ? selectedSubcategories.filter(s => s !== slug)
            : [...selectedSubcategories, slug];
        setSelectedSubcategories(newSelectedSubcategories);
        updateFilter('subcategory', newSelectedSubcategories);
    };

    const handlePriceChange = (key: 'gte' | 'lte', value: string) => {
        if (key === 'gte') setMinPrice(value);
        else setMaxPrice(value);
        updateFilter(key, value);
    };

    const resetAndClose = () => {
        setMinPrice('');
        setMaxPrice('');
        setIsOpen(false);
        setSelectedGender([]);
        setSelectedSubcategories([]);
        router.push(`/category/${category}`);
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" className='flex items-center gap-3'>
                    <SliderIcon />
                    <span className=''>Filter</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                forceMount
                className="w-[350px] p-5 space-y-5 rounded-md shadow-md bg-white z-50"
                sideOffset={10}
            >
                {/* gender */}
                <DropdownMenuGroup>
                    <label className='text-md font-semibold'>Gender</label>
                    {Object.values(ProductGenderEnum).map(gender => (
                        <div key={gender} className="flex items-center space-x-2 mt-2">
                            <Checkbox
                                id={`gender-${gender}`}
                                checked={selectedGender.includes(gender)}
                                onCheckedChange={() => handleGenderChange(gender)}
                            />
                            <Label htmlFor={`gender-${gender}`} className='capitalize'>{gender}</Label>
                        </div>
                    ))}
                </DropdownMenuGroup>

                {/* sub categories */}
                <DropdownMenuGroup>
                    <label className='text-md font-semibold'>Sub Categories</label>
                    {subcategories && subcategories.map(subcategory => (
                        <div key={subcategory.id} className="flex items-center space-x-2 mt-2">
                            <Checkbox
                                id={`subcategory-${subcategory.slug}`}
                                checked={selectedSubcategories.includes(subcategory.slug)}
                                onCheckedChange={() => handleSubcategoryChange(subcategory.slug)}
                            />
                            <Label htmlFor={`subcategory-${subcategory.slug}`}>{subcategory.name}</Label>
                        </div>
                    ))}
                </DropdownMenuGroup>

                {/* price rance */}
                <DropdownMenuGroup className="flex flex-col gap-2">
                    <label className='text-md font-semibold'>Price Range</label>
                    <Input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => handlePriceChange('gte', e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => handlePriceChange('lte', e.target.value)}
                    />
                </DropdownMenuGroup>

                {/* footer */}
                <div className="flex justify-end">
                    <Button onClick={resetAndClose}>Reset & Close</Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}