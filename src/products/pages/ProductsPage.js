import { useContext, useEffect } from "react";

import { ProductContext } from "../context/ProductContext";
import { ProductsList } from "../components/ProductsList";
import { useForm } from "../hooks/useForm";
import { SearchInput } from "../components/SearchInput";

export const ProductsPage = () => {

    const {
        productsList,
        getProductsList
    } = useContext(ProductContext);

    const { search, onInputChange } = useForm({
        search: ''
    });

    useEffect(() => {
        getProductsList();
    }, []);

    if (productsList.length === 0) {
        return <h5>Cargando productos...</h5>
    }

    let results = [];
    if (!search) {
        results = productsList;
    } else {
        results = productsList.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
    }

    return (
        <>
            <h1 className="mb-3">Lista de productos</h1>
            <SearchInput
                search={search}
                onInputChange={onInputChange}
            />
            <ProductsList data={results} />
        </>
    );
};