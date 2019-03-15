import React, { Component } from "react";
// import axios from "axios";
import { Popover, Button, message } from "antd";

class CollectionList extends Component {
    return () {
        <div className="item_c">
              {this.state.collections.map((item, index) => {
                return (
                  <div
                    onClick={this.checkeCollection.bind(this, item)}
                    key={index}
                    className="item"
                    style={
                      this.state.checkedCollection&&this.state.checkedCollection._id === item._id
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
                );
              })}
            </div>
    }
}