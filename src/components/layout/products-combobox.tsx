"use client"

import * as React from "react"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Kbd } from "@/components/utils/kdb"
import { cn, isMacOs } from "@/lib/utils"
import { Icons } from "@/components/utils/icons"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/use-debounce"
import { Skeleton } from "@/components/ui/skeleton"
import { searchProduct } from "@/server/actions/product"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

export function ProductsCombobox() {
    const router = useRouter()
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState("")
    const debouncedQuery = useDebounce(query, 300)
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState<any[] | null>(null)

    React.useEffect(() => {
        if (debouncedQuery.length <= 0) {
            setData(null)
            return
        }

        async function fetchData() {
            setLoading(true)
            const res = await searchProduct({ query: debouncedQuery })

            if (!res.success) {
                setLoading(false)
                return
            }
            setData(res.data as any[] | null)
            setLoading(false)
        }

        void fetchData()
    }, [debouncedQuery])

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    const onSelect = React.useCallback((callback: () => unknown) => {
        setOpen(false)
        callback()
    }, [])

    return (
        <>
            <Button
                variant="outline"
                className="relative size-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
                onClick={() => setOpen(true)}
            >
                <MagnifyingGlassIcon className="size-4 xl:mr-2" aria-hidden="true" />
                <span className="hidden xl:inline-flex">Search products...</span>
                <span className="sr-only">Search products</span>
                <Kbd
                    title={isMacOs() ? "Command" : "Control"}
                    className="pointer-events-none absolute right-1.5 top-1.5 hidden xl:block"
                >
                    {isMacOs() ? "⌘" : "Ctrl"} K
                </Kbd>
            </Button>
            <CommandDialog
                open={open}
                onOpenChange={(open) => {
                    setOpen(open)
                    if (!open) {
                        setQuery("")
                    }
                }}
            >
                <CommandInput
                    placeholder="Search products..."
                    value={query}
                    onValueChange={setQuery}
                />
                <CommandList>
                    <CommandEmpty
                        className={cn(loading ? "hidden" : "py-6 text-center text-sm")}
                    >
                        No products found.
                    </CommandEmpty>
                    {loading ? (
                        <div className="space-y-1 overflow-hidden px-1 py-2">
                            <Skeleton className="h-4 w-10 rounded" />
                            <Skeleton className="h-8 rounded-sm" />
                            <Skeleton className="h-8 rounded-sm" />
                        </div>
                    ) : (
                        data?.map((group) => (
                            <CommandGroup
                                key={group.name}
                                className="capitalize"
                                heading={group.name}
                            >
                                {group.products.map((item: any) => {
                                    return (
                                        <CommandItem
                                            key={item.id}
                                            className="h-9"
                                            value={item.name}
                                            onSelect={() =>
                                                onSelect(() => router.push(`/product/${item.id}`))
                                            }
                                        >
                                            <Icons.product
                                                className="mr-2.5 size-3 text-muted-foreground"
                                                aria-hidden="true"
                                            />
                                            <span className="truncate">{item.name}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        ))
                    )}
                </CommandList>
            </CommandDialog>
        </>
    )
}
