export const OrderItem = ({ order, deleteOrder }) => {
    return (
        <div className="card mb-3 mx-2" style={{ width: '15rem' }} key={order.id}>
            <div className="card-body">
                <h5 className="card-title text-center">{order.date.split('-').reverse().join('-')}</h5>
                <div className="text-center">
                    <button
                        type="button"
                        className="btn btn-primary mx-2"
                    >
                        Editar
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteOrder(order)}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};