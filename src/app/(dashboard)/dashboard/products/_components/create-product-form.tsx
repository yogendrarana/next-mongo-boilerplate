"use client";

import * as React from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductGender } from "@/constants";
import { ICategory } from "@/server/db/models/category-model";
import { toast } from "sonner";
import { ISubcategory } from "@/server/db/models/subcategory-model";
import { CreateProductSchemaType } from "../_lib/validations";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface CreateProductFormProps extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
    children: React.ReactNode;
    form: UseFormReturn<CreateProductSchemaType>;
    onSubmit: (data: CreateProductSchemaType) => void;
}

export function CreateProductForm({ form, onSubmit, children }: CreateProductFormProps) {
    const [previews, setPreviews] = React.useState<string[]>([]);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [categories, setCategories] = React.useState<ICategory[] | null>(null);
    const [subcategories, setSubcategories] = React.useState<ISubcategory[] | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        form.setValue("images", files, { shouldValidate: true });
        setPreviews(files.map((file) => URL.createObjectURL(file)));
    };

    const removeImage = (index: number) => {
        const newImages = form.getValues("images").filter((_, i) => i !== index);
        form.setValue("images", newImages, { shouldValidate: true });
        setPreviews(previews.filter((_, i: number) => i !== index));
    };

    React.useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/cat-subcat");
                const data = await res.json();
                setCategories(data.data.categories);
                setSubcategories(data.data.subcategories);
            } catch (err: any) {
                toast.error(err.message || "Failed to load categories");
            }
        })();
    }, []);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="off"
                                        placeholder="Name of the product"
                                        className="focus-visible:ring-1 focus-visible:ring-offset-0"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Price of the product"
                                        className="focus-visible:ring-1 focus-visible:ring-offset-0"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            {categories?.map((category: ICategory) => (
                                                <SelectItem
                                                    key={category._id}
                                                    value={category._id}
                                                    className="capitalize"
                                                >
                                                    {category.slug}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="subcategory"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Sub Category</FormLabel>
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
                                            <SelectValue placeholder="Select a sub category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            {subcategories?.map((subcat: ISubcategory) => (
                                                <SelectItem
                                                    key={subcat._id}
                                                    value={subcat._id}
                                                    className="capitalize"
                                                >
                                                    {subcat.slug}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="inventory"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Inventory</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Stock of the product"
                                        className="focus-visible:ring-1 focus-visible:ring-offset-0"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Gender</FormLabel>
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
                                            <SelectValue placeholder="Select a gender" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            {Object.values(ProductGender).map((gender: string) => (
                                                <SelectItem
                                                    key={gender}
                                                    value={gender}
                                                    className="capitalize"
                                                >
                                                    {gender}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Description of the product"
                                    className="focus-visible:ring-1 focus-visible:ring-offset-0"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* image input */}

                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="images"
                        render={() => (
                            <FormItem>
                                <FormLabel>Upload Images</FormLabel>
                                <FormControl>
                                    <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageChange}
                                            ref={fileInputRef}
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <label htmlFor="image-upload" className="cursor-pointer">
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="text-md font-medium">
                                                    Click to select images
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    Supports multiple images
                                                </p>
                                            </div>
                                        </label>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {previews.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {previews.map((preview, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        className="h-20 w-full border-2 object-cover rounded-md group-hover:opacity-50 transition-opacity"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => removeImage(index)}
                                        aria-label={`Remove image ${index + 1}`}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {children}
            </form>
        </Form>
    );
}
