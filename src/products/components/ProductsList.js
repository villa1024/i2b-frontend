import { useMemo } from "react";
import { getProducts } from "../helpers/getProducts";
import { ProductCard } from "./ProductCard";

export const ProductsList = ({ publisher }) => {

    const products = useMemo(() => getProducts(publisher), [publisher]);

    return (
        <div className="row rows-cols-1 row-cols-md-3 g-3">
            {
                products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))
            }
        </div>
    );
};