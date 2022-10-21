import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import backendApi from "../api/backendApi";
import { useProductById } from "../hooks/useProductById";
import { EditForm } from "./EditForm";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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
                getProductById();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteOrder = async (order_id) => {
        try {
            const { data } = await backendApi.delete(`products/deleteOrder/${order_id}`);
            if (data.ok) {
                setDate('');
                handleClose();
                getProductById();
            }
        } catch (error) {
            console.log(error);
        }
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
                <div className="col-4">
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
                        <div className="card mb-3" style={{ width: '20rem' }} key={order.id}>
                            <div className="card-body">
                                <h5 className="card-title text-center">{order.date.split('-').reverse().join('-')}</h5>
                                <div className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-primary mx-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => deleteOrder(order.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* MODAL */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Fecha</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={date}
                            label="date"
                            onChange={handleChange}
                        >
                            <MenuItem value={'2022-11-01'}>01-11-2022</MenuItem>
                            <MenuItem value={'2022-11-05'}>05-11-2022</MenuItem>
                            <MenuItem value={'2022-11-10'}>10-11-2022</MenuItem>
                            <MenuItem value={'2022-11-15'}>15-11-2022</MenuItem>
                            <MenuItem value={'2022-11-20'}>20-11-2022</MenuItem>
                            <MenuItem value={'2022-11-25'}>25-11-2022</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="outlined"
                        className="mt-3 mx-2"
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        className="mt-3"
                        onClick={newOrder}
                    >
                        Guardar
                    </Button>
                </Box>
            </Modal>
        </>
    );
};