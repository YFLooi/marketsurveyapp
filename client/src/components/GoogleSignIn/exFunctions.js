//For testing Jest
function productTestFunction(a, b){
    return a*b
}
function arrayTestFunction(a){
    let testArray = new Array(a.length)

    testArray = a.map(function (currVal, index) {
        return `${index}: ${currVal}`;
    })
    console.log(testArray) //Outputs to Jest test console
    return testArray
}

//Jest can only accept module.exports
module.exports = { 
    productTestFunction, 
    arrayTestFunction 
}