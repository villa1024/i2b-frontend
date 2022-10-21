import backendApi from "../api/backendApi";

export const newOrder = async (product_id, date) => {
    try {
        const { data } = await backendApi.post('products/newOrder', {
            product_id,
            date
        });
        if (!data.ok) {
            console.log("Error cargando las ordenes...");
        }
    } catch (error) {
        console.log(error);
    }
};