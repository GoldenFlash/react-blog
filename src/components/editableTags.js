import React, { Component } from "react";

import {
  Tag, Input, Tooltip, Icon,
} from 'antd';

export default class EditableTagGroup extends React.Component {
  constructor(props){
    super(props)
    console.log(this.props.tags)
    this.state = {
      tags: this.props.tags||[],
      inputVisible: false,
      inputValue: '',
      labelsClass: [
        "ant-tag-magenta",
        "ant-tag-blue",
        "ant-tag-red",
        "ant-tag-volcano",
        "ant-tag-orange",
        "ant-tag-gold",
        "ant-tag-lime",
        "ant-tag-green",
        "ant-tag-cyan",
        "ant-tag-geekblue",
        "ant-tag-purple",
        "ant-tag-lime"
      ]
    };
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      tags: nextProps.tags
    })
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.props.onClose(removedTag)
    this.setState({ tags });
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    inputValue&&this.props.onConfirm(inputValue)
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  saveInputRef = input => this.input = input

  render() {
    const { tags, inputVisible, inputValue,labelsClass } = this.state;
    return (
      <div>
        {tags.map((tag, i) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag className={`item ant-tag ${i<12?labelsClass[i]:labelsClass[i-11]}`} key={tag} closable={true} afterClose={() => this.handleClose(tag)} style={{ color: "#999", paddingLeft: 3, paddingRight: 3,height:20,lineHeight:"18px"}}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed', paddingLeft: 3, paddingRight: 3,color:"#999",height:20,lineHeight:"18px"}}
      >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    );
  }
}