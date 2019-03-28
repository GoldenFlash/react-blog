import React from "react"
import { Link } from "react-router-dom";
import { Divider } from "antd"
import "./index.scss"
function LeftNav(props) {
    var labelsClass = [
        "ant-tag-magenta",
        "ant-tag-blue",
        "ant-tag-red",
        "ant-tag-volcano",
        "ant-tag-orange",
        "ant-tag-gold",
        "ant-tag-lime",
        "ant-tag-green",
        "ant-tag-cyan",
        "ant-tag-geekblue",
        "ant-tag-purple",
        "ant-tag-lime"
    ]
    var {latestArticle,tags} = props
    return (
        <div className="leftNav">
            <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                <img alt="" style={{ width: 130, height: 130, borderRadius: "50%" }} src="https://github.com/GoldenFlash/blog/blob/master/img/avatar.jpeg?raw=true" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ fontSize: 26, fontWeight: "600" }}>wangwei</div>
                <div style={{ fontSize: 12, color: "#8590a6", marginTop: 10 }}>前端打杂人员，略微代码洁癖</div>
            </div>

            <div style={{ marginTop: 10 }}>
                <Divider orientation="left">最近文章</Divider>
                <div className="wrapper">
                    {latestArticle.map((item, i) => {
                        return (
                            <div key={i} className="latestArticle"><Link to={{ pathname: `/article/${item._id}` }}>{item.title}</Link></div>
                        )
                    })}
                </div>
            </div>

            <div style={{ marginTop: 10 }}>
                <Divider orientation="left">标签</Divider>
                <div className="lables ">
                    {tags.map((item, i) => {
                        return <Link to={{pathname:`/tag/${item.title}`}}  key={i} className={`item ant-tag ${i<12?labelsClass[i]:labelsClass[i-11]}`}>{item.title}</Link>
                    })}
                </div>
            </div>
        </div>
    )
}
export default LeftNav