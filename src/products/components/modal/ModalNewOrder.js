import { useContext, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { ProductContext } from '../../context/ProductContext';

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

export const ModalNewOrder = () => {

    const {
        openModal,
        handleCloseModal,
        newOrder
    } = useContext(ProductContext);

    const [date, setDate] = useState('');
    const handleChange = (event) => {
        setDate(event.target.value);
    };

    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
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
                    onClick={handleCloseModal}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    className="mt-3"
                    onClick={() => newOrder(date)}
                >
                    Guardar
                </Button>
            </Box>
        </Modal>
    );
};