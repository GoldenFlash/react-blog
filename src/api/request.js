/**
 * fetch请求
 * @author 王伟
 *time:2018-10-2
 */
// import cache from "./cache";
// import config from "./config";
import axios from 'axios'
// function objToString(obj) {
//   let arr = [];
//   for (let item in obj) {
//     let str = `${item}=${obj[item]}`;
//     arr.push(str);
//   }
//   return arr.join("&");
// }

let request = function(url, data = {}, method = "GET", key, time) {
  return new Promise((resolve, reject) => {
    let requestObj = {};
    // if(method === "GET"){
    //   url =url+"?"+objToString(data)
    // }
    requestObj = {
      method: method,
      url:url,
      data: data
    };

    if (key && time) {
    //   cache.get(key).then(storage => {
    //     if (storage) {
    //       resolve(storage);
    //     } else {
    //       axios(requestObj)
    //         .then(
    //           value => {
    //             cache.set(key, value, time);
    //             resolve(value);
    //           },
    //           rej => {
    //             console.log("reject", rej);
    //             reject(rej);
    //           }
    //         );
    //     }
    //   });
    } else {
         console.log("requestObj",requestObj)
      axios(requestObj)
        .then(
          value => {
            //   console.log("value",value)
            resolve(value.data);
          },
          rej => {
            console.log("reject", rej);
            reject(rej);
          }
        );
    }
  });
};
export default request;
