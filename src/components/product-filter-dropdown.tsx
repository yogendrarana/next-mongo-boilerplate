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
import { ICategory } from '@/server/db/models/category-model';
import { ISubcategory } from '@/server/db/models/subcategory-model';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
    categories?: ICategory[] | null;
    subCategories?: ISubcategory[] | null;
};

export default function ProductFilterDropdown({
    categories,
    subCategories
}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGender, setSelectedGender] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState(searchParams.get('gte') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('lte') || '');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSubcategories, setSelectedSuccategories] = useState<string[]>([]);


    useEffect(() => {
        setSelectedGender(searchParams.get('gender')?.split(',') || []);
        setSelectedCategories(searchParams.get('category')?.split(',') || []);
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
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleGenderChange = (gender: string) => {
        const newSelectedGender = selectedGender.includes(gender)
            ? selectedGender.filter(g => g !== gender)
            : [...selectedGender, gender];
        setSelectedGender(newSelectedGender);
        updateFilter('gender', newSelectedGender);
    };

    const handlePriceChange = (key: 'gte' | 'lte', value: string) => {
        if (key === 'gte') setMinPrice(value);
        else setMaxPrice(value);
        updateFilter(key, value);
    };

    const handleCategoryChange = (slug: string) => {
        const newSelectedCategories = selectedCategories.includes(slug)
            ? selectedCategories.filter(c => c !== slug)
            : [...selectedCategories, slug];
        setSelectedCategories(newSelectedCategories);
        updateFilter('category', newSelectedCategories);
    };

    const handleSubcategoryCategoryChange = (slug: string) => {
        const newSubcategories = selectedSubcategories.includes(slug)
            ? selectedSubcategories.filter(c => c !== slug)
            : [...selectedSubcategories, slug];
        setSelectedSuccategories(newSubcategories);
        updateFilter('subcategory', newSubcategories);
    }

    const resetAndClose = () => {
        setMinPrice('');
        setMaxPrice('');
        setIsOpen(false);
        setSelectedGender([]);
        setSelectedCategories([]);
        router.push(`${pathname}`);
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
                {/* Category */}
                {
                    categories && categories.length > 0 && (
                        <DropdownMenuGroup>
                            <label className='text-md font-semibold'>Category</label>
                            {categories?.map(cat => (
                                <div key={cat.id} className="flex items-center space-x-2 mt-2">
                                    <Checkbox
                                        id={`category-${cat.slug}`}
                                        checked={selectedCategories.includes(cat.slug)}
                                        onCheckedChange={() => handleCategoryChange(cat.slug)}
                                    />
                                    <Label htmlFor={`category-${cat.slug}`}>{cat.name}</Label>
                                </div>
                            ))}
                        </DropdownMenuGroup>
                    )
                }

                {/* Sub categories */}
                {
                    subCategories && subCategories.length > 0 && (
                        <DropdownMenuGroup>
                            <label className='text-md font-semibold'>Sub Categories</label>
                            {subCategories.map(subcategory => (
                                <div key={subcategory.id} className="flex items-center space-x-2 mt-2">
                                    <Checkbox
                                        id={`subcategory-${subcategory.slug}`}
                                        checked={selectedSubcategories.includes(subcategory.slug)}
                                        onCheckedChange={() => handleSubcategoryCategoryChange(subcategory.slug)}
                                    />
                                    <Label htmlFor={`subcategory-${subcategory.slug}`}>{subcategory.name}</Label>
                                </div>
                            ))}
                        </DropdownMenuGroup>
                    )
                }

                {/* Gender */}
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

                {/* Price range */}
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

                {/* Footer */}
                <div className="flex justify-end">
                    <Button onClick={resetAndClose}>Reset & Close</Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}