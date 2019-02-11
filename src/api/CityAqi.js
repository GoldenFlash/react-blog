// import axios from 'axios';
import { Constants } from '../common/index.js'
import AirAQIInfo from '../hb/AirAQIInfo'
import cache from "../common/cache.js"
class CityAqi {

    // @param {any} STCode 城市代码
    // @param {any} sType  测点类型
    // @memberof CityAqi
    upDateTime(time) {
        //根据日期字符串转换成日期 
        var regEx = new RegExp("\\-", "gi");
        time = time.replace(regEx, "/");
        var dependedDate = new Date(time);
        return dependedDate.getHours() + "时";
    }
    GetAQIByDate(STCode, sType) {
        return new Promise((resolve,reject)=>{
            let params = {
                STCode: STCode,
                sType: sType,
            }
            let wsurl = Constants.host_province + "/" + Constants.path_webservice;
            let wsmethod = "GetAQIDayReport";
            var key = `${STCode}${sType}`
            cache.get(key).then((storage) => {
                if (storage) {
                    resolve(storage)
                } else {
                    fetch(wsurl + '/' + wsmethod, {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(params)
                    }).then((res) => {

                        return res.json()
                    }, (err) => {
                        console.log("err", err)
                    }).then((response) => {
                        let data = response.d
                        data.forEach((item, index) => {
                            let AirAQIInfos = new AirAQIInfo(item.AQI);
                            console.log("AirAQIInfos", AirAQIInfos)
                            item.GradeColor = AirAQIInfos.GradeColor;//AQI值颜色
                            item.Grade = AirAQIInfos.Grade;//空气质量级别（文字）
                            item.JKYXQK = AirAQIInfos.JKYXQK;//健康指引
                            item.JYCQCS = AirAQIInfos.JYCQCS;//建议采取措施
                            item.GradeNum = AirAQIInfos.GradeNum;//空气质量级别（数字）
                            item.HourTime = this.upDateTime(item.Time + ":00:00");
                        })
                        cache.set(key,data,60)
                        resolve(data)
                    }).catch((err)=>{
                        console.log("err")
                    })
                }
            })
        })
        
    }


    GetTrendAQIOrDensity(STCode, iDay, sType, callback) {
        console.log("GetTrendAQIOrDensity")
        return new Promise((resolve,reject)=>{
            let params = {
                STCode: STCode,
                iDay: iDay,
                sType: sType
            }
            let wsurl = Constants.host_province + "/" + Constants.path_webservice;
            let wsmethod = "GetTrendAQIOrDensity";
            var key = `${STCode}${iDay}${sType}`
            cache.get(key).then((storage) => {
                if (storage) {
                    resolve(storage)
                } else {
                    fetch(wsurl + '/' + wsmethod, {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(params)
                    }).then((res) => {
                        return res.json()
                    }).then((response) => {
                        console.log("response", response)
                        var data = response.d
                        data.map(item => { //给返回数据增加对应AQI值颜色
                            let AirAQIInfos = new AirAQIInfo(item.AQI);
                            item.GradeColor = AirAQIInfos.GradeColor;
                            item.GradeNum = AirAQIInfos.GradeNum;//空气质量级别（数字）
                            item.HourTime = this.upDateTime(item.Time + ":00:00");
                        })
                        cache.set(key, data, 60)
                        resolve(data) 
                    }).catch((err)=>{
                        console.log("error",err)
                    })
                }
            })
            
        })
    }

    GetLatitudeAndLongitude(modType, callback) {
        return new Promise((resolve,reject)=>{
            let params = {
                modType: modType
            }
            let wsurl = Constants.path_webservice_gis;
            let wsmethod = "GetLatitudeAndLongitude";
            var key = `${modType}`
            cache.get(key).then((storage) => {
                if (storage) {
                    resolve(storage)
                } else { 
                    fetch(wsurl + '/' + wsmethod, {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(params)
                    }).then((res) => {
                        return res.json()
                    }).then((response) => {
                        console.log("response", response)
                        var data = response.d
                        cache.set(key, data, 60)
                        resolve(data) 
                    }).catch((err)=>{
                        console.log("error",err)
                    })
                }
            })
            
        })
    }
    GetCityAQIDayReport_New(TimeType, BeginDate, EndDate, fldPCode, fldStandardName, fldLevel, fldItemCode, DecCarry, IsPre, IsYear, IsTotal, IsDetail, fldSource, AppriseID, STatType, CityID, CalculateID, ItemValueType, callback) {
        return new Promise((resolve,reject)=>{
            let params = {
                "TimeType": TimeType,
                "BeginDate": BeginDate,
                "EndDate": EndDate,
                "fldPCode": fldPCode,
                "fldStandardName": fldStandardName,
                "fldLevel": fldLevel,
                "fldItemCode": fldItemCode,
                "DecCarry": DecCarry,
                "IsPre": IsPre,
                "IsYear": IsYear,
                "IsTotal": IsTotal,
                "IsDetail": IsDetail,
                "fldSource": fldSource,
                "AppriseID": AppriseID,
                "STatType": STatType,
                "CityID": CityID,
                "CalculateID": CalculateID,
                "ItemValueType": ItemValueType,

            }
            let wsurl = Constants.host_province + "/" + Constants.host_actionapi;
            let wsmethod = "GetEQIA_R_RawData/GetRawData";
            console.log("params", params)

            var key = "Calendars"
            cache.get(key).then((storage) => {
                if (storage) {
                    resolve(storage)
                } else {
                    fetch(wsurl + '/' + wsmethod, {
                        method: "POST",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(params)
                    }).then((res) => {
                        return res.json()
                    }).then((response) => {
                        console.log("response", response)
                        var data = response.data
                        if(data.length){
                            data.forEach((item,index)=>{
                                if (item.fldSTName == "哈尔滨市") {
                                    let AirAQIInfos = new AirAQIInfo(item.fldMaxDAPI);
                                    item.GradeColor = AirAQIInfos.GradeColor;//AQI值颜色                
                                }
                            })
                        }
                        cache.set(key, data, 60)
                        resolve(data)
                    })
                }
            })
        })
        
    }

}


export default CityAqi;