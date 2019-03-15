import React, { Component } from "react";
// import axios from "axios";
import { Popover, Button, message } from "antd";

export default class Index extends Component {
  return() {
    <div className="article_list">
      {this.state.articleList &&
        this.state.articleList.map((item, index) => (
          <div
            key={index}
            className="article_item"
            onClick={this.checkArticle.bind(this, item)}
            style={
              this.state.checkedArticle._id === item._id
                ? { backgroundColor: "rgba(0,0,0,0.1)" }
                : null
            }
          >
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
            <div>img</div>
          </div>
        ))}
    </div>;
  }
}
