import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { Timeline } from "antd"
import Loading from "../../components/Loading"
import api from "../../api/api"
import "./index.scss"
import SideNav from "../sideNav/index"
export default class Archive extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articleList: [],
            loading: false
        }
    }
    componentDidMount() {
        this.getArticlesList(this.props)
    }
    componentWillReceiveProps(nextProps) {
        this.getArticlesList(nextProps)
    }
    getArticlesList = (props) => {
        this.setState({
            loading: true
        })
        let time = props.match.params.time;

        api.get(`article/getArticleByTime?time=${time}`).then(res => {
            if (res.data) {
                this.setState({
                    articleList: res.data,
                    loading: false
                });
            }
        }).catch(err => {
            this.setState({
                loading: false
            });
        })
    }
    render() {
        let { loading } = this.state
        var time = this.props.match.params.time;
        let matchstr = time.match(/(\d{4})(\d{2})/)
        return (
            <div className="tagArticle">
                <div className="tagArticle_timeline">
                    {
                        loading ? <Loading /> :
                            <Timeline>
                                <Timeline.Item style={{ marginTop: 20 }} key={"key"}>
                                    
                                    <h1 style={{ position: "relative", top: -5, fontSize: 22 }}>{`${matchstr[1]}年${matchstr[2]}月`}</h1>
                                </Timeline.Item>
                                {
                                    this.state.articleList.map((item, index) => {
                                        return (
                                            <Timeline.Item key={index}>
                                                <span style={{ marginRight: 10 }}>{item.creatTime.slice(0, 10)}</span>
                                                <Link to={{ pathname: `/article/${item._id}` }}>
                                                    <span>{item.title}</span>
                                                </Link>
                                            </Timeline.Item>
                                        )
                                    })
                                }

                            </Timeline>}
                </div>
                <SideNav></SideNav>
            </div>
        );
    }
}