import { Link } from 'react-router-dom';

export const ProductCard = ({ product }) => {

    const productImageUrl = `/assets/products/${(product.name).replace(' ', '-')}.jpg`;

    return (
        <div className="col animate__animated animate__fadeIn">
            <div className="card">
                <div className="row no-gutters">
                    <div className="col-4 centrar-imagen">
                        <img
                            src={productImageUrl}
                            className="card-img"
                            alt={product.name}
                        />
                    </div>
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">${product.price}</p>
                            <p className="card-text">{product.description}</p>
                            {
                                (product.orders?.length > 0)
                                    ? (
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
                                    )
                                    : (
                                        null
                                    )
                            }
                            <Link
                                to={`/products/${product.id}`}
                            >
                                <button
                                    className="btn btn-outline-primary mt-3"
                                >
                                    Editar
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};