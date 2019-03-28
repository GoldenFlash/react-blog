let defaultSate = {
	windowWidth:0,
	keyWord:""
}
const commomReducer = (state=defaultSate,action)=>{
	switch(action.type){
		case "windowWidth":
			return{
				...state,
				windowWidth:action.windowWidth
			}
		case "search":
			return{
				...state,
				keyWord:action.text
			}
		default:
			return state
	}
}
export default commomReducer