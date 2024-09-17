# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0]

- initial release

## [1.1.0] (Feb-9-2022)

- use aveta in command line
- update Readme

## [1.1.1] (Feb-17-2022)

- update readme
- use aveta with `npx`

## [1.2.0] (Mar-06-2022)

- update readme
- specify a maximum number of significant digits for a number
 ## [1.3.0] (Mar-24-2023)

- update readme
- specify a maximum number of significant digits for a number
 

## [1.4.0] (Upcoming)

### Added
- **Custom base scaling**: Introduced the `base` option, allowing users to specify a custom base for scaling numbers (e.g., 1000 or 1024 for file sizes).
- **Rounding mode**: Added `roundingMode` option with values `'up'`, `'down'`, or `'nearest'` to control how numbers are rounded.
- **Threshold for formatting**: Added `threshold` option to set a minimum value for applying unit conversion (below the threshold, the number will be returned as-is).
- **Negative number formatting**: Introduced the `negativeFormat` option to control how negative numbers are displayed (`'prefix'` for minus sign or `'parentheses'` for enclosing in parentheses).
- **Scientific notation**: Added the `scientificNotation` option to toggle the display of large numbers in scientific notation.
- **Localized units**: Introduced the `localizedUnits` option to support locale-specific unit abbreviations (e.g., different units for English and French).
- **Custom number format**: Added the `numberFormat` option, which allows the use of a custom function to format numbers before unit conversion.

### Updated
- **Documentation**: Updated the README to reflect the new options added in this release.
