/**
 * 数据缓存
 * @author 王伟
 *time:2018-10-2
 */
import { AsyncStorage } from "react-native"
var postfix = '_deadtime';

async function getItem(key){
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
           return value
        }
    } catch (error) {
        console.log("error",error)
    }
}

function set(key, value, time) {
    // console.log("setValue",value);
    AsyncStorage.setItem(key, JSON.stringify(value))
    var seconds = parseInt(time);
    if (seconds > 0) {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000 + seconds;
        AsyncStorage.setItem(key + postfix, timestamp + "")
    } else {
        AsyncStorage.removeItem(key + postfix)
    }
}

function get(key, def) {
    return new Promise((resolve,reject)=>{
        getItem(key + postfix).then((timestamp) => {
            var deadtime = parseInt(timestamp)
            if (deadtime) {
                if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
                    if(def) { 
                        resolve(def); 
                    }else {
                        resolve(); 
                    }
                }else{
                    getItem(key).then((res) => {
                        if (res) {
                            var storage = JSON.parse(res)
                            console.log("getStorage", storage)
                            resolve(storage)
                        } else {
                            resolve(def);
                        }
                    })
                }
            }else{
                if(def) { 
                    resolve(def); 
                }else {
                    resolve(); 
                }
            } 
        }) 
    })
    
}

function remove(key) {
    AsyncStorage.removeItem(key);
    AsyncStorage.removeItem(key + postfix);
}



export default{
    set: set,
    get: get,
    remove: remove,
    // clear: clear,
}
