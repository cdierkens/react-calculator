import entry from './entry';

describe('applyEntry', () => {
    it('returns entries when called with empty entries and empty string', () => {
        expect(entry.applyEntry([], '')).toEqual([])
    })

    it('appends when called with empty entries and a number', () => {
        expect(entry.applyEntry([], '1')).toEqual(['1'])
    })

    it('appends when called with empty entries and a prefix', () => {
        expect(entry.applyEntry([], '-')).toEqual(['-'])
    })

    it('does not append when called with an operator entry and an operator that is not a prefix', () => {
        expect(entry.applyEntry(['-'], '+')).toEqual(['-'])
        expect(entry.applyEntry(['-'], '*')).toEqual(['-'])
        expect(entry.applyEntry(['-'], '/')).toEqual(['-'])
    })

    it('appends when called with an operator entry and a prefix', () => {
        expect(entry.applyEntry(['-'], '-')).toEqual(['-', '-'])
        expect(entry.applyEntry(['+'], '-')).toEqual(['+', '-'])
        expect(entry.applyEntry(['*'], '-')).toEqual(['*', '-'])
        expect(entry.applyEntry(['/'], '-')).toEqual(['/', '-'])
    })

    it('does not append when called with an operator entry followed by a prefix entry and a prefix', () => {
        expect(entry.applyEntry(['-', '-'], '-')).toEqual(['-', '-'])
        expect(entry.applyEntry(['+', '-'], '-')).toEqual(['+', '-'])
        expect(entry.applyEntry(['*', '-'], '-')).toEqual(['*', '-'])
        expect(entry.applyEntry(['/', '-'], '-')).toEqual(['/', '-'])
    })

    it('appends to the same entry when called with a number as the last entry and a number', () => {
        expect(entry.applyEntry(['1'], '2')).toEqual(['12'])
    })

    it('appends to the same entry when called with a number as the last entry and a number', () => {
        expect(entry.applyEntry(['123'], '4')).toEqual(['1234'])
    })

    it('appends to the same entry when called with a number as the last entry and a seperator', () => {
        expect(entry.applyEntry(['1'], '.')).toEqual(['1.'])
    })

    it('does not append to the same entry when called with a seperator in the last entry and a seperator', () => {
        expect(entry.applyEntry(['1.'], '.')).toEqual(['1.'])
    })

    it('append to the same entry when called with a seperator in the last entry and a number', () => {
        expect(entry.applyEntry(['1.'], '2')).toEqual(['1.2'])
    })

    it('does not append to the same entry when called with a seperator in the last entry and a seperator', () => {
        expect(entry.applyEntry(['1.2'], '.')).toEqual(['1.2'])
    })

    it('adds a new entry when called with an operator that is not a prefix in the last entry and a number', () => {
        expect(entry.applyEntry(['+'], '1')).toEqual(['+', '1'])
        expect(entry.applyEntry(['*'], '1')).toEqual(['*', '1'])
        expect(entry.applyEntry(['/'], '1')).toEqual(['/', '1'])
    })

    it('appends to the same entry when called with an operator that is also a prefix in the last entry and a number', () => {
        expect(entry.applyEntry(['-'], '1')).toEqual(['-1'])
    })

    it('appends to the same entry when called with an operator followed by a prefix in the last entry and a number', () => {
        expect(entry.applyEntry(['+', '-'], '1')).toEqual(['+', '-1'])
    })

    it('adds a new entry when called with previous entries an operator that is also a prefix in the last entry and a number', () => {
        expect(entry.applyEntry(['-6', '-'], '1')).toEqual(['-6', '-', '1'])
    })

    it('adds a new entry when called with an number in the last entry and an operator', () => {
        expect(entry.applyEntry(['1'], '+')).toEqual(['1', '+'])
        expect(entry.applyEntry(['1'], '-')).toEqual(['1', '-'])
        expect(entry.applyEntry(['1'], '*')).toEqual(['1', '*'])
        expect(entry.applyEntry(['1'], '/')).toEqual(['1', '/'])
    })

    it('adds a new entry when called with a postfix in the last entry and an operator', () => {
        expect(entry.applyEntry(['%'], '+')).toEqual(['%', '+'])
    })
})

describe('clearEntry', () => {
    it('return empty entries when called with empty entries', () => {
        expect(entry.clearEntry([])).toEqual([])
    })

    it('return empty entries when called with a single value entry', () => {
        expect(entry.clearEntry(['1'])).toEqual([])
    })

    it('return one less entry when called with multiple entries', () => {
        expect(entry.clearEntry(['1', '2'])).toEqual(['1'])
    })

    it('return one less character when called with multiple character entries', () => {
        expect(entry.clearEntry(['12'])).toEqual(['1'])
        expect(entry.clearEntry(['1', '23'])).toEqual(['1', '2'])
        expect(entry.clearEntry(['1', '+', '2'])).toEqual(['1', '+'])
    })
});

describe('calculate', () => {
    it('returns the result of a simple calculation', () => {
        expect(entry.calculate(['1', '+', '2'])).toBe(3)
    })

    it('returns the result of a simple calculation with floating point numbers', () => {
        expect(entry.calculate(['1.2', '+', '2.3'])).toBe(3.5)
    })

    it('returns the result of a complex calculation', () => {
        expect(entry.calculate(['9', '+', '3', '*', '3', '/', '3', '+', '3.3'])).toBe(15.3)
    })

    it('returns the result of calculation that contains negative numbers', () => {
        expect(entry.calculate(['9', '*', '-3'])).toBe(-27)
        expect(entry.calculate(['9', '+', '-3', '*', '3', '/', '3', '+', '3.3'])).toBe(9.3)
    })
});
