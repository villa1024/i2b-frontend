import { useContext, useEffect } from "react";

import { ProductContext } from "../context/ProductContext";
import { ProductsList } from "../components/ProductsList";
import { useForm } from "../hooks/useForm";
import { SearchInput } from "../components/SearchInput";

export const OrdersPage = () => {

    const { ordersList, getOrdersList } = useContext(ProductContext);

    const { search, onInputChange } = useForm({
        search: ''
    });

    useEffect(() => {
        getOrdersList();
    }, []);

    if (ordersList.length === 0) {
        return <h5>Cargando ordenes...</h5>
    }

    let results = [];
    if (!search) {
        results = ordersList;
    } else {
        results = ordersList.filter(order => order.name.toLowerCase().includes(search.toLowerCase()));
    }

    return (
        <>
            <h1 className="mb-3">Ordenes</h1>
            <SearchInput
                search={search}
                onInputChange={onInputChange}
            />
            <ProductsList data={results} />
        </>
    );
};