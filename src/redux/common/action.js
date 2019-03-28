export const windowWidth = ()=>{
	var windowWidth = document.body.clientWidth
	return{
		type:"windowWidth",
		windowWidth
	}
}

export const searchStr = (text)=>{
	return {
		type:"search",
		text
	}
}