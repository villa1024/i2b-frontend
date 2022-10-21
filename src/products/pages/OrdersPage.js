import { ProductsList } from "../components/ProductsList";
import { useOrders } from "../hooks/useOrders";

export const OrdersPage = () => {

    const { orders } = useOrders();

    if (orders.length === 0) {
        return <h5>Cargando ordenes...</h5>
    }

    return (
        <>
            <h1>Ordenes</h1>
            <hr />
            <ProductsList data={orders} />
        </>
    );
};