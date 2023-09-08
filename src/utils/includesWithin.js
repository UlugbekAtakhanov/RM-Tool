export const includesWithin = (arr1, arr2) => {
    let condition = false;
    arr1.forEach((element) => {
        if (arr2.includes(element)) {
            condition = true;
        }
    });
    return condition;
};
