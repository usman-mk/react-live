import { ProductResponse } from "../types/product.type";
import { AxiosResponse, http } from "./http.service";

export async function getProducts(): Promise<
    AxiosResponse<ProductResponse>
> {
    return await http.get<ProductResponse>(
        `https://dummyjson.com/products`
    );
}

export async function getProduct(query: string): Promise<
    AxiosResponse<ProductResponse>
> {
    return await http.get<ProductResponse>(
        `https://dummyjson.com/products/search?q=${query}`
    );
}
