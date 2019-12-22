import React from "react"
import {connect} from "react-redux"
import { Modal, Input, Button,Icon,Alert} from "antd"
import {login as loginAction} from "@/redux/user/action.js"


class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
    }

    login = () => {
        this.setState({
            loading: true
        })
        var account = this.userNameInput.state.value
        var passWord = this.password
        this.props.dispatch(loginAction(account,passWord)).then(res=>{
             this.props.onOk(false)
             this.setState({
                loading: false
             })
        })
    }

    render() {
        let { onOk, onCancel, modalVisible } = this.props

        return (
            <Modal
                title="登陆"
                centered
                visible={modalVisible}
                onOk={() => onOk(false)}
                onCancel={() => onCancel(false)}
                footer={null}
            >
                <div>
                    <Input
                        placeholder="Enter your username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        size="large"
                        placeholder="user name"

                        ref={node => {
                            this.userNameInput = node
                        }}
                    />
                </div>
                <div style={{ marginTop: 20 }}>
                    <Input.Password
                        placeholder="Enter your password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        size="large"
                        placeholder="password"
                        onChange={(e) => {
                            this.password = e.target.value
                        }}
                        ref={node => {
                            this.passwordInput = node
                        }}
                    />
                </div>
                {this.state.errMeg && <Alert style={{ marginTop: 20 }} closable message={this.state.errMeg} type="error" />}
                <div style={{ marginTop: 20 }}>
                    <Button loading={this.state.loading} onClick={this.login} type="primary" block>登陆</Button>
                </div>
            </Modal>
        )
    }
}


export default connect(state=>{ return state.user })(Login)