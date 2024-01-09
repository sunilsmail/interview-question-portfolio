function subarraySum(nums, k) {
    let count = 0;
    let currSum = 0;
    const prefixSum = new Map();
    prefixSum.set(0, 1); // Initialize with a prefix sum of 0 having occurred once

    for (const num of nums) {
        currSum += num;

        // Check if there exists a prefix sum (currSum - k) in the hashmap
        if (prefixSum.has(currSum - k)) {
            count += prefixSum.get(currSum - k);
        }

        // Update the hashmap with the current prefix sum
        prefixSum.set(currSum, (prefixSum.get(currSum) || 0) + 1);
    }

    return count;
}



// Example 1
const nums1 = [1, 2, 3];
const k1 = 3;
console.log(subarraySum(nums1, k1));  // Expected output: 2

// Example 2
const nums2 = [1, 1, 1];
const k2 = 2;
console.log(subarraySum(nums2, k2));  // Expected output: 2

// Example 3
const nums3 = [1, 2, 3, -1, -2, 5];
const k3 = 3;
console.log(subarraySum(nums3, k3));  // Expected output: 2

