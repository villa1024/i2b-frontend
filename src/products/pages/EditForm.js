import Swal from "sweetalert2";

import { useForm } from "../hooks/useForm";
import backendApi from "../api/backendApi";

export const EditForm = ({ product, getProductById }) => {

    const { name, price, description, onInputChange } = useForm({
        name: product.name,
        price: product.price,
        description: product.description,
        date: ''
    });

    const updateProductInfo = async (e) => {
        e.preventDefault();
        try {
            if (name === product.name && parseInt(price) === parseInt(product.price) && description === product.description) {
                return Swal.fire(
                    'Error!',
                    'Debe cambiar algun valor para actualizar producto',
                    'error'
                );
            }
            const { data } = await backendApi.put(`products/editProduct`, {
                id: product.id,
                name,
                price,
                description
            });
            if (data.ok) {
                getProductById();
                Swal.fire(
                    'Actualizado!',
                    data.msg,
                    'success'
                );
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