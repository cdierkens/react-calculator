import calc from './calc';

const prefix = ['-', '√']
const postfix = ['%']

const operator = ['*', '/', '+', '-']
const number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const seperator = ['.']
const singular = ['-', '%', '.']

const fns = {
    '*': calc.multiply,
    '/': calc.divide,
    '+': calc.add,
    '-': calc.subtract
}

const isPrefix = (entry) => prefix.indexOf(entry) > -1 
const isPostFix = (entry) => postfix.indexOf(entry) > -1 
const isOperator = (entry) => operator.indexOf(entry) > -1 
const isNumber = (entry) => number.indexOf(entry) > -1 
const isSeperator = (entry) => seperator.indexOf(entry) > -1 
const isSingular = (entry) => singular.indexOf(entry) > -1

const append = (entries, value) => {
    const copy = [...entries]
    copy[entries.length - 1] = copy[entries.length - 1] + value
    return copy 
}

const add = (entries, value) => {
    const copy = [...entries]
    copy.push(value)
    return copy 
}

const contains = (entry, value) => {
    return entry.split('').indexOf(value) > -1
}

const endsWithPostfix = (entry) => {
    return isPrefix(entry.split('').pop())
}

const getValue = (char) => {
    if (typeof char === "number") {
        return char
    }
    
    // TODO: We should santize all prefixes and postfixes.
    let value = parseFloat(char.replace('√', ''))
    
    // Do percentages before square roots
    if (char[char.length - 1] === '%') {
        value = value * 0.01
    }

    if (char[0] === '√') {
        value = calc.sqrt(value)
    }

    return value
}

export const applyEntry = (entries, entry) => {
    if (entries.length === 0) {
        if(isNumber(entry) || isPrefix(entry)) {
            return add(entries, entry)
        } else {
            return entries
        }
    }

    const lastEntry = entries[entries.length - 1]
    const lastChar = lastEntry.split('').pop()
    
    if (isNumber(lastChar)) {
        // Number followed by number (1 and 2 become 12). 
        if (isNumber(entry)) {
            return append(entries, entry)
        }

        // Number followed seperator (1 and . become 1.2).
        if (isSeperator(entry) && isSingular(entry) && !contains(lastEntry, entry)) {
            return append(entries, entry)
        }

        // Number followed postfix (1 and % become 1%).
        if (isPostFix(entry) && !endsWithPostfix(lastChar)) {
            return append(entries, entry)
        }

        // Number followed operator (1 and + become 1 +). 
        if (isOperator(entry)) {
            return add(entries, entry)
        }
    }

    // Seperator followed number (1. and 1 become 1.1). 
    if (isSeperator(lastChar) && isNumber(entry)) {
        return append(entries, entry)
    }

    if (isOperator(lastChar)) {
        if (isPrefix(lastChar) && isNumber(entry)) {
            // Operator followed by a number (- and 1 become -1)
            if (entries.length === 1) {
                return append(entries, entry)
            }

            const previousEntry = entries[entries.length - 2]

            // Operator followed by a number (+, - and 1 become + -1)
            if (isOperator(previousEntry)) {
                return append(entries, entry)
            }
        }

        // Operator followed by a number (+ and 1 become + 1)
        if (isNumber(entry)) {
            return add(entries, entry)
        }

        if (isPrefix(entry)) {
            const previousEntry = entries[entries.length - 2]

            // Operator followed by a prefix (+ and - become + -)
            if (!isOperator(previousEntry)) {
                return add(entries, entry)
            }
        }
    }
    
    // Prefix followed by a number (√ and 2 become 2)
    if (isPrefix(lastChar) && isNumber(entry)) {
        return append(entries, entry)
    }

    // Postfix followed by a number (% and 2 become %2)
    if (isPostFix(lastChar) && isOperator(entry)) {
        return add(entries, entry)
    }

    return entries
}

export const clearEntry = (entries) => {
    if (entries.length === 0) {
        return entries
    }

    const copy = [...entries]
    const lastEntry = entries[copy.length - 1].split('')

    lastEntry.pop();

    if (lastEntry.length === 0) {
        copy.pop()
    } else {
        copy[copy.length - 1] = lastEntry.join('')
    }
    return copy
}

export const calculate = (entries) => {
    if (entries.length % 2 === 0) {
        return;
    }

    if (entries.length === 1) {
        return getValue(entries[0])
    }

    let copy = [...entries];

    operator.forEach(op => {
        let i = copy.indexOf(op)
        while (i !== -1) {
            // Do the calculation for this operator (['1', '+', '2'] = [3]).
            let a = getValue(copy[i - 1])
            let b = getValue(copy[i + 1])
            let result =  fns[op](a, b)
            
            // Replace three entries with as one result entry.
            copy.splice(i - 1, 3, result)
            
            i = copy.indexOf(op)
        }
    })

    return copy[0];
}

export const getKey = (event) => {
    const [multiply, divide, add, subtract ] = ['*', '/', '+', '-']

    switch(event.which) {
        // Add
        case 187:
            return event.shiftKey ? add : event.key 
        case 107:
            return add
        // Subtract
        case 189:
        case 109:
            return subtract
        // Divide
        case 111:
        case 220:
            return divide
        // Multiply
        case 56:
        case 42:
            return event.shiftKey ? multiply : event.key 
        case 88:
        case 106:
            return multiply
        // Period
        case 190:
            return '.'
        default:
            return event.key
    }
}

export default { applyEntry, clearEntry, calculate, getKey }