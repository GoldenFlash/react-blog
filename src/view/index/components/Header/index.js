import React from "react"
import { Link } from "react-router-dom"
import { Menu, Icon, Avatar, Modal, Input, Button, Dropdown, Alert } from "antd"
import home_img from "../../../../assets/home.svg";
// import lingdang_img from "../../../../assets/lingdang.svg";
import search_img from "../../../../assets/search.svg";
import archive_img from "../../../../assets/archive.svg";
import archiveDark_img from "../../../../assets/archive-dark.svg";
// import DropdownMenu from "../../../../components/Dropdown_menu";
import "./index.scss"

import api from "../../../../api/api"
// import Password from "antd/lib/input/Password";

const MenuItemGroup = Menu.ItemGroup;
export default class Header extends React.Component {
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
        this.checkLogin()
    }
    checkLogin() {
        console.log("userInfo", this.state.userInfo)
        if (document.cookie) {
            var userInfo = {}
            var cookies = document.cookie.split(";")

            cookies.forEach((item) => {
                var arr = item.split("=")
                userInfo[arr[0].trim()] = arr[1]
            })
            console.log("userInfo", userInfo)
            var login = false
            if(userInfo.userId){
                login = true
            }
            window.userInfo = userInfo
            this.setState({
                userInfo: userInfo,
                login: login
            })
        }
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
    logOut = () => {
        api.post("users/logout").then(res => {
            if (!res.err) {
                this.setState({
                    login: false,
                    userInfo: {}
                })
            }
        });
    }
    onMenuClick = (e) => {
        console.log(this)
        console.log(e)
        this.props.history.push(e.key)
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item onClick={this.logOut}>
                    <span>退出登陆</span>
                </Menu.Item>
            </Menu>
        );
        return (
            <header className="header">
                <Login modalVisible={this.state.modalVisible} onOk={this.modalConfirm} onCancel={this.modalCancel}></Login>
                <div className="titleBar">
                    <div className="titleBar_left">
                        <Link className="link" to="/">
                            <Icon type="home" size="large" style={{ color: "#333", marginRight: 5, fontSize: 20 }} />

                            <span style={{ fontSize: "20px" }}>博客</span>
                        </Link>
                    </div>

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
                                this.state.menus.map((item, i) => {
                                    if (!item.auth) {
                                        return (<Menu.Item key={item.path}>
                                            <Icon type={item.type} style={{ marginRight: 5 }} />
                                            <span>{item.title}</span>
                                        </Menu.Item>)
                                    } else if (item.auth && (item.auth === this.state.userInfo.auth)) {
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

                        </Menu>

                        <div style={{ marginRight: 10, marginLeft: 30, fontSize: 14 }}>
                            {this.state.login ?
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

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,

        }
    }

    login = () => {
        this.setState({
            loading: true
        })
        api.post("users/login", {
            account: this.userNameInput.state.value,
            passWord: this.password
        }).then(res => {
            if (res.err) {
                var errMeg = res.message
            }
            this.setState({
                loading: false,
                errMeg: errMeg
            }, () => {
                if (!res.err) {
                    this.props.onOk(false, res.data)
                } else {

                }
            })
        })
    }

    render() {
        let { onOk, onCancel, modalVisible } = this.props

        return (
            <Modal
                title="登陆"
                centered
                visible={modalVisible}
                onOk={() => onOk(false)}
                onCancel={() => onCancel(false)}
                footer={null}
            >
                <div>
                    <Input
                        placeholder="Enter your username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        size="large"
                        placeholder="user name"

                        ref={node => {
                            this.userNameInput = node
                            console.log("node", node)
                        }}
                    />
                </div>
                <div style={{ marginTop: 20 }}>
                    <Input.Password
                        placeholder="Enter your password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        size="large"
                        placeholder="password"
                        onChange={(e) => {
                            this.password = e.target.value
                        }}
                        ref={node => {
                            console.log("node", node)
                            this.passwordInput = node
                        }}
                    />
                </div>
                {this.state.errMeg && <Alert style={{ marginTop: 20 }} closable message={this.state.errMeg} type="error" />}
                <div style={{ marginTop: 20 }}>
                    <Button loading={this.state.loading} onClick={this.login} type="primary" block>登陆</Button>
                </div>
            </Modal>
        )
    }
}