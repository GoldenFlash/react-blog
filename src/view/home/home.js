import React, { Component } from 'react';
import { connect } from "react-redux";
import Loading from "../../components/Loading"
import api from "../../api/api";
import SideNav from "../sideNav/index"
import List from "./component/list/index"
import Carousel from "./component/carousel/carousel"

class ArticalList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articleList: [],
            timeLine:[],
            loading: false
        }
    }
    componentDidMount() {
        this.getArticlesList(this.props.match.params)
    }
    componentWillReceiveProps(nextProps) {
        this.getArticlesList(nextProps.match.params)
    }

    getArticlesList(params) {
        this.setState({
            loading: true
        })
        api.get(`article/getHotArticle`, params).then(res => {
            if (res.data) {
                this.setState({
                    articleList: res.data,
                    loading: false
                });
            }
        });
    }


    render() {
        let { loading, articleList, searchList } = this.state
        var list = searchList || articleList
        return (
            loading ? <Loading /> :
                list.length > 0 ?
                    <div style={{ display: "flex", minHeight: "100vh",justifyContent:"center" }}>
                        <div style={styles.articleContent}>
                            <Carousel></Carousel>
                            <List {...this.props} list={list}></List>
                        </div>
                        <SideNav></SideNav>
                    </div>
                    : <div>数据为空</div>
        )
    }
}
export default connect(state => ({ windowWidth: state.common.windowWidth, searchStr: state.common.searchStr }))(ArticalList)

const styles = {
    articleContent:{
        flex: 1, 
        borderRight: "solid #e8e8e8 1px",
        maxWidth:'800px'
    }
}
