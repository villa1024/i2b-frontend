import { ProductsList } from "../components/ProductsList";
import { useProducts } from "../hooks/useProducts";

export const ProductsPage = () => {

    const { products } = useProducts();

    if (products.length === 0) {
        return <h5>Cargando productos...</h5>
    }

    return (
        <>
            <h1>Lista de productos</h1>
            <hr />
            <ProductsList data={products} />
        </>
    );
};