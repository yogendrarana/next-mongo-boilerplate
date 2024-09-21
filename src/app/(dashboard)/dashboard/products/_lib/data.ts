import { IProduct } from "@/server/db/models/product-model";

export const data: IProduct[] = [
    {
      productId: "12345",
      name: "Apple iPhone 13 Pro",
      price: 999.99,
      inventory: 10,
      category: {
        id: "12345",
        slug: "smartphones"
      },
      _id: "",
      description: "",
      subcategory: {
        id: "",
        slug: "sub category"
      },
      sku: "",
      images: [],
      gender: ""
    },
    {
      productId: "12346",
      name: "Samsung Galaxy S21",
      price: 799.49,
      inventory: 5,
      category: {
        id: "12345",
        slug: "smartphones"
      },
      _id: "",
      description: "",
      subcategory: {
        id: "",
        slug: "sub category"
      },
      sku: "",
      images: [],
      gender: ""
    },
    {
      productId: "12347",
      name: "Sony WH-1000XM4",
      price: 249.75,
      inventory: 15,
      category: {
        id: "12345",
        slug: "smartphones"
      },
      _id: "",
      description: "",
      subcategory: {
        id: "",
        slug: "sub category"
      },
      sku: "",
      images: [],
      gender: ""
    },
    {
      productId: "12348",
      name: "Apple AirPods Pro",
      price: 199.99,
      inventory: 20,
      category: {
        id: "12345",
        slug: "smartphones"
      },
      _id: "",
      description: "",
      subcategory: {
        id: "",
        slug: "sub category"
      },
      sku: "",
      images: [],
      gender: ""
    }
  ]