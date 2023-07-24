import {
    Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

import { Product } from "../../types/product.type";
import { getProduct } from "../../services/product.service";

const DEBOUNCE_DELAY = 500;

export default function DashboardProduct() {
    const [input, setInput] = useState("");
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<Product[]>([]);

    useEffect(() => {
        if (!query) return;
        setIsLoading(true);
        const timeOutId = setTimeout(async () => {
            try {
                const response = await getProduct(query);
                setResults(response.data.products);
              }
              catch(error: any) {
                let err: AxiosError<any> = error;
                if (!err.response) {
                    throw error;
                }
              }
              finally {
                setIsLoading(false);
              }
            
        }, 500);
        return () => clearTimeout(timeOutId);
    }, [query]);

    const onSearch = (e: any) => {
        const { value } = e.target;
        setInput(value);
        setTimeout(() => {
            if (input) setQuery(input);
        }, DEBOUNCE_DELAY);
    };

    const onClear = () => {
        setInput("");
        setQuery("");
        setResults([]);
    }

    const clickItem = (data: string) => {
        alert("selected: " + data);
        onClear();
    };

    return (
        <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
            <div className="control">
                <div className="">
                    <input type="text" className="input" onChange={onSearch} value={input} />
                </div>
                {results.length > 0 && !isLoading && (
                    <div className="list">
                        {results.map((data, index) => (
                            <div
                                key={index}
                                onClick={() => clickItem(data.title)}
                                className="list-item"
                            >
                                {data.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Box>
    );
}
