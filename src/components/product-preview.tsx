import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { AspectRatio } from '../ui/aspect-ratio';
import { IProduct } from '@/server/db/models/product-model';
import { formatPrice } from '@/lib/utils';

interface ProductPreviewProps {
    product: IProduct
    children?: React.ReactNode
}

export function ProductPreview({ product, children }: ProductPreviewProps) {
    return (
        <Dialog>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent className='flex gap-3 p-3'>
                <AspectRatio ratio={16 / 9}>
                    <Image
                        fill
                        loading="lazy"
                        src={product.images[0].url ?? '/images/product-placeholder.webp'}
                        alt={product.name}
                        className="h-full w-full rounded-md object-cover"
                    />
                </AspectRatio>
                <div className='mt-8 flex flex-col gap-3 rounded-md'>
                    <DialogTitle>{product.name}</DialogTitle>
                    <p className='text-sm text-muted-foreground'>{product.description}</p>
                    <p className='text-md font-medium'>{formatPrice(product.price, { currency: "NRS" })}</p>
                </div>
                <DialogClose className='absolute text-zinc-50' />
            </DialogContent>
        </Dialog>
    );
}
