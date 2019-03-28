import {combineReducers} from "redux"
import user from "./user/reducer.js"
import common from "./common/reducer.js"
export default combineReducers({
	user,
	common
})