import { useForm } from "../hooks/useForm";
import backendApi from "../api/backendApi";
import { useNavigate } from "react-router-dom";

export const EditForm = ({ product }) => {

    const navigate = useNavigate();

    const { name, price, description, onInputChange } = useForm({
        name: product.name,
        price: product.price,
        description: product.description,
        date: ''
    });

    const updateProductInfo = async () => {
        try {
            const { data } = await backendApi.put(`products/editProduct/${product.id}`, {
                name,
                price,
                description
            });
            if (data.ok) {
                navigate(`products/${product.id}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                onClick={updateProductInfo}
            >
                Actualizar
            </button>
        </form>
    );
};