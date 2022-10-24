import { useContext } from "react";

import { ProductContext } from "../context/ProductContext";
import { useForm } from "../hooks/useForm";

export const EditForm = ({ product }) => {

    const { updateProductInfo } = useContext(ProductContext);

    const { name, price, description, onInputChange } = useForm({
        name: product.name,
        price: product.price,
        description: product.description,
        date: ''
    });

    return (
        <form>
            <div className="mb-3">
                <label htmlFor="form-edit-name" className="form-label">Nombre</label>
                <input
                    id="form-edit-name"
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={onInputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Precio</label>
                <input
                    id="form-edit-price"
                    type="number"
                    className="form-control"
                    name="price"
                    value={price}
                    onChange={onInputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Descripción</label>
                <textarea
                    id="form-edit-description"
                    className="form-control"
                    rows="3"
                    name="description"
                    value={description}
                    onChange={onInputChange}
                ></textarea>
            </div>
            <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => updateProductInfo(e, name, price, description)}
            >
                Actualizar
            </button>
        </form>
    );
};