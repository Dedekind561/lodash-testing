const forEach = (arr, iteratee = x => x) => {

    for (let i = 0; i < arr.length; i++) {
        iteratee(arr[i], i, arr);
    }
    return arr;
};


const limit = (func, limit = 1) => {
    function limitedFunc(...args) {
        limit--;
        if (limit >= 0) return func(...args);
    };
    return limitedFunc;
};




module.exports = { forEach, limit };