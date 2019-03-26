import React, { Component } from "react";
import { Popover, Button, message, Empty, Popconfirm } from "antd";
import EditableTagGroup from "../../components/editableTags"
import "./edite.scss";
import api from "../../api/api";
import add_img from "../../assets/new.svg";
import page_img from "../../assets/page.svg";
import set_img from "../../assets/set.svg";
import edite_img from "../../assets/edite.svg";
import delete_img from "../../assets/delete.svg";
import delete2_img from "../../assets/delete2.svg";

export default class Edite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedCollection: "",
      PopoverShow: true,
      addNewCollections: false,
      collectionTitle: "",
      collections: [],
      checkedArticle: {},
      articleList: [
        {
          title: "2019-1-28"
        }
      ]
    };
  }
  componentDidMount() {
    this.getCollections().then(res => {
      this.setState({
        collections: res.data,
        checkedCollection: res.data[0]
      });
      this.getArticleList(res.data[0]._id);
    });
  }
  initEditor() {
    this.testEditor = window.editormd("editormd_container", {
      // path: "/blog/lib/editor.md-master/lib/",
      path: "/lib/editor.md-master/lib/",
      width: "100%",
      height: "100%",
      syncScrolling: "single",
      saveHTMLToTextarea: true
    });
  }
  cancel() {
    var index = this.state.editeCollection_index;
    if (index || index === 0) {
      this.setState({
        ["showEditeMenu" + index]: false
      });
    }
  }
  toggleCollections() {
    this.setState({
      addNewCollections: !this.state.addNewCollections
    });
  }
  toHome() {
    console.log(this.props.history);
    this.props.history.replace("/");
  }
  showEditeMenu(e, item, index) {
    e.stopPropagation();
    console.log(index);
    var oldIndex = this.state.editeCollection_index;
    if (oldIndex !== index) {
      this.setState({
        ["showEditeMenu" + index]: true,
        ["showEditeMenu" + oldIndex]: false,
        editeCollection: item,
        editeCollection_index: index
      });
    } else {
      this.setState({
        ["showEditeMenu" + index]: true,
        editeCollection: item,
        editeCollection_index: index
      });
    }
  }
  checkeCollection(collection) {
    if(collection._id===this.state.checkedCollection._id){
      return
    }
    this.getArticleList(collection._id);
    this.setState({
      checkedCollection: collection
    });
    
  }
  checkArticle(checkedArticle) {
        if (this.state.checkedArticle._id===checkedArticle._id){
      return
    }
    this.setState(
      {
        checkedArticle: checkedArticle
      },
      () => {
        this.initEditor();
      }
    );
  }
  addNewCollections() {
    this.toggleCollections();
    api
      .post("article/addCollections", { title: this.state.collectionTitle })
      .then(res => {
        console.log(res);
        if (!res.err) {
          var collections = this.state.collections
            ? this.state.collections
            : [];
          collections.push(res.data);
          console.log("collections", collections);
          this.setState({
            collections: collections
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  getCollections() {
    return api
      .post("article/getCollections")
      .then(res => {
        console.log("res", res);
        return res;
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteCollection() {
    api
      .post("article/deleteCollection", {
        id: this.state.editeCollection._id
      })
      .then(res => {
        if (res.err === "offLine") {
          this.props.history.push("/register", { type: "login" });
        } else if (res.data) {
          console.log(res);
          var index = this.state.editeCollection_index;
          var collections = this.state.collections;
          collections.splice(index, 1);
          this.setState({
            collections: collections,
            ["showEditeMenu" + index]: false
          });
        }
      });
  }

  getArticleList(collectionId) {
    api
      .post("article/getArticleList", { collectionId: collectionId })
      .then(res => {
        console.log(11111, res);
        this.setState(
          {
            checkedArticle: res.data[0],
            articleList: res.data
          },
          () => {
            this.initEditor();
          }
        );
      });
  }
  addNewArticle() {
    var articleList = this.state.articleList ? this.state.articleList : [];
    var date = new Date();
    var today = `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}`;
    api
      .post("article/addNewArticle", {
        collectionId: this.state.checkedCollection._id,
        title: today,
        content: "",
        isPublish: false
      })
      .then(res => {
        console.log(res);
        if (res.data) {
          articleList.push(res.data);
          this.setState({
            articleList: articleList,
            checkedArticle: articleList[0]
          },()=>{
              if (articleList.length=1){
                this.initEditor();
              }
          });
        }
      });
  }
  saveArticle() {
    var article = this.state.checkedArticle;

    var content = this.testEditor.getMarkdown();

    api
      .post("article/saveArticle", {
        id: article._id,
        collectionId: article.collectionId,
        title: article.title,
        content: content
      })
      .then(res => {
        console.log("res", res);
        if (res.err) {
          message.error("保存失败");
        } else {
          message.success("保存成功");
        }
      });
  }
  deleteArticle(article,index){
    // console.log(id,index)
    api.post("article/deleteArticle",{
      id:article._id,
      collectionId:article.collectionId
    }).then((res)=>{
        var articleList = this.state.articleList
        articleList.splice(index,1)
        this.setState({
          articleList:articleList
        })
    })
  }
  publishArticle() {
    var article = this.state.checkedArticle;
    var content = this.testEditor.getMarkdown();

    api
      .post("article/publishArticle", {
        id: article._id,
        collectionId: article.collectionId,
        title: article.title,
        content: content
      })
      .then(res => {
        if (res.err) {
          message.error("发布失败");
        } else {
          message.success("发布成功");
        }
      });
  }
  updateTags = (tag,article,type)=>{
    console.log(tag, article)
    api.post("tags/updateTags",{
      id:article._id,
      collectionId:article.collectionId,
      title: tag,
      type:type
    })
  }
  renderPopoverContent() {
    return (
      <div>
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <img
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
  renderarticle(item,index){
    console.log(item.tags);
    
    return(
      <div
        key={index}
        className="article_item"
        style={
          this.state.checkedArticle._id === item._id
            ? { backgroundColor: "rgba(0,0,0,0.1)" }
            : null
        }
      >
        <div onClick={this.checkArticle.bind(this, item)} style={{ display: "flex", flexDirection: "column",flex:1}}>
            <div style={{flex:1,paddingBottom:10}} >
              <img
              style={{
                width: "20px",
                height: "20px",
                marginRight:5
              }}
              src={page_img}
              alt=""
            />
            <span>{item.title}</span>
          </div>
          <div className="tags">
            <span style={{ marginRight: 3 }}>标签：</span>
            <div style={{ flex: 1 }}>
           
              <EditableTagGroup 
                onConfirm={(newTags) => { this.updateTags(newTags, item,"add") }} 
                onClose={(tag)=>{
                  this.updateTags(tag, item, "delete")
                }}
                tags={item.tags||[]}
              >
              </EditableTagGroup>
            </div>  
          </div>
          
        </div>
        <div style={{ display: "flex",alignItems:"center" }}>
          <Popconfirm title="点击确定删除文章.............." onConfirm={this.deleteArticle.bind(this, item, index)}  okText="确定" cancelText="取消">
              <img style={{
              width: "20px",
              height: "20px",
              marginRight: "10px"
            }} src={delete2_img} alt="" />
          </Popconfirm>
          
        </div>
      </div>
    )
  }
  rendercollection(item,index){
    return(
      <div
          onClick={this.checkeCollection.bind(this, item)}
          key={index}
          className="item"
          style={
            this.state.checkedCollection &&
            this.state.checkedCollection._id === item._id
              ? { backgroundColor: "rgba(255,255,255,0.5)" }
              : null
          }
        >
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
    )
  }
  renderEditor() {
    return (
      <div className="summernote">
        <div className="title">
          <input

            onInput={e => {
              console.log(e.target.value);
              var checkedArticle = this.state.checkedArticle;
              checkedArticle.title = e.target.value;
              this.setState({
                checkedArticle: checkedArticle
              });
            }}
            className="title_input"
            value={
              this.state.checkedArticle ? this.state.checkedArticle.title : ""
            }
            type="text"
          />
          <div className="publish">
            <Button onClick={this.saveArticle.bind(this)}>保存</Button>
            <Button
              onClick={this.publishArticle.bind(this)}
              style={{ marginLeft: 10 }}
            >
              发布
            </Button>
          </div>
        </div>
        <div style={{ flex: 1 }} id="editormd_container">
          <textarea
            value={
              this.state.checkedArticle ? this.state.checkedArticle.content : ""
            }
          />
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="container_article" onClick={this.cancel.bind(this)}>
        <div className="article">
          <div className="sideNav">
            <div className="toHome" onClick={this.toHome.bind(this)}>
              <span>返回首页</span>
            </div>
            <div className="new" onClick={this.toggleCollections.bind(this)}>
              <span>+新建文集</span>
            </div>
            {this.state.addNewCollections && (
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
                    onClick={this.addNewCollections.bind(this)}
                  >
                    提交
                  </div>
                  <div
                    className="cancel"
                    onClick={this.toggleCollections.bind(this)}
                  >
                    取消
                  </div>
                </div>
              </div>
            )}
            <div className="item_c">
              {this.state.collections.map((item, index) => this.rendercollection(item,index))}
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
              {this.state.articleList.length>0&&
                this.state.articleList.map((item, index) =>this.renderarticle(item,index))}
            </div>

          </div>
        </div>
        <div className="editor">
          {this.state.checkedArticle?
            this.renderEditor():
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",borderLeft:"solid #dddddd 1px",height:"100%"}}> 
              <Empty
                description={
                  <span>
                    空空如也
                  </span>
                }
              ></Empty>
            </div> }
        </div>
          
      </div>
    );
  }
}
