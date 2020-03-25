//For Jest to get the target vanilla JS functions
const { productTestFunction, arrayTestFunction } = require('../src/components/GoogleSignIn/exFunctions.js'); 

//Ref for matchers e.g toBe, toContain: https://jestjs.io/docs/en/using-matchers
test('product of 2*3 equals 6', () => {
    expect(productTestFunction(2, 3)).toBe(6);
});
test('arrayTest1', () => {
    const parameters = ["123", "tester", "https://image", "test@gmail.com"]
    //Use more than 1 assetion (i.e. expect()) to hit the target from >1 angle
    //It'll ensure it really is solid
    expect(arrayTestFunction(parameters)).toContain(
        "0: 123"
    );
    expect(arrayTestFunction(parameters)).toEqual(
        [ '0: 123', '1: tester', '2: https://image', '3: test@gmail.com' ]
    );
});


