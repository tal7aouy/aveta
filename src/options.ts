export interface IOptions {
  precision: number;
  digits: number;
  separator: string;
  lowercase: boolean;
  space: boolean;
  units: string[];
  base?: number; // New: Custom base for scaling
  roundingMode?: 'up' | 'down' | 'nearest'; // New: Rounding mode
  numberFormat?: (value: number) => string; // New: Custom number format
  threshold?: number; // New: Threshold for formatting
  negativeFormat?: 'prefix' | 'parentheses'; // New: Handling negative numbers
  scientificNotation?: boolean; // New: Scientific notation toggle
  localizedUnits?: { [locale: string]: string[] }; // New: Localization of units
}

export const Options: IOptions = {
  separator: '.',
  lowercase: false,
  precision: 1,
  digits: 0,
  space: false,
  units: [
    '',
    'K',
    'M',
    'B',
    'T',
    'P',
    'E',
  ],
  base: 1000, // New: Default scaling base
  roundingMode: 'nearest', // New: Default rounding mode
  threshold: 0, // New: Default threshold for unit conversion
  negativeFormat: 'prefix', // New: Default negative number format
  scientificNotation: false, // New: Scientific notation off by default
};
