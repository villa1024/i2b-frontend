import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ProductContext } from "../context/ProductContext";
import { EditForm } from "../components/EditForm";
import { ModalNewOrder } from "../components/modal/ModalNewOrder";
import { OrderItem } from "../components/Orders/OrderItem";

export const ViewProductPage = () => {

    const {
        product,
        getProductById,
        handleOpenModal
    } = useContext(ProductContext);

    const { id } = useParams();

    useEffect(() => {
        getProductById(id);
    }, []);

    if (product.id != id) {
        return <h5>Cargando información...</h5>
    }

    return (
        <>
            <div className="row mt-5 mb-5 animate__animated animate__fadeInLeft">
                <div className="col-4 centrar-imagen">
                    <img
                        src={`/assets/products/${(product.name).replace(' ', '-')}.jpg`}
                        alt={product.name}
                        className="img-thumbnail"
                    />
                </div>
                <div className="col-8">
                    <EditForm
                        product={product}
                    />
                </div>
                <div className="btn-toolbar justify-content-between mt-5 mb-2" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group" role="group" aria-label="First group">
                        <h5>Lista de ordenes</h5>
                    </div>
                    <div className="input-group">
                        <button
                            type="button"
                            className="btn btn-primary mx-2"
                            onClick={handleOpenModal}
                        >
                            + Agregar orden
                        </button>
                    </div>
                </div>
                <hr />
                {
                    product.orders.map(order => (
                        <OrderItem
                            key={order.id}
                            order={order}
                        />
                    ))
                }
            </div>
            <ModalNewOrder />
        </>
    );
};