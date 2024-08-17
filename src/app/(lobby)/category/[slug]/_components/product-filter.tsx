'use client';

import { ProductSexEnum } from '@/constants/enum';
import { ISubcategory } from '@/server/db/models/subcategory-model';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
    category: string;
    subcategories: ISubcategory[] | null;
};

export default function ProductFilter({ category, subcategories }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/category/${category}?${params.toString()}`);
    };

    return (
        <div>
            <select
                value={searchParams.get('sex') || ''}
                onChange={(e) => updateFilter('sex', e.target.value)}
            >
                <option disabled value="">Sex</option>
                {Object.values(ProductSexEnum).map(sex => (
                    <option key={sex}>{sex}</option>
                ))}
            </select>
            <select
                value={searchParams.get('subcategory') || ''}
                onChange={(e) => updateFilter('subcategory', e.target.value)}
            >
                <option disabled value="">Sub Categories</option>
                {subcategories && subcategories.map(subcategory => (
                    <option key={subcategory.id} value={subcategory.slug}>{subcategory.name}</option>
                ))}
            </select>
            <input
                type="number"
                placeholder="Min Price"
                value={searchParams.get('gte') || ''}
                onChange={(e) => updateFilter('gte', e.target.value)}
            />
            <input
                type="number"
                placeholder="Max Price"
                value={searchParams.get('lte') || ''}
                onChange={(e) => updateFilter('lte', e.target.value)}
            />
        </div>
    );
}