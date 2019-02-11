import React, { Component} from "react"
import { Link} from "react-router-dom";
// import {Button} from 'antd';


import './index.scss'
import home_img from '../../assets/home.svg'
import lingdang_img from '../../assets/lingdang.svg'
import search_img from '../../assets/search.svg'
import Dropdown_menu from '../../components/Dropdown_menu'
export default class Index extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        console.log("componentDidMount")
    }
    navigate=(value)=>{
        console.log("navigate",value)
        
    }
    toArticle=()=>{
        console.log(this.props)
        this.props.history.push("/article")
    }
    toRegister=()=>{
        this.props.history.push("/register")
    }
    render(){
        return(
            <div className="page">
                <div className="container">
                    <header>
                        <div className="titleBar">
                            <div className="titleBar_left">
                                <img style={{ width: "25px", height: "25px", marginRight: "10px" }} src={home_img}></img>
                                <span style={{fontSize:"20px"}}>博客</span>
                            </div>
                            <div className="titleBar_middle">
                                {/* <span>搜索</span> */}
                                <input className="titleBar_input" type="text" placeholder="输入关键词搜索..."/>
                                <div className="titleBar_search">
                                    <img src={search_img} style={{ width: "20px", height: "20px"}}/>
                                </div>
                            </div>
                            <div className="titleBar_login">
                                <img src={lingdang_img} style={{ width: "20px", height: "20px", marginRight: "10px" }}/>
                                <span style={{cursor:"pointer"}}> 登录</span>
                                <span onClick={this.toRegister} style={{marginLeft:"10px",cursor:"pointer"}}> 注册</span>
                            </div>
                           
                            {/* <div className="titleBar_login">
                                <Dropdown_menu style={{height:"100%"}} onClick={this.navigate} menu={["我的主页","设置","退出"]} placement="bottomLeft">
                                    <div className="menu_container menu_hover">
                                        <span>菜单</span>
                                    </div>
                                </Dropdown_menu>
                            </div> */}
                            <div className="editeArtical" onClick={this.toArticle}>
                                <img src={lingdang_img} style={{ width: "20px", height: "20px", marginRight: "10px" }}/>
                                    {/* <Link to="article"> */}
                                        <span> 写文章</span>
                                    {/* </Link>     */}
                            </div>
                        </div>
                    </header>
                    <nav>
                        <div className="navBar">
                            <div className="navBar_home">
                                <span>首页</span>
                            </div>
                            <div className="navBar_classcify">
                                <span>分类</span>
                            </div>
                            <div className="navBar_pages">
                                <span>页面</span>
                            </div>
                        </div>
                    </nav>
                    <section>
                        <div className="signature" >
                            <div><span>标题</span></div>
                            <div className="signText"><span>若多年后无所作为，韶华青春何止辜负丶</span></div>
                        </div>
                    </section>
                    <article>
                        <div className="articalList">
                            <div className="artical">
                                <div className="artical_image"></div>
                            </div>
                        </div>
                    </article>
                </div>
            </div> 
        )
    }
}