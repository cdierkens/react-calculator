import calc from './calc';

const prefix = ['-']
const postfix = ['%']

const operator = ['x', '/', '+', '-']
const number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const seperator = ['.']
const singular = ['-', '%', '.']

const fns = {
    'x': calc.multiply,
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
        if (isNumber(entry)) {
            return append(entries, entry)
        }

        if (isSeperator(entry) && isSingular(entry) && !contains(lastEntry, entry)) {
            return append(entries, entry)
        }

        if (isPostFix(entry) && !endsWithPostfix(lastChar)) {
            return append(entries, entry)
        }

        if (isOperator(entry)) {
            return add(entries, entry)
        }
    }

    if (isSeperator(lastChar)) {
        if (isNumber(entry)) {
            return append(entries, entry)
        }
    }

    if (isOperator(lastChar)) {
        if (isPrefix(lastChar) && isNumber(entry)) {
            if (entries.length === 1) {
                return append(entries, entry)
            }

            const previousEntry = entries[entries.length - 2]

            if (isOperator(previousEntry)) {
                return append(entries, entry)
            }
        }

        if (isNumber(entry)) {
            return add(entries, entry)
        }

        if (isPrefix(entry)) {
            const previousEntry = entries[entries.length - 2]

            if (!isOperator(previousEntry)) {
                return add(entries, entry)
            }
        }
    }

    if (isPostFix(lastChar)) {
        if (isOperator(entry)) {
            return add(entries, entry)
        }
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
    if (entries.length % 3 === 1) {
        return;
    }

    let copy = [...entries];

    operator.forEach(op => {
        let i = copy.indexOf(op)
        while (i !== -1) {
            let a = parseFloat(copy[i - 1])
            let b = parseFloat(copy[i + 1])
            let result =  fns[op](a, b)
            copy.splice(i - 1, 3, result)
            i = copy.indexOf(op)
        }
    })

    return copy[0];
}

export const getKey = (event) => {
    const [multiply, divide, add, subtract ] = ['x', '/', '+', '-']

    switch(event.which) {
        case 187:
            return event.shiftKey ? add : event.key 
        case 107:
            return add
        case 189:
        case 109:
            return subtract
        case 111:
        case 220:
            return divide
        case 56:
        case 42:
            return event.shiftKey ? multiply : event.key 
        case 88:
        case 106:
            return multiply
        case 190:
            return '.'
        default:
            return event.key
    }
}

export default { applyEntry, clearEntry, calculate, getKey }