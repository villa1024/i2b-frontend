import { useContext, useEffect, useState } from "react";

import { ProductContext } from "../../context/ProductContext";
import { Pagination } from "../pagination/Pagination";
import { OrdersTableItem } from "./OrdersTableItem";
import { SearchInput } from "../SearchInput";
import { useForm } from "../../hooks/useForm";
import { searchTableByName } from "../../helpers/searchTableByName";

export const OrdersTable = ({ ordersList }) => {

    const {
        totalPages,
        getOrdersList,
        filterTableByName,
        setFilterTableByName,
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
        const result = searchTableByName(ordersList, search);
        setFilterTableByName(result);
    }, [search]);

    useEffect(() => {
        getOrdersList(page);
    }, [page]);

    return (
        <>
            <SearchInput
                search={search}
                onInputChange={onInputChange}
            />
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterTableByName.map((order) => (
                                <OrdersTableItem
                                    key={order.id}
                                    order={order}
                                />
                            ))
                        }
                    </tbody>
                </table>
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