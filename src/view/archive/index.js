import React, { Component } from 'react';
import {Link} from "react-router-dom"
import { Timeline} from "antd"
import Loading from "../../components/Loading"
import api from "../../api/api"
import "./index.scss"
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
    getArticlesList=()=>{
        this.setState({
            loading:true
        })
        api.post("article/getHotArticle").then(res => {
            console.log("getArticlesList", res);
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
        return (
            <div className="archive">  
                {
                loading?<Loading/>:
                <Timeline>
                    {
                        this.state.articleList.map((item,index)=>{
                            return(
                                <Timeline.Item key={index}>
                                    <span style={{marginRight:10}}>{item.creatTime.slice(0,10)}</span>
                                    <Link to={{ pathname: `/article/${item._id}` }}>
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