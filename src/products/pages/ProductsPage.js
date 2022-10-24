import { ProductsList } from "../components/ProductsList";
import { useForm } from "../hooks/useForm";
import { useProducts } from "../hooks/useProducts";

export const ProductsPage = () => {

    const { search, onInputChange } = useForm({
        search: ''
    });

    const { products } = useProducts();

    if (products.length === 0) {
        return <h5>Cargando productos...</h5>
    }

    let results = [];
    if (!search) {
        results = products;
    } else {
        results = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
    }

    return (
        <>
            <h1 className="mb-3">Lista de productos</h1>
            <div className="btn-toolbar mb-5">
                <div className="input-group">
                    <div className="input-group-text" id="btnGroupAddon">Buscar por nombre</div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Escriba aquí..."
                        name="search"
                        value={search}
                        onChange={onInputChange}
                    />
                </div>
            </div>
            <ProductsList data={results} />
        </>
    );
};