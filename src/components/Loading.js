import React from "react"
import { Spin } from "antd"
export default function Loading(params) {
    return (
        < div style={{  display: "flex", alignItems: "center", justifyContent: "center",position:"absolute",top:0,bottom:0,left:0,right:0}} >
            <Spin size="large"></Spin>
        </div >
    )
}