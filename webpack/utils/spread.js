/**
 * Spread utils module.
 * @module webpack-utils/spread
 */

/**
 * Insert into array if condition is truthy.
 *
 * @param condition
 * @param ...elements
 * @return
 */
export const arrayInsertIf = (cond, ...elements) => cond ? elements : [];
