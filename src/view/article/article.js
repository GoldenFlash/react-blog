import React, { Component } from "react"
import './article.scss'
import add_img from '../../assets/new.svg'
import page_img from '../../assets/page.svg'
export default class article extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addNewCollectedWorks:false,
            collectionTitle:"",
            collectedWorks: [
                {
                    title: "日记本",
                },
                {
                    title: "随笔",
                }
            ],
            articleList: [
                {
                    title: "2019-1-28"
                }
            ],

        }
    }
    componentDidMount() {
        window.$('#summernote').summernote();
    }
    toggleCollectedWorks(){
        // var collectedWorks = this.state.collectedWorks
        this.setState({
            addNewCollectedWorks:!this.state.addNewCollectedWorks
        })
    }
    addNewArticle(){
        var articleList = this.state.articleList
        var date = new Date()
        var today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        console.log("date",date)
        articleList.push({
            title:today
        })
        this.setState({
            articleList:articleList
        })
    }
    addNewCollectedWorks(){
         var collectedWorks = this.state.collectedWorks
         collectedWorks.push({
             title:this.state.collectionTitle
         })
         console.log("collectedWorks",collectedWorks)
         this.setState({
             collectedWorks:collectedWorks
         })
        this.toggleCollectedWorks()
    }
    render() {
        return (
            <div className="container_article">
                <div className="article">
                    <div className="sideNav">
                        <div className="toHome"><span>回首页</span></div>
                        <div className="new" onClick={this.toggleCollectedWorks.bind(this)}><span>+新建文集</span></div>
                        {this.state.addNewCollectedWorks&&
                            <div className="editeCollection">
                                <input onInput={(e)=>{
                                    console.log(e.target.value)
                                    this.setState({
                                        collectionTitle:e.target.value
                                    })
                                }} autoFocus style={{width:"100%",height:"30px",border:"none",backgroundColor:"#595959"}} type="text" placeholder="请输入文集名..."/>
                                <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",marginTop:"15px"}}>
                                    <div className="submit" onClick={this.addNewCollectedWorks.bind(this)}>提交</div>
                                    <div className="cancel" onClick={this.toggleCollectedWorks.bind(this)}>取消</div>
                                </div>
                            </div>
                        }
                        
                        <div className="item_c">
                            {this.state.collectedWorks.map((item,index) => {
                                return (
                                    <div key={index} className="item"><span>{item.title}</span></div>
                                )
                            })}


                        </div>

                    </div>
                    <div className="list">
                        <div className="addNewArticle" onClick={this.addNewArticle.bind(this)}>
                            <img style={{ width: "15px", height: "15px", marginRight: "10px" }} src={add_img} alt="" />
                            <span>新建文章</span>
                        </div>
                        <div className="article_list">
                            {
                                this.state.articleList.map((item,index)=>
                                    <div key={index} className="article_item">
                                        <img style={{width:"20px",height:"20px",marginRight:"10px"}} src={page_img} alt=""/>
                                        <span>{item.title}</span>
                                    </div> 
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="summernote">
                    <div id="summernote" ></div>
                </div>
            </div>

        )
    }
}