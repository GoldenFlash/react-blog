import React, { Component } from 'react';
import {Link} from "react-router-dom"
import { Timeline} from "antd"
import Loading from "../../components/Loading"
import api from "../../api/api"
import "./index.scss"
import { relative } from 'path';
export default class Archive extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articleList:[],
            loading:false
        }
    }
    componentDidMount() {
        this.getArticlesList()
    }
    componentWillReceiveProps(nextProps){
        this.getArticlesList(nextProps)
    }
    getArticlesList = (nextProps)=>{
        this.setState({
            loading:true
        })
        var props = nextProps||this.props
        let { tag } = props.location.state
        api.post("article/getArticleBytags", { tag: tag.title}).then(res => {
            console.log("getArticleBytags", res);
            if (res.data) {
                this.setState({
                    articleList: res.data,
                    loading:false
                });
            }
        });
    }
    render() {
        let {loading} = this.state
        let { tag } = this.props.location.state
        return (
            <div className="tagArticle">  
                {
                loading?<Loading/>:
                <Timeline>
                    <Timeline.Item style={{marginTop:20}} key={"key"}>
                        <h1 style={{position:"relative",top:-5,fontSize:22}}>{tag.title}</h1>
                    </Timeline.Item>
                    {
                        this.state.articleList.map((item,index)=>{
                            return(
                                <Timeline.Item key={index}>
                                    <span style={{marginRight:10}}>{item.creatTime.slice(0,10)}</span>
                                    <Link to={{ pathname: "content", state: { article: item } }}>
                                        <span>{item.title}</span>
                                    </Link>
                                </Timeline.Item>
                            )
                        })
                    }
                    
                </Timeline>}
            </div>
        );
    }
}