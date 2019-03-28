let defaultSate = {
	windowWidth:0
}
const commomReducer = (state=defaultSate,action)=>{
	switch(action.type){
		case "windowWidth":
			return{
				...state,
				windowWidth:action.windowWidth
			}
		default:
			return state
	}
}
export default commomReducer