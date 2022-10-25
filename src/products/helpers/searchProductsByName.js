export const searchProductsByName = (list, name) => {
    let results = [];
    if (!name) {
        results = list;
    } else {
        results = list.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
    }
    return results;
};