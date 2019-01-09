import React, { Component} from "react"
// import './index.scss'
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
                            <div className="titleBar_left"></div>
                            <div className="titleBar_middle"></div>
                            <div className="titleBar_right"></div>
                        </div>
                    </header>
                </div>
            </div> 
        )
    }
}