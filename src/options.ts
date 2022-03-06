/**
 * IOptions used to configure Aveta.
 *
 * precision: number;
 *
 * digits: number;
 *
 * separator: string;
 *
 * lowercase: boolean;
 *
 * space: boolean;
 *
 * units: string[];
 */
export interface IOptions {
  /**
   * Number of significant digits.
   */
  precision: number;
  /**
   * maximum number of significant digits
   */
  digits: number;
  /**
   * The type of decimal marker (e.g. period ".").
   */
  separator: string;
  /**
   * Convert units to lowercase.
   */
  lowercase: boolean;
  /**
   * Add a space between the number and the unit (e.g : 55.5 K).
   */
  space: boolean;
  /**
   * A list of units to use (e.g : ["K", "M", "B", "T", "P", "E"]).
   */
  units: string[];
}

/**
 * Default options for Aveta.
 */
export const Options: IOptions = {
  separator: '.',
  lowercase: false,
  precision: 1,
  digits: 0,
  space: false,
  units: [
    '', // < hundred
    'K', // Thousand
    'M', // Million
    'B', // Billion
    'T', // Trillion
    'P', // Quadrillion
    'E', // Quintillion
  ],
};
