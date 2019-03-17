import React from "react"
import { Link } from "react-router-dom"
import { Menu, Icon, Avatar, Modal, Input, Button, Dropdown, Alert} from "antd"
import home_img from "../../../../assets/home.svg";
// import lingdang_img from "../../../../assets/lingdang.svg";
import search_img from "../../../../assets/search.svg";
import archive_img from "../../../../assets/archive.svg";
// import DropdownMenu from "../../../../components/Dropdown_menu";
import "./index.scss"

import api from "../../../../api/api"
// import Password from "antd/lib/input/Password";

const MenuItemGroup = Menu.ItemGroup;
export default class Header extends React.Component {
    constructor(props) {
        
        super(props)
        this.state = {
            modalVisible: false,
            login:this.checkLogin()
        }
    }
    checkLogin(){
        if (document.cookie) {
            var userInfo = {}
            var cookies = document.cookie.split(";")

            cookies.forEach((item) => {
                var arr = item.split("=")
                userInfo[arr[0].trim()] = arr[1]
            })
            window.userInfo = userInfo
            return true
            // this.setState({
            //   userInfo: userInfo,
            //   login: true
            // })
        }
    }
    modalCancel = (isVisibal) => {
        this.setState({
            modalVisible: isVisibal
        })
    }
    modalConfirm = (isVisibal) => {
        this.setState({
            modalVisible: isVisibal,
            login:true
        })
    }
    logOut=()=>{
        api.post("users/logout").then(res => {
            if(!res.err){
                this.setState({
                    login: false
                })
            }
        });
        
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
            <header>
                <Login modalVisible={this.state.modalVisible} onOk={this.modalConfirm} onCancel={this.modalCancel}></Login>
                <div className="titleBar">
                    <div className="titleBar_left">
                        <Link className="link" to="/home">
                            <img alt=""
                                style={{ width: "25px", height: "25px", marginRight: "10px" }}
                                src={home_img}
                            />
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
                    {/* <Menu theme="dark" style={{backgroundColor:"transparent"}} mode="horizontal">
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                </Menu> */}

                    <div style={{fontSize:13,flex: 1, display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                        <div>
                            <Link className="link" to="/home">
                                <Icon type="home" style={{ color: "#FFF", marginRight: 5 }} />
                                <span>首页</span>
                            </Link>
                        </div>
                        <div>
                            <Link className="link" to="/home">
                                <img style={{ width: "15px", height: "15px",marginRight:5}} src={archive_img} alt="" />
                                <span>归档</span>
                            </Link>
                        </div>
                        <div>
                            <Link className="link" to="/home">
                                <Icon type="user" style={{ color: "#FFF", marginRight: 5 }} />
                                <span>关于</span>
                            </Link>
                        </div>
                        <div>
                            <Link className="link" to="/edite">
                                <Icon type="edit" style={{ color: "#FFF", marginRight: 5}} />
                                <span>写文章</span>
                            </Link>
                        </div>
                        <div style={{marginRight:10}}>
                            {this.state.login?
                                <Dropdown overlay={menu} placement="bottomCenter">
                                    <Avatar size="large" icon="user" style={{ backgroundColor: '#87d068' }} />
                                </Dropdown>:
                                <div style={{cursor:"pointer"}} onClick={() => {
                                    this.setState({
                                        modalVisible: true
                                    })
                                }}>
                                    <span>登陆</span>
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

    constructor(props){
        super(props)
        this.state = { 
            loading:false,
            // username: this.refs.userNameInput.value,
            // passWord: this.refs.passwordInput.value
        }
    }
    componentDidMount(){
        // console.log(1111111111110000, this.userNameInput)
    }
    login = () => {
        this.setState({
            loading: true
        })
        api.post("users/login", {
            account: this.userNameInput.state.value,
            passWord: this.password
        }).then(res => {
            if(res.err){
                var errMeg = res.message
            }
            this.setState({
                loading: false,
                errMeg: errMeg
            }, () => {
                if(!res.err){
                    this.props.onOk(false)
                }else{
                    
                }
            })
        })
    }

    render() {
        let { onOk, onCancel, modalVisible} = this.props
        
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
                            console.log("node",node)
                        }}
                    />
                </div>
                <div style={{ marginTop: 20 }}>
                    <Input.Password
                        placeholder="Enter your password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        size="large"
                        placeholder="password"
                        onChange={(e)=>{
                            this.password = e.target.value
                        }}
                        ref={node => {
                            console.log("node", node)
                            this.passwordInput = node
                        }}
                    />
                </div>
                {this.state.errMeg&&<Alert style={{ marginTop: 20 }} closable message={this.state.errMeg} type="error" />}
                <div style={{ marginTop: 20 }}>
                    <Button loading = {this.state.loading} onClick={this.login} type="primary" block>登陆</Button>
                </div>
            </Modal>
        )
    }
}