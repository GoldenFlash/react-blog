import React, { Component } from 'react';
import "./index.scss"
import { Layout, Menu, Icon, Button, Popconfirm, Dropdown, Modal, Input } from 'antd';
import api from "../../api/api.js"
import Loading from "../../components/Loading"
import Edite from "./edite/edite"
const { Sider, Content } = Layout;
const ref = React.createRef();
export default class SiderDemo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            collections: [],
            checkedCollection: {},
            checkedCollection_index:"",
            collectionSelectKey:['0'],
            articleList: [],
            checkedArticle:"",
            checkArticle_index:"",
            modelTitle: "",
            modelType:""
        }
    }
    componentDidMount() {
        this.getCollections()
        console.log("ref",ref)
    }
    onTitleChange=(text)=>{
        var articleList = this.state.articleList
        var index = this.state.checkArticle_index
        articleList[index].title = text
        this.setState({
            articleList:articleList
        })
    }
    showModal(modelTitle,modelType) {
        this.setState({
            visible: true,
            modelTitle: modelTitle,
            modelType:modelType
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleOk=()=>{
        var title = this.collectionTitle
        console.log("title",title)
        if(this.state.modelType==="add"){
            this.addNewCollections(title)
        }
        if(this.state.modelType==="edite"){
            this.editeCollection()
            this.setState({
                visible:false,
               
            });
        }
       
    }
    toHome = () => {
        this.props.history.push("/")
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    getCollections() {
        return api
            .post("article/getCollections")
            .then(res => {
                console.log("res", res);
                var initCollection = res.data[0]
                this.checkCollection(initCollection,0)
                this.setState({
                    collections: res.data,
                    checkedCollection: initCollection
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
    addNewCollections(title) {
        api
            .post("article/addCollections", { title: title })
            .then(res => {
                if (!res.err) {
                    var collections = this.state.collections
                        ? this.state.collections
                        : [];
                    collections.push(res.data);
                    console.log("collections", collections);
                    this.setState({
                        visible:false,
                        collections: collections
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    deleteCollection(collection) {
        var index = this.state.checkedCollection_index
        api
            .post("article/deleteCollection", {
                id: collection._id
            })
            .then(res => {
                if (res.data) {
                    var collections = this.state.collections;
                    collections.splice(index, 1);
                    var nextIndex =index?index-1:index
                    this.checkCollection(collections[nextIndex],nextIndex)
                    this.setState({
                        collections: collections,
                        collectionSelectKey:[`${nextIndex}`]
                    });
                }
            });
    }
    editeCollection(){
        var collection = this.state.checkedCollection
        api.post("article/editeCollection",{
            id: collection._id,
            title:this.collectionTitle
        }).then(res=>{
            var collections = this.state.collections;
            var index = this.state.checkedCollection_index
            collections[index].title = this.collectionTitle
            this.setState({
                collections:collections
            })
        })
    }
    checkCollection(item,index){
        if (this.state.checkedCollection._id === item._id) return
        this.setState({
            checkedCollection_index:index,
            collectionSelectKey:[`${index}`],
            checkedCollection: item,
            loading:true
        })
        this.getArticleList(item)
    }
    getArticleList(item) {
        api
            .post("article/getArticleList", { collectionId: item._id })
            .then(res => {
                console.log("getArticleList",res)
                this.setState({
                    articleList: res.data,
                    checkedArticle:res.data[0],
                    checkArticle_index:0,
                    loading:false
                });
            });
    }
    deleteArticle(article, index) {
        api.post("article/deleteArticle", {
            id: article._id,
            collectionId: article.collectionId
        }).then((res) => {
            var articleList = this.state.articleList
            articleList.splice(index, 1)
            this.setState({
                checkedArticle:articleList[index]||articleList[index-1],
                articleList: articleList
            })
        })
    }
    addArticle() {
        var articleList = this.state.articleList
        var date = new Date();
        var today = `${date.getFullYear()}-${date.getMonth() +
            1}-${date.getDate()}`;
        api
            .post("article/addNewArticle", {
                collectionId: this.state.checkedCollection._id,
                title: today,
                content: "",
                isPublish: false
            })
            .then(res => {
                if (res.data) {
                    articleList.push(res.data);
                    console.log("articleList",articleList)
                    this.setState({
                        articleList: articleList,
                    });
                }
            });
    }
    checkArticle(article,index) {
        if(this.state.checkedArticle._id===article._id) return
        this.setState({
            checkArticle_index:index,
            checkedArticle: article
        })
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item onClick={this.showModal.bind(this, "修改文集","edite")}>
                    <Icon type="edit" />
                    <span>修改文集</span>
                </Menu.Item>
                <Menu.Item onClick={this.deleteCollection.bind(this, this.state.checkedCollection)}>
                    <Icon type="delete" />
                    <span>删除文集</span>
                </Menu.Item>
            </Menu>
        );
        return (
            <Layout style={{ minHeight: "100vh" }}>
                <Modal
                    title={this.state.modelTitle}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Input onChange={(e)=>{this.collectionTitle = e.target.value}} placeholder="请输入文集名" />
                </Modal>
                <Sider
                    style={{}}
                >
                    <div className="logo">
                        <Button onClick={this.toHome}>返回首页</Button>
                    </div>
                    <Menu selectable={false} style={{ borderRight: "none" }} theme="dark" mode="inline">
                        <Menu.Item onClick={this.showModal.bind(this, "新建文集","add")}>
                            <Icon type="plus" />
                            <span>新建文集</span>
                        </Menu.Item>
                    </Menu>
                    <Menu style={{ borderRight: "none" }} theme="dark" mode="inline" defaultSelectedKeys={['0']} selectedKeys={this.state.collectionSelectKey}>
                        {this.state.collections.map((item, index) => {
                            return (
                                <Menu.Item onClick={this.checkCollection.bind(this, item,index)} key={index}>
                                    {
                                        this.state.checkedCollection._id === item._id ?
                                            <Icon type="folder-open" /> :
                                            <Icon type="folder" />
                                    }
                                    <span>{item.title}</span>
                                    {
                                        this.state.checkedCollection._id === item._id &&
                                        <div style={{ float: "right" }}>
                                            <Dropdown placement="bottomRight" overlay={menu}>
                                                <Icon type="setting" />
                                            </Dropdown>
                                        </div>
                                    }
                                </Menu.Item>
                            )
                        })}
                    </Menu>
                </Sider>
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                        className="sider_article">
                        <div onClick={this.addArticle.bind(this)} className="article_add">
                            <Icon type="plus-circle" />
                            <span>新建文章</span>
                        </div>
                        {this.state.loading?
                        <Loading/>:
                        <div className="item_wrapper">
                            {this.state.articleList.map((item, index) => {
                                return (
                                    <div onClick={this.checkArticle.bind(this, item,index)} key={index} className={`article_item ${this.state.checkedArticle._id === item._id ? "checked" : ""}`}>
                                        <Icon type="file" />
                                        <span>{item.title}</span>
                                        <div className="delete">
                                            <Popconfirm title="点击确定删除文章.............." onConfirm={this.deleteArticle.bind(this, item, index)} okText="确定" cancelText="取消">
                                                <Icon type="close-circle" />
                                            </Popconfirm>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>}

                    </Sider>
                    <Content style={{
                       background: '#fff', minHeight: 280,
                        height: "100vh",overflow:"hidden"
                    }}
                    >
                        {   this.state.checkedArticle&&
                            <Edite ref={ref} article={this.state.checkedArticle} onTitleChange={this.onTitleChange} />
                        }
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
