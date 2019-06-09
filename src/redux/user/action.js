import api from "@/api/api"
var action =(userInfo,isLogin,type)=> {
	return {
		type:type,
		content:{
			userInfo,
			isLogin:isLogin
		},
		
	}
}
export const login = (account,passWord)=>{
	return dispatch=>{
		return api.post("users/login", {
            account: account,
            passWord: passWord
        }).then(res => {
            if (res.err) {
                var errMeg = res.message
            }
            
            if (!res.err) {
				localStorage.setItem("token",res.data.token)
                console.log("res.data",res.data)
               	dispatch(action(res.data,true,"login"))
            }  
        })

	}
}
export const logout = ()=>{
	return dispatch=>{
		return api.post("users/logout").then(res => {
            if (!res.err) {
            	dispatch(action({},false,"logout"))
            }
        });
	}
}