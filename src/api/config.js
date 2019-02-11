/**
 *项目配置
 * @author 王伟
 *time:2018-10-2
 */

const isProduce = false

const config = {
    host:isProduce?'http://101.132.173.11:3000':'http://127.0.0.1:3001',
    requestHeader: {
        // Accept: "application/json",
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded"
    }
}

export default config