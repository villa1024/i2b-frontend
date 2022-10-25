import { Link } from 'react-router-dom';

import { OrdersList } from '../Orders/OrdersList';

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
                                        <OrdersList
                                            product={product}
                                        />
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