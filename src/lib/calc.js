// - Add
// - Subtract
// - Multiply
// - Divide
// - Percentages
// - Square roots
// - Backspace
// - Clear/reset 

export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;
export const divide = (a, b) => a / b;
export const percent = (a) => a / 100;
export const sqrt = (n, g) => {
    g = g === void 0 ? n / 2.0 : g;  
    
    var d = n / g;
    var ng = (d + g) / 2.0;
    if (g === ng) {
        return g;
    }
    
    return sqrt(n, ng);
}

export default { add, subtract, multiply, divide, percent, sqrt }