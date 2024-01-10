function customUnshift(arr, ...elements) {
  // Calculate the new length of the array
  var newLength = arr.length + elements.length;

  // Increase the array length
  arr.length = newLength;

  // Shift existing elements to make space for new elements
  for (var i = newLength - 1; i >= elements.length; i--) {
    arr[i] = arr[i - elements.length];
  }

  // Add the new elements at the beginning of the array
  for (var j = 0; j < elements.length; j++) {
    arr[j] = elements[j];
  }

  // Return the new length of the array
  return newLength;
}

// Example usage
var myArray = [2, 3, 4];
customUnshift(myArray, 0, 1); // Adds elements 0 and 1 at the beginning
console.log(myArray); // Output: [0, 1, 2, 3, 4]
