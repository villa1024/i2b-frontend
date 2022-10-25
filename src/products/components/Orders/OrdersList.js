export const OrdersList = ({ product }) => {
    return (
        <>
            <p>
                <a className="btn btn-primary" data-bs-toggle="collapse" href={`#${(product.name).replace(' ', '-')}`} role="button" aria-expanded="false" aria-controls="collapseExample">
                    Ver fechas
                </a>
            </p>
            <div className="collapse" id={`${(product.name).replace(' ', '-')}`}>
                <div className="card card-body">
                    <ul className="list-group">
                        {
                            product.orders.map(order => (
                                <li
                                    className="list-group-item text-center"
                                    key={order.id}
                                >
                                    {order.date.split('-').reverse().join('-')}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    );
};