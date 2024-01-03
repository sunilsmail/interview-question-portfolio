function power(base, exponent) {
  // Base case: exponent is 0, result is 1
  if (exponent === 0) {
    return 1;
  }

  // Recursive case: multiply base by power of base with reduced exponent
  return base * power(base, exponent - 1);
}

// Example usage:
const base = 2;
const exponent = 3;
const result = power(base, exponent);
console.log(`${base}^${exponent} = ${result}`);

