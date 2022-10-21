import { useNavigate, useParams } from "react-router-dom";

import backendApi from "../api/backendApi";
import { useForm } from "../hooks/useForm";
import { useProductById } from "../hooks/useProductById";
import { EditForm } from "./EditForm";

export const ViewProductPage = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const { product } = useProductById(id);

    const { date, setFormState, onInputChange } = useForm({
        date: ''
    });

    const newOrder = async () => {
        try {
            const { data } = await backendApi.post('products/newOrder', {
                product_id: product.id,
                date
            });
            if (data.ok) {
                setFormState('');
                navigate(`products/${product.id}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (Object.values(product).length === 0) {
        return <h5>Cargando información...</h5>
    }

    return (
        <>
            <div className="row mt-5 animate__animated animate__fadeInLeft">
                <div className="col-4">
                    <img
                        src={`/assets/products/${(product.name).replace(' ', '-')}.jpg`}
                        alt={product.name}
                        className="img-thumbnail"
                    />
                </div>
                <div className="col-8">
                    <EditForm product={product} />
                </div>
                {
                    (product.orders?.length > 0)
                        ? (
                            <>
                                <div className="btn-toolbar justify-content-between mt-5 mb-2" role="toolbar" aria-label="Toolbar with button groups">
                                    <div className="btn-group" role="group" aria-label="First group">
                                        <h5>Lista de ordenes</h5>
                                    </div>
                                    <div className="input-group">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Agregar orden
                                        </button>
                                    </div>
                                </div>
                                <ul className="list-group mb-5">
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
                            </>
                        )
                        : (
                            null
                        )
                }
            </div>
            {/* MODAL */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Agregar Orden</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Fecha</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        name="date"
                                        value={date}
                                        onChange={onInputChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={newOrder}
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};