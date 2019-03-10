import React,{Component} from 'react'
import { Menu, Dropdown } from 'antd';

export default class Dropdown_menu extends Component{
    // constructor(props){
    //     super(props)
    // }
    componentWillMount(){

    }
    componetnDidMount(){

    }
    handleClick=(e)=>{
        this.props.onClick(e.item.props.children)
    }
    renderMenuList(menuList=[]){
        return(
            <div>
                <Menu  onClick={this.handleClick}>
                    {
                        menuList.map((item,index)=>{
                            return(
                                <Menu.Item key={index}>{item}</Menu.Item>
                            )
                        })
                    }
                </Menu>
            </div> 
        )        
    }
    render(){
        let {placement,menu,children,style} = this.props
        console.log("props",this.props)
        var menuList = this.renderMenuList(menu)
        return(
            <div style={style}>
                <Dropdown overlay={menuList} placement={placement?placement:"bottomLeft"}>
                    <div style={{cursor:"pointer",height:"100%",width:"100%",display:"flex",alignItems:"center"}}>{children}</div>
                </Dropdown>
            </div>
        )
    
    }
}
