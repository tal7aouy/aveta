import { aveta, avetaReverse } from '../src/aveta';

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

describe('avetaReverse', () => {
  test('should correctly reverse basic formatted values', () => {
    expect(avetaReverse('1K')).toBe(1000);
    expect(avetaReverse('1.5M')).toBe(1500000);
    expect(avetaReverse('2.35B')).toBe(2350000000);
  });

  test('should handle lowercase units', () => {
    expect(avetaReverse('3.2k')).toBe(3200);
    expect(avetaReverse('4.7m')).toBe(4700000);
  });

  test('should handle negative values', () => {
    expect(avetaReverse('-5K')).toBe(-5000);
    expect(avetaReverse('(1.2M)')).toBe(-1200000);
  });

  test('should handle custom separators', () => {
    expect(avetaReverse('1,5K', { separator: ',' })).toBe(1500);
    expect(avetaReverse('2.5K', { separator: '.' })).toBe(2500);
  });

  test('should handle custom units', () => {
    const customUnits = ['', 'K', 'M', 'B', 'T'];
    expect(avetaReverse('1.5T', { units: customUnits })).toBe(1500000000000);
  });

  test('should handle values without units', () => {
    expect(avetaReverse('1234')).toBe(1234);
    expect(avetaReverse('-5678')).toBe(-5678);
  });

  test('should throw error for invalid input', () => {
    expect(() => avetaReverse('invalid')).toThrow('Invalid formatted value');
    expect(() => avetaReverse('1X')).toThrow('Unknown unit');
  });

  test('should be approximately reversible with aveta', () => {
    const original = 1234567;
    const formatted = aveta(original, { precision: 3 });
    const reversed = avetaReverse(formatted);
    expect(reversed).toBeCloseTo(original, -3); // Allow for 0.1% error
  });

  test('should handle custom base', () => {
    expect(avetaReverse('1K', { base: 1024 })).toBe(1024);
    expect(avetaReverse('1M', { base: 1024 })).toBe(1048576);
  });
});

describe('aveta rounding modes', () => {
  it('rounds up when specified', () => {
    const map = new Map([
      [1234, '1.2K'], // 1234 -> 1.234K -> 1.2K
      [1567, '1.6K'], // 1567 -> 1.567K -> 1.6K
      [9400, '9.4K'], // 9400 -> 9.4K -> 9.4K
    ]);
    for (const [value, expected] of map) {
      expect(aveta(value, { roundingMode: 'up' })).toEqual(expected);
    }
  });
  it('rounds down when specified', () => {
    const map = new Map([
      [1240, '1.2K'], // 1.240K rounds down to 1.2K
      [1340, '1.3K'], // 1.340K rounds down to 1.3K
      [1440, '1.4K'], // 1.440K rounds down to 1.4K
      [1540, '1.5K'], // 1.540K rounds down to 1.5K
    ]);

    for (const [value, expected] of map) {
      const result = aveta(value, {
        roundingMode: 'down',
        precision: 1,
      });
      expect(result).toEqual(expected);
    }
  });

  it('respects precision with rounding modes', () => {
    expect(aveta(1234, { precision: 2, roundingMode: 'up' })).toEqual('1.23K');
    expect(aveta(1234, { precision: 2, roundingMode: 'down' })).toEqual(
      '1.23K',
    );
    expect(aveta(1234, { precision: 2, roundingMode: 'nearest' })).toEqual(
      '1.23K',
    );
  });
});
