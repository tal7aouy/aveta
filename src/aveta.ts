import { IOptions, Options } from './options';

const DIGIT_BASE = 1000;

/**
 * Generator that divides a number until a decimal value is found.
 *
 * e.g. 1,000,000 is grouped in multiples of 1000.
 */
function* generator(value: number): IterableIterator<number> {
  // Create a mutable copy of the base.
  let divisor = DIGIT_BASE;

  while (true) {
    const result = value / divisor;
    if (result < 1) {
      //  We can't divide the value any further.
      return;
    }

    yield result;

    divisor *= DIGIT_BASE;
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
 */
function roundTo(
  value: number,
  { precision, digits }: { precision: number; digits: number },
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
  // check if digits is great than 0
  return digits > 0
    ? parseFloat(value.toPrecision(digits))
    : parseFloat(value.toFixed(precision));
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

  // Add a minus sign (-) prefix if it's a negative number.
  const prefix = val < 0 ? '-' : '';

  // Work only with positive values for simplicity's sake.
  val = Math.abs(val);

  // Keep dividing the input value by the digit grouping base
  // until the decimal and the unit index is deciphered.
  let unitIndex = 0;
  for (const result of generator(val)) {
    val = result;
    unitIndex += 1;
  }

  // Return the original number if the number is too large to have
  // a corresponding unit. Returning anything else is ambiguous.
  const unitIndexOutOfRange = unitIndex >= opts.units.length;
  if (unitIndexOutOfRange) {
    return value.toString();
  }

  // Round decimal up to desired precision.
  let rounded = roundTo(val, opts);

  // The rounded value needs another iteration in the generator(divider) cycle.
  for (const result of generator(rounded)) {
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

  return `${prefix}${formatted}${space}${suffix}`;
}

export { aveta };

export default aveta;
