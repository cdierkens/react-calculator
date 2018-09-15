const prefix = ['-']
const postfix = ['%']
const operator = ['+', '-', 'x', '/']
const number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const seperator = ['.']
const singular = ['-', '%', '.']

export const isPrefix = (entry) => prefix.indexOf(entry) > -1 
export const isPostFix = (entry) => postfix.indexOf(entry) > -1 
export const isOperator = (entry) => operator.indexOf(entry) > -1 
export const isNumber = (entry) => number.indexOf(entry) > -1 
export const isSeperator = (entry) => seperator.indexOf(entry) > -1 
export const isSingular = (entry) => singular.indexOf(entry) > -1

const append = (entries, value) => {
    const copy = [...entries]
    return copy[entries.length - 1] = copy[entries.length - 1] + value 
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
        }
    }

    const lastEntry = entries[entries.length - 1].split('').pop()
    
    if (isNumber(lastEntry)) {
        if (isNumber(entry)) {
            return append(entries, entry)
        }

        if (isSeperator(entry) && isSingular(entry) && !contains(lastEntry, entry)) {
            return append(entries, entry)
        }

        if (isPostFix(entry) && !endsWithPostfix(lastEntry)) {
            return append(entries, entry)
        }
    }

    if (isOperator(lastEntry)) {
        if(isNumber(entry) || isPrefix(entry)) {
            return add(entries, entry)
        }
    }

    return entries
}

export default { isPrefix, isPostFix, isOperator, isNumber, isSingular, applyEntry }