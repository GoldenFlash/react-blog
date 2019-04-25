import React, { Component } from 'react';
import "./index.scss"
import { Layout, Menu, Icon, Button } from 'antd';
import api from "../../api/api.js"
const { Header, Sider, Content } = Layout;

export default class SiderDemo extends React.Component {
    constructor(props){
        super(props)
        this.state={
            collapsed: false,
            collections:[],
            articleList:[]
        }
    }
    componentDidMount(){
        this.getCollections()
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
                this.getArticleList(res.data[0])
                this.setState({
                    collections: res.data
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
    getArticleList(item) {
        api
            .post("article/getArticleList", { collectionId: item._id })
            .then(res => {
                console.log(11111, res);
                this.setState(
                    {
                        // checkedArticle: res.data[0],
                        articleList: res.data
                    }
                    
                );
            });
    }
    toHome = ()=>{
        this.props.history.push("/")
    }
    render() {
        return (
            <Layout style={{minHeight:"100vh"}}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    style={{}}
                >
                    <div className="logo">
                        <Button onClick={this.toHome}>返回首页</Button>
                    </div>
                    <Menu style={{borderRight:"none"}} theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                       {this.state.collections.map((item,index)=>{
                           return (
                               <Menu.Item onClick={this.getArticleList.bind(this, item)} key={index}>
                                    {/* <Icon type="user" /> */}
                                    <span>{item.title}</span>
                                </Menu.Item>
                    
                            )
                       })}
                    </Menu>
                </Sider>
                <Layout>
                    <Sider style={{marginLeft:5,backgroundColor:"#FFF"}}>
                        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                            {this.state.articleList.map((item, index) => {
                                return (
                                    <Menu.Item key={index}>
                                      
                                        <span>{item.title}</span>
                                    </Menu.Item>

                                )
                            })}
                        </Menu>
                    </Sider>
                    
                    {/* <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header> */}
                    {/* <Content style={{
                        margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
                        height:"100%"
                    }}
                    >
                                    Content
                    </Content> */}
                </Layout>
            </Layout>
        );
    }
}
