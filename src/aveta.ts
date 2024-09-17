import { IOptions, Options } from './options';

/**
 * Generator that divides a number until a decimal value is found.
 * Allows custom base.
 */
function* generator(value: number, base: number): IterableIterator<number> {
  // Create a mutable copy of the base.
  let divisor = base;

  while (true) {
    const result = value / divisor;
    if (result < 1) {
      //  We can't divide the value any further.
      return;
    }

    yield result;

    divisor *= base; // Use the dynamic base
  }
}

/**
 * parseValue ensures the value is a number and within accepted range.
 */
function parseValue(value: number): number {
  const val: number = parseFloat(value.toString());

  if (isNaN(val)) {
    throw new Error(`Input value is not a number`);
  }
  if (val > Number.MAX_SAFE_INTEGER || val < Number.MIN_SAFE_INTEGER) {
    throw new RangeError('Input value is outside of safe integer range');
  }
  return val;
}

/**
 * Rounds a number [value] up to a specified [precision].
 * Adds support for roundingMode: 'up', 'down', 'nearest'.
 */
function roundTo(
  value: number,
  { precision, digits, roundingMode }: { precision: number; digits: number; roundingMode: 'up' | 'down' | 'nearest' },
): number {
  if (!Number.isFinite(value)) {
    throw new Error('Input value is not an infinite number');
  }
  if (!Number.isInteger(precision) || precision < 0) {
    throw new Error('Precision is not a positive integer');
  }
  if (!Number.isInteger(digits) || digits < 0) {
    throw new Error('Digits is not a positive integer');
  }
  if (Number.isInteger(value)) {
    return value;
  }

  let factor = Math.pow(10, precision);
  if (roundingMode === 'up') {
    return Math.ceil(value * factor) / factor;
  } else if (roundingMode === 'down') {
    return Math.floor(value * factor) / factor;
  } else {
    return Math.round(value * factor) / factor;
  }
}

/**
 * aveta converts long numbers to human-readable strings in an easy way.
 */
function aveta(value: number, options?: Partial<IOptions>): string {
  // Override default options with options supplied by user.
  const opts: IOptions = options ? { ...Options, ...options } : Options;

  if (!Array.isArray(opts.units) || !opts.units.length) {
    throw new Error('Option `units` must be a non-empty array');
  }

  // Validate value for type and length.
  let val = parseValue(value);

  // Handle values below the threshold, just return the original value
  if (Math.abs(val) < opts.threshold) {
    return val.toString();
  }

  // Add a minus sign (-) or parentheses if it's a negative number.
  let prefix = '';
  if (val < 0) {
    prefix = opts.negativeFormat === 'parentheses' ? '(' : '-';
  }

  // Work only with positive values for simplicity's sake.
  val = Math.abs(val);

  // Keep dividing the input value by the dynamic base
  // until the decimal and the unit index is deciphered.
  let unitIndex = 0;
  for (const result of generator(val, opts.base || 1000)) {
    val = result;
    unitIndex += 1;
  }

  // Return the original number if the number is too large to have
  // a corresponding unit. Returning anything else is ambiguous.
  const unitIndexOutOfRange = unitIndex >= opts.units.length;
  if (unitIndexOutOfRange) {
    return value.toString();
  }

  // Round decimal up to desired precision using the chosen rounding mode.
  let rounded = roundTo(val, { precision: opts.precision, digits: opts.digits, roundingMode: opts.roundingMode || 'nearest' });

  // Scientific notation if needed
  if (opts.scientificNotation && (val >= 1e6 || val < 1e-3)) {
    return `${prefix}${val.toExponential(opts.precision)}`;
  }

  // The rounded value might need another iteration in the generator(divider) cycle.
  for (const result of generator(rounded, opts.base || 1000)) {
    rounded = result;
    unitIndex += 1;
  }

  // Calculate the unit suffix and make it lowercase (if needed).
  const unit = opts.units[unitIndex] ?? '';
  const suffix = opts.lowercase ? unit.toLowerCase() : unit;

  // Add a space between number and abbreviation.
  const space = opts.space ? ' ' : '';

  // Replace decimal mark if desired.
  const formatted = rounded
    .toString()
    .replace(Options.separator, opts.separator);

  // Handle negative format (parentheses)
  const finalOutput = `${prefix}${formatted}${space}${suffix}`;
  return opts.negativeFormat === 'parentheses' && prefix === '('
    ? `${finalOutput})`
    : finalOutput;
}

export { aveta };

export default aveta;
