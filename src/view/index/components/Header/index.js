import React from "react"
import { Link } from "react-router-dom"
import { Menu, Icon, Avatar, Modal, Input, Button, Dropdown, Alert} from "antd"
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
            userInfo:{},
            modalVisible: false,
            login:false
        }
    }
    componentDidMount(){
        this.checkLogin()
    }
    checkLogin(){
        if (document.cookie) {
            var userInfo = {}
            var cookies = document.cookie.split(";")

            cookies.forEach((item) => {
                var arr = item.split("=")
                userInfo[arr[0].trim()] = arr[1]
            })
            console.log("userInfo",userInfo) 
            window.userInfo = userInfo
            this.setState({
                userInfo: userInfo,
                login: true
            })
            // return true
           
        }
    }
    modalCancel = (isVisibal) => {
        this.setState({
            modalVisible: isVisibal
        })
    }
    modalConfirm = (isVisibal,userInfo) => {
        this.setState({
            modalVisible: isVisibal,
            login:true,
            userInfo:userInfo
        })
    }
    logOut=()=>{
        api.post("users/logout").then(res => {
            if(!res.err){
                this.setState({
                    login: false,
                    userInfo:{}
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
            <header className="header">
                <Login modalVisible={this.state.modalVisible} onOk={this.modalConfirm} onCancel={this.modalCancel}></Login>
                <div className="titleBar">
                    <div className="titleBar_left">
                        <Link className="link" to="/home">
                            <Icon type="home" size="large" style={{ color: "#333", marginRight: 5,fontSize:20}} />

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

                    <div style={{fontSize:13,flex: 1, display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                        <div>
                            <Link className="link" to="/home">
                                <Icon type="home" style={{ color: "#333", marginRight: 5 }} />
                                <span>首页</span>
                            </Link>
                        </div>
                        <div>
                            <Link className="link" to="/home/archive">
                                <img style={{ width: "15px", height: "15px",marginRight:5}} src={archiveDark_img} alt="" />
                                <span>归档</span>
                            </Link>
                        </div>
                        <div>
                            <Link className="link" to="/home">
                                <Icon type="user" style={{ color: "#333", marginRight: 5 }} />
                                <span>关于</span>
                            </Link>
                        </div>
                        {
                            (this.state.userInfo.auth==="0"||this.state.userInfo.auth==="1")&&
                            <div>
                                <Link className="link" to="/edite">
                                    <Icon type="edit" style={{ color: "#333", marginRight: 5}} />
                                    <span>写文章</span>
                                </Link>
                            </div>
 
                        }
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

    constructor(props){
        super(props)
        this.state = { 
            loading:false,
            
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
            if(res.err){
                var errMeg = res.message
            }
            this.setState({
                loading: false,
                errMeg: errMeg
            }, () => {
                if(!res.err){
                    this.props.onOk(false,res.data)
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