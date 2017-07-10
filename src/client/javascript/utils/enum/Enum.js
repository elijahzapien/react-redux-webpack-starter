/**
 * Enum module.
 * @module enum-utils/Enum
 */

/**
 * Freezes an object and any nested objects.
 * @param {Object} obj - The object.
 * @return {Object} The deeply frozen object.
 */
const deepFreeze = obj => {
  Object.keys(obj).forEach(key => {
    const value = obj[key];

    // Key mirror null values
    if (value === null) {
      return obj[key] = key;
    }

    // Freeze nested data structures
    if (
      (typeof value  === 'object' && value !== null) ||
      Array.isArray(value)
    ) {
      return deepFreeze(value);
    }
  });

  return Object.freeze(obj);
};

const Enum = obj => deepFreeze(obj);

export default Enum;
