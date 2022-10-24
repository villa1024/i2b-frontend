import { ProductsList } from "../components/ProductsList";
import { useForm } from "../hooks/useForm";
import { useOrders } from "../hooks/useOrders";

export const OrdersPage = () => {

    const { search, onInputChange } = useForm({
        search: ''
    });
    const { orders } = useOrders();

    if (orders.length === 0) {
        return <h5>Cargando ordenes...</h5>
    }

    let results = [];
    if (!search) {
        results = orders;
    } else {
        results = orders.filter(order => order.name.toLowerCase().includes(search.toLowerCase()));
    }

    return (
        <>
            <h1 className="mb-3">Ordenes</h1>
            <div className="btn-toolbar mb-5">
                <div className="input-group">
                    <div className="input-group-text" id="btnGroupAddon">Buscar por nombre</div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Escriba aquí..."
                        name="search"
                        value={search}
                        onChange={onInputChange}
                    />
                </div>
            </div>
            <ProductsList data={results} />
        </>
    );
};