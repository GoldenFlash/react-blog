import React,{PureComponent} from "react"
import { Link } from "react-router-dom";
import { Divider,Calendar } from "antd"
import CustomCanlendar from "@/components/calendar"
import "./index.scss"
import calendar_img from "@/assets/calendar.svg"
import api from "@/api/api";
export default class LeftNav extends PureComponent {
    constructor(props){
        super(props)
        this.state={
            hotArticle:[],
            tags:[],
            timeLine:[],
            labelsClass : [
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
        }
    }

    componentDidMount(){
        this.getTags()
        this.getTimeLine()
        this.getArticlesList()
    }

    getTags() {
        api.get("tags/getTags").then(res => {
            this.setState({
                tags: res.data
            });
        });
    }

    getTimeLine = () => {
        api.get("article/getTimeLine").then(res => {
            if (res.data) {
                this.setState({
                    timeLine: res.data,
                    loading: false
                });
            }
        });
    }

    getArticlesList(params) {
        api.get(`article/getHotArticle`, params).then(res => {
            if (res.data) {
                this.setState({
                    hotArticle: res.data.slice(0,5),
                });
            }
        });
    }
   
    render=()=>{
        var { hotArticle, tags, timeLine, labelsClass } = this.state
        return (
            <div className="leftNav">
                <CustomCanlendar></CustomCanlendar>
                <div style={{ marginTop: 10, width: "100%" }}>
                    <Divider orientation="left">最热</Divider>
                    <div className="hotArticle">
                        {hotArticle.map((item, i) => {
                            return (
                                <div key={i} className="article">
                                    <Link to={{ pathname: `/article/${item._id}` }}>{item.title}</Link>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div style={{ marginTop: 10, width: "100%" }}>
                    <Divider orientation="left">文章归档</Divider>
                    <div className="hotArticle">
                        {timeLine.map((item, i) => {
                            let time = item.time.match(/(\d{4})年(\d{2})月/)
                            return (
                                <div key={i} className="timeLine">
                                    <img src={calendar_img} alt="" style={styles.image} />
                                    <Link to={{ pathname: `/timeline/${time[1]}${time[2]}` }}>{item.time}({item.num})</Link>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div style={{ marginTop: 10 }}>
                    <Divider orientation="left">标签</Divider>
                    <div className="lables">
                        {tags && tags.map((item, i) => {
                            return <Link to={{ pathname: `/tag/${item.title}` }} key={i} className={`item ant-tag ${i < 12 ? labelsClass[i] : labelsClass[i - 11]}`}>{item.title}</Link>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    image:{
        width:15,
        height:15,
        margin:"0 10px"
    }
}