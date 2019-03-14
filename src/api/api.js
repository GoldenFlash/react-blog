/**
 * api
 * @author 王伟
 *time:2018-10-2
 */

import request from "./request";
function faceBook(){
    let data = {}
    var key= "faceBook"
    var time = 60
    return request("https://facebook.github.io/react-native/movies.json",data,"GET",key,time)
}
function post(url, data, key, time) {
    return request(`/blog/api/${url}`, data, "POST", key ? key : "", time ? time : "")
}
function get(url, data, key, time) {
    return request(`/blog/api/${url}`, data, "GET", key ? key : "", time ? time : "")
}
export default{
    faceBook,
    get,
    post
}