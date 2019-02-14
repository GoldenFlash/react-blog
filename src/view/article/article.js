import React, { Component } from "react";
import axios from "axios";
import { Popover, Button } from "antd";

import "./article.scss";
import api from "../../api/api";
import add_img from "../../assets/new.svg";
import page_img from "../../assets/page.svg";
import set_img from "../../assets/set.svg";
import edite_img from "../../assets/edite.svg";
import delete_img from "../../assets/delete.svg";



export default class article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedCollection:"",
      PopoverShow: true,
      addNewCollectedWorks: false,
      collectionTitle: "",
      collectedWorks: [],
      articleList: [
        {
          title: "2019-1-28"
        }
      ]
    };
  }
  componentDidMount() {
    console.log("231231",window.editormd)
    // window.$("#summernote").summernote();
    var editor = window.editormd("editormd_container", {
        path: '../../lib/editor.md-master/lib/',
        width   : "100%",
        height  :"100%",
        syncScrolling : "single",
        saveHTMLToTextarea : true,
        // imageUpload : true,
        // imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        // imageUploadURL : "/smart-api/upload/editormdPic/",//注意你后端的上传图片服务地址
    });
    this.getCollectedWorks();
  }
  cancel() {
    var index = this.state.editeCollection_index;
    // console.log("cancel");
    if (index || index === 0) {
      this.setState({
        ["showEditeMenu" + index]: false
      });
    }
  }
  toggleCollectedWorks() {
    // var collectedWorks = this.state.collectedWorks
    this.setState({
      addNewCollectedWorks: !this.state.addNewCollectedWorks
    });
  }
  addNewArticle() {
    var articleList = this.state.articleList;
    var date = new Date();
    var today = `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}`;
    console.log("date", date);
    articleList.push({
      title: today
    });
    this.setState({
      articleList: articleList
    });
  }
  addNewCollectedWorks() {
    this.toggleCollectedWorks();
    api
      .post("/addCollections", { id: "1", title: this.state.collectionTitle })
      .then(res => {
        console.log(res);
        if (!res.err) {
          this.setState({
            collectedWorks: res.data
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  getCollectedWorks() {
    api
      .get("/getCollections")
      .then(res => {
        console.log("res", res);
        this.setState({
          collectedWorks: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  showEditeMenu(e, item, index) {
    e.stopPropagation();
    console.log(index);
    var oldIndex = this.state.editeCollection_index;
    if (oldIndex !== index) {
      this.setState(
        {
          ["showEditeMenu" + index]: true,
          ["showEditeMenu" + oldIndex]: false,
          editeCollection: item,
          editeCollection_index: index
        }
      );
    }else{
        this.setState(
        {
          ["showEditeMenu" + index]: true,
          editeCollection: item,
          editeCollection_index: index
        }
      );
    }
  }
  deleteCollection() {
    api
      .post("/deleteCollection", {
        id:this.state.editeCollection._id
      })
      .then(res => {
        if(res.err=="offLine"){
          this.props.history.push("/register",{type:"login"})
        }else if(res.data){
          console.log(res);
          var index = this.state.editeCollection_index;
          this.setState({
            collectedWorks: res.data,
            ["showEditeMenu" + index]: false
          });
        }
      });
  }
  checkeCollection(collection){
    this.setState({
      checkedCollection:collection
    })
    api.post("/getArticleList",{id:collection._id}).then(res=>{
      console.log(res)
    })
  }
  renderPopoverContent() {
    return (
      <div>
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <img
            // onClick={this.showEditeMenu.bind(this)}
            style={{
              width: "15px",
              height: "15px",
              marginRight: "10px"
            }}
            src={edite_img}
            alt=""
          />
          <span>修改文集</span>
        </div>
        <div
          onClick={this.deleteCollection.bind(this)}
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <img
            // onClick={this.showEditeMenu.bind(this)}
            style={{
              width: "15px",
              height: "15px",
              marginRight: "10px"
            }}
            src={delete_img}
            alt=""
          />
          <span>删除文集</span>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="container_article" onClick={this.cancel.bind(this)}>
        <div className="article">
          <div className="sideNav">
            <div className="toHome">
              <span>回首页</span>
            </div>
            <div className="new" onClick={this.toggleCollectedWorks.bind(this)}>
              <span>+新建文集</span>
            </div>
            {this.state.addNewCollectedWorks && (
              <div className="editeCollection">
                <input
                  onInput={e => {
                    console.log(e.target.value);
                    this.setState({
                      collectionTitle: e.target.value
                    });
                  }}
                  autoFocus
                  style={{
                    width: "100%",
                    height: "30px",
                    border: "none",
                    backgroundColor: "#595959"
                  }}
                  type="text"
                  placeholder="请输入文集名..."
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginTop: "15px"
                  }}
                >
                  <div
                    className="submit"
                    onClick={this.addNewCollectedWorks.bind(this)}
                  >
                    提交
                  </div>
                  <div
                    className="cancel"
                    onClick={this.toggleCollectedWorks.bind(this)}
                  >
                    取消
                  </div>
                </div>
              </div>
            )}

            <div className="item_c">
              {this.state.collectedWorks.map((item, index) => {
                return (
                  <div onClick={this.checkeCollection.bind(this,item)} key={index} className="item" style={this.state.checkedCollection._id===item._id?{backgroundColor:"rgba(255,255,255,0.5)"}:null}>
                    <span>{item.title}</span>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end"
                      }}
                    >
                      <Popover
                        placement="bottomRight"
                        content={this.renderPopoverContent()}
                        title="编辑"
                        trigger="click"
                        visible={
                          this.state["showEditeMenu" + index] ? true : false
                        }
                      >
                        <img
                          onClick={e => {
                            this.showEditeMenu(e, item, index);
                          }}
                          style={{
                            width: "15px",
                            height: "15px",
                            marginRight: "10px"
                          }}
                          src={set_img}
                          alt=""
                        />
                      </Popover>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="list">
            <div
              className="addNewArticle"
              onClick={this.addNewArticle.bind(this)}
            >
              <img
                style={{ width: "15px", height: "15px", marginRight: "10px" }}
                src={add_img}
                alt=""
              />
              <span>新建文章</span>
            </div>
            <div className="article_list">
              {this.state.articleList.map((item, index) => (
                <div key={index} className="article_item">
                  <img
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "10px"
                    }}
                    src={page_img}
                    alt=""
                  />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="summernote">
          <div id="editormd_container">
            <textarea style={{display:"none"}}>### Hello Editor.md !</textarea>
          </div>
        </div>
      </div>
    );
  }
}
