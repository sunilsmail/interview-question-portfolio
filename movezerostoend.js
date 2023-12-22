function moveZeros(nums){
	let left=0;
	let right =0;
	console.log(right < nums.length)
	
	while(right< nums.length){
		console.log(`left${left} right${right}`)
		
		if(nums[right] !=0){
			
			[nums[left],nums[right]]=[
			 nums[right], nums[left]
			];
			
			left++;
		}
		right++;
	}
	return nums;
}

console.log(moveZeros([0,2,4,6,0,9]))


