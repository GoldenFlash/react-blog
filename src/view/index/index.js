import React, { Component} from "react"
import './index.scss'
import home_img from '../../assets/home.svg'
import lingdang_img from '../../assets/lingdang.svg'
import search_img from '../../assets/search.svg'
export default class Index extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        console.log("componentDidMount")
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
                            <div className="titleBar_right">
                                <img src={lingdang_img} style={{ width: "20px", height: "20px", marginRight: "10px" }}/>
                                <spam> 登录</spam>
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
                    <artical>
                        <div>文章</div>
                    </artical>
                </div>
            </div> 
        )
    }
}