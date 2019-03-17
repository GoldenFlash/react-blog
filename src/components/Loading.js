import React from "react"
import { Spin } from "antd"
export default function Loading(params) {
    return (
        < div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }} >
            <Spin></Spin>
        </div >
    )
}