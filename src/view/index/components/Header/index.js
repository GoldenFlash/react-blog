import React from "react"
import { Link } from "react-router-dom"
import {connect} from "react-redux"
import { Menu, Icon, Avatar, Modal, Input, Button, Dropdown, Alert } from "antd"
import home_img from "../../../../assets/home.svg";
import search_img from "../../../../assets/search.svg";
import archive_img from "../../../../assets/archive.svg";
import archiveDark_img from "../../../../assets/archive-dark.svg";
import "./index.scss"

import api from "../../../../api/api"
import Login from "../login/index.js"
import {logout as logoutAction} from "@/redux/user/action.js"

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup;
class Header extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            userInfo: {},
            modalVisible: false,
            login: false,
            menus: [
                { path: "/", title: "首页", type: "home" },
                { path: "/archive", title: "归档", type: "snippets" },
                { path: "/about", title: "关于", type: "user" },
                { path: "/edite", title: "写文章", type: "edit", auth: "0" },
            ]
        }
    }
    componentDidMount() {
    }
   
    modalCancel = (isVisibal) => {
        this.setState({
            modalVisible: isVisibal
        })
    }
    modalConfirm = (isVisibal, userInfo) => {
        this.setState({
            modalVisible: isVisibal,
            login: true,
            userInfo: userInfo
        })
    }
    logout = () => {
        this.props.dispatch(logoutAction())
    }
    onMenuClick = (e) => {
        this.props.history.push(e.key)
    }
    render() {
        let {isLogin,userInfo} = this.props
        const menu = (
            <Menu>
                <Menu.Item onClick={this.logout}>
                    <span>退出登陆</span>
                </Menu.Item>
            </Menu>
        );
        return (
            <header className="header">
                <Login modalVisible={this.state.modalVisible} onOk={this.modalConfirm} onCancel={this.modalCancel}></Login>
                <div className="titleBar">
               
                    {
                        this.props.windowWidth>850&&
                        <div className="titleBar_left">
                            <Link className="link" to="/">
                                <Icon type="home" size="large" style={{ color: "#333", marginRight: 5, fontSize: 20 }} />

                                <span style={{ fontSize: "20px" }}>博客</span>
                            </Link>
                        </div>
                    }

                    <div className="titleBar_middle">

                        <input
                            className="titleBar_input"
                            type="text"
                            placeholder="输入关键词搜索..."
                        />
                        <div className="titleBar_search">
                            <img alt=""
                                src={search_img}
                                style={{ width: "20px", height: "20px" }}
                            />
                        </div>

                    </div>

                    <div className="menu">
                        <Menu selectable={false} onClick={this.onMenuClick} mode="horizontal" defaultSelectedKeys={["0"]}>
                            {
                                this.props.windowWidth>850?
                                 this.state.menus.map((item, i) => {
                                    if (!item.auth) {
                                        return (<Menu.Item key={item.path}>
                                                <Icon type={item.type} style={{ marginRight: 5 }} />
                                                <span>{item.title}</span>
                                            </Menu.Item>)
                                    } else if (item.auth && (item.auth ===userInfo.auth)) {
                                        console.log("auth", item.auth)
                                        return (
                                            <Menu.Item key={item.path}>
                                                <Icon type={item.type} style={{ marginRight: 5 }} />
                                                <span>{item.title}</span>
                                            </Menu.Item>
                                        )
                                    }
                                }):
                                <SubMenu title={<Icon type="menu-fold" />}>
                          
                                    {this.state.menus.map((item, i) => {
                                        if (!item.auth) {
                                            return (<Menu.Item key={item.path}>
                                                    <Icon type={item.type} style={{ marginRight: 5 }} />
                                                    <span>{item.title}</span>
                                                </Menu.Item>)
                                            } else if (item.auth && (item.auth ===userInfo.auth)) {
                                                console.log("auth", item.auth)
                                                return (
                                                    <Menu.Item key={item.path}>
                                                        <Icon type={item.type} style={{ marginRight: 5 }} />
                                                        <span>{item.title}</span>
                                                    </Menu.Item>
                                                )
                                            }
                                        })
                                    }
                                </SubMenu>
                            }
                            

                        </Menu>

                        <div style={{ marginRight: 10, marginLeft: 30, fontSize: 14 }}>
                            {isLogin ?
                                <Dropdown overlay={menu} placement="bottomCenter">
                                    <Avatar size="large" icon="user" style={{ backgroundColor: '#87d068' }} />
                                </Dropdown> :
                                <div style={{ cursor: "pointer" }} onClick={() => {
                                    this.setState({
                                        modalVisible: true
                                    })
                                }}>
                                    <span>登录</span>
                                </div>
                            }
                        </div>

                    </div>

                </div>
            </header>
        )
    }
}
function SelfMenu(props){
    return(
       props.menus.map((item, i) => {
            if (!item.auth) {
                return (<Menu.Item key={item.path}>
                    <Icon type={item.type} style={{ marginRight: 5 }} />
                    <span>{item.title}</span>
                </Menu.Item>)
            } else if (item.auth && (item.auth ===props.auth)) {
                console.log("auth", item.auth)
                return (
                    <Menu.Item key={item.path}>
                        <Icon type={item.type} style={{ marginRight: 5 }} />
                        <span>{item.title}</span>
                    </Menu.Item>
                )
            }
        })
                            
    )
}

export default connect(
    state=>({...state.user,windowWidth:state.common.windowWidth})
)(Header)