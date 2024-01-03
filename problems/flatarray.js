function flat(arr){
	let output=[];
	console.log(output)
	for(const ele of arr){
		if(Array.isArray(ele)){
		 output= [...output,...flat(ele)]
		}
		else{
			output.push(ele)
		}
	}
	return output;
}

console.log(flat([1,[2,[3],4],5]));
