export const searchTableByName = (list, name) => {
    let results = [];
    if (!name) {
        results = list;
    } else {
        results = list.filter(item => item.product.name.toLowerCase().includes(name.toLowerCase()));
    }
    return results;
};