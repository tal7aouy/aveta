import aveta from '../src/aveta';

describe('aveta test', () => {
  it('returns a string', () => {
    expect(typeof aveta(100)).toBe('string');
  });
  it('uses correct suffixes with default options', () => {
    const map = new Map([
      [100, '100'],
      [1000, '1K'],
      [1000000, '1M'],
    ]);
    for (const [value, expected] of map) {
      expect(aveta(value)).toEqual(expected);
    }
  });
  it('rounds up to the nearset', () => {
    const map = new Map([
      [999999, '1M'], // Not 1000K
      [999999999, '1B'], // Not 1000M
      [999999999999, '1T'], // Not 1000B
      [999000000000, '999B'],
    ]);
    for (const [value, expected] of map) {
      expect(aveta(value)).toEqual(expected);
    }
  });

  it('handles negative numbers like positive ones', () => {
    const map = new Map([
      [-100, '-100'],
      [-1000, '-1K'],
      [-1000000, '-1M'],
      [-1000000000, '-1B'],
      [-1000000000000, '-1T'],
    ]);

    for (const [value, expected] of map.entries()) {
      expect(aveta(value)).toEqual(expected);
    }
  });

  it('uses lowercase suffixes', () => {
    const map = new Map([
      [1000, '1k'],
      [1000000, '1m'],
      [1000000000, '1b'],
      [1000000000000, '1t'],
    ]);

    for (const [value, expected] of map.entries()) {
      expect(aveta(value, { lowercase: true })).toEqual(expected);
    }
  });
  it('precision adjusts according to options', () => {
    const value = 12345.6789;
    const arr = [
      '12K',
      '12.3K',
      '12.35K',
      '12.346K',
      '12.3457K',
      '12.34568K',
      '12.345679K',
      '12.3456789K',
    ];

    arr.forEach((exp, precision) =>
      expect(aveta(value, { precision })).toEqual(exp),
    );
  });

  it('allows a custom decimal separator', () => {
    expect('55,5K').toBe(aveta(55500, { separator: ',' }));
  });
  it('allows a space between decimal and unit', () => {
    expect('55.5 K').toBe(aveta(55500, { space: true }));
  });

  it('allows custom units', () => {
    const tests = new Map([
      [Math.pow(10, 0), '1 m'],
      [Math.pow(10, 3), '1 km'],
      [Math.pow(10, 6), '1 Mm'],
      [Math.pow(10, 9), '1 Mm'],
    ]);

    for (const [value, expected] of tests.entries()) {
      expect(
        aveta(value, { units: ['m', 'km', 'Mm', 'Mm'], space: true }),
      ).toBe(expected);
    }
  });
  it('throws error if value is invalid', () => {
    expect(() => aveta(Number.MAX_SAFE_INTEGER + 1)).toThrow();
    expect(() => aveta(Number.MIN_SAFE_INTEGER - 1)).toThrow();
    //expect(()=>aveta()).toThrowError()
    // should set strict to false in 'tsconfig.json' to run the test bellow
    //expect(()=>aveta(null)).toThrowError()
  });
  it('throws error if precision is invalid', () => {
    expect(() => aveta(10000, { precision: Infinity })).toThrow();
    expect(() => aveta(10000, { precision: Math.PI })).toThrow();
  });
  it('throws error if units is invalid', () => {
    expect(() => aveta(10000, { units: [] })).toThrow();
    // throw error
    // expect(()=>aveta(10000, { units: {} })).toThrow()
  });
});
