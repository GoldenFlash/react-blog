import React, { Component} from "react"
import './index.scss'
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
                                <span>博客</span>
                            </div>
                            <div className="titleBar_middle">
                                <span>搜索</span>
                            </div>
                            <div className="titleBar_right">
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