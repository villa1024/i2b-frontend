import { Link } from 'react-router-dom';

export const ProductCard = ({ product }) => {

    const productImageUrl = `/assets/products/${product.name}.jpg`;

    return (
        <div className="col animate__animated animate__fadeIn">
            <div className="card">
                <div className="row no-gutters">
                    <div className="col-4">
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
                            <Link
                                to={`/products/${product.id}`}
                            >
                                Editar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};