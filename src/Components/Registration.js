import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Form from "./Form";
import Header from "./Header";
import { css } from "glamor";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            email: "",
            pass: "",
            registration: false,
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
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();


        let regInfo = {
            email: this.state.email,
            password: this.state.pass,
        }

        axios.post("http://3.120.96.16:3002/register", regInfo)
            .then(() => {
                this.setState({
                    email: "",
                    pass: "",
                    registration: true,
                })
            }).catch((err) => {
                console.error(err.response)
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
        if (this.state.registration) {
            return <Redirect to="/login" />

        }
        return (
            <section>
                <Header token={storageToken}></Header>
                <Form onSubmit={this.onSubmit} valueEmail={this.state.email} valuePass={this.state.pass} onChange={this.onChange} btnValue={"Register"}>{errorMsg}</Form>

            </section>

        )
    }
}


export default Registration;