import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import backendApi from "../api/backendApi";
import { EditForm } from "./EditForm";
import { OrderItem } from "../components/OrderItem";
import { ModalNewOrder } from "../components/ModalNewOrder";

export const ViewProductPage = () => {

    // material ui
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [date, setDate] = useState('');
    const handleChange = (event) => {
        setDate(event.target.value);
    };

    const { id } = useParams();
    const [product, setProduct] = useState({});

    const newOrder = async () => {
        try {
            const { data } = await backendApi.post('products/newOrder', {
                product_id: product.id,
                date
            });
            if (data.ok) {
                setDate('');
                handleClose();
                Swal.fire(
                    'Creado!',
                    data.msg,
                    'success'
                );
                getProductById();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteOrder = async (order) => {
        Swal.fire({
            title: order.date.split('-').reverse().join('-'),
            text: "Seguro que desea borrar esta orden? esta acción no puede revertirse...",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await backendApi.delete(`products/deleteOrder/${order.id}`);
                if (data.ok) {
                    setDate('');
                    handleClose();
                    getProductById();
                }
                Swal.fire(
                    'Borrada!',
                    data.msg,
                    'success'
                );
            }
        });
    };

    const getProductById = async () => {
        try {
            const { data } = await backendApi.get(`products/getProductById/${id}`);
            if (!data.ok) {
                console.log("Producto no encontrado...");
            }
            setProduct(data.product);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProductById();
    }, []);

    if (Object.values(product).length === 0) {
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
                        getProductById={getProductById}
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
                            onClick={handleOpen}
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
                            deleteOrder={deleteOrder}
                        />
                    ))
                }
            </div>
            {/* MODAL */}
            <ModalNewOrder
                open={open}
                date={date}
                handleChange={handleChange}
                handleClose={handleClose}
                newOrder={newOrder}
            />
        </>
    );
};