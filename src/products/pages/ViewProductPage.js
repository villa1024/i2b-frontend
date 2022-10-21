import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { getProductById } from "../helpers/getProductById";

export const ViewProductPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const product = useMemo(() => getProductById(id), [id]);

    const onNavigateBack = () => {
        navigate(-1);
    };

    if (!product) {
        return <Navigate to={'/products/getAll'} />
    }

    return (
        <div className="row mt-5 animate__animated animate__fadeInLeft">
            <div className="col-4">
                <img
                    src={`/assets/products/${product.id}.jpg`}
                    alt={product.superhero}
                    className="img-thumbnail"
                />
            </div>
            <div className="col-8">
                <h3>{product.superhero}</h3>
                <ul className="list-group list-group flush">
                    <li className="list-group-item">
                        <b>Aler ego:</b> {product.alter_ego}
                    </li>
                    <li className="list-group-item">
                        <b>Publisher:</b> {product.publisher}
                    </li>
                </ul>
                <button
                    className="btn btn-outline-primary mt-3"
                    onClick={onNavigateBack}
                >
                    Volver
                </button>
            </div>
        </div>
    );
};