import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends Component {
 
  componentDidUpdate(prevProps) {
    // console.log("prevProps", prevProps);
    // console.log("window",document.body.clientWidth);
    
    if (this.props.location.pathname !== prevProps.location.pathname) {
        var dom = document.getElementById("container")
      dom.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }

}
export default withRouter(ScrollToTop)
