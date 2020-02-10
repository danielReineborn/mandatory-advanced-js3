import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Form from "./Form";
import { updateToken, token$ } from "./Store";
import Header from "./Header";
import { css } from "glamor";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            email: "",
            pass: "",
            error: "",
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        let token = localStorage.getItem("token");
        this.setState({
            token,
        })
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    onSubmit(e) {
        e.preventDefault();

        let logInfo = {
            email: this.state.email,
            password: this.state.pass,
        }

        axios.post("http://3.120.96.16:3002/auth", logInfo)
            .then((response) => {
                let token = response.data.token;
                updateToken(token);
                localStorage.setItem("token", token$.value);
                return token;
            }).then((token) => {
                this.setState({
                    token,
                })
            }).catch((err) => {
                this.setState({
                    error: err.response.data.message,
                })
            })
    }

    render() {
        let errorStyle = css({
            color: "#7a0f0f",
        })
        let errorMsg = null;
        this.state.error ? errorMsg = <h3 {...errorStyle}>Error: {this.state.error}</h3> : errorMsg = null;
        let storageToken = localStorage.getItem("token");
        if (storageToken) {
            return <Redirect to="/" />;
        }
        return (
            <section>
                <Header token={localStorage.getItem("token")}></Header>
                <Form onSubmit={this.onSubmit} onChange={this.onChange} btnValue={"Login"}>{errorMsg}</Form>
            </section>
        )
    }
}

export default Login;