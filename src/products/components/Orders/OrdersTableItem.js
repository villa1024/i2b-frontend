import { Link } from "react-router-dom";

export const OrdersTableItem = ({ order }) => {
    return (
        <tr key={order.id}>
            <td>{order.date.split('-').reverse().join('-')}</td>
            <td>{order.product.name}</td>
            <td>
                <Link
                    to={`/products/${order.product.id}`}
                >
                    <button
                        className="btn btn-outline-primary"
                    >
                        Editar
                    </button>
                </Link>
            </td>
        </tr>
    );
};