import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";

import { useForm } from "../../hooks/useForm";
import { SearchInput } from "../SearchInput";
import { Pagination } from "../pagination/Pagination";
import { searchProductsByName } from "../../helpers/searchProductsByName";
import { ProductCard } from "./ProductCard";

export const ProductsList = ({ data }) => {

    const {
        getProductsList,
        filterProductsByName,
        setFilterProductsByName,
        totalPages,
    } = useContext(ProductContext);

    const [page, setPage] = useState(0);

    const { search, onInputChange } = useForm({
        search: ''
    });

    const handleNextPage = () => {
        if (totalPages - 1 > page) {
            setPage(prevPage => prevPage + 1);
        }
    };
    const handlePrevPage = () => {
        if (page > 0) {
            setPage(prevPage => prevPage - 1);
        }
    };

    useEffect(() => {
        const result = searchProductsByName(data, search);
        setFilterProductsByName(result);
    }, [search]);

    useEffect(() => {
        getProductsList(page);
    }, [page]);

    return (
        <>
            <SearchInput
                search={search}
                onInputChange={onInputChange}
            />
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
                {
                    filterProductsByName.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))
                }
            </div>
            <Pagination
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                page={page}
                totalPages={totalPages}
            />
        </>
    );
};