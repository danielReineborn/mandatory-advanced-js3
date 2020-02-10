import React from "react";
import jwt from "jsonwebtoken";
import { Link } from "react-router-dom";
import { updateToken } from "./Store";
import { css } from "glamor";


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            decodedEmail: "",
            tokenTime: 0,
        }
        this.logOut = this.logOut.bind(this);

    }

    componentDidMount() {
        if (this.props.token) {
            let decoded = jwt.decode(this.props.token);
            this.setState({
                decodedEmail: decoded.email,
            })
        }
    }
    logOut() {
        updateToken(null);
        this.setState({
            token: null,
        })
    }


    render() {

        const headerStyle = css({
            backgroundColor: "#2BAE66FF",
            color: "#FCF6F5FF",
            height: "10vh",
            display: "flex",
            justifyContent: "space-between",
        })

        let btnStyles = css({
            boxSizing: "border-box",
            width: "100px",
            height: "25px",
            backgroundColor: "#FCF6F5FF",
            border: "1px solid #514F5E",
            color: "#636b63",
            borderRadius: "4px",
            margin: "3px",

            ":hover": {
                opacity: "0.5",
                cursor: "pointer",
            }
        })
        const flexCont = css({
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
            margin: "5px",
        })

        const logInfo = css({
            display: "flex",
            flexFlow: "column",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            margin: "0px",
        })

        const flexItems = css({
            margin: "3px",
            padding: "2px",
        })

        let loggedIn = null;
        if (this.state.decodedEmail) {
            loggedIn = <div {...logInfo}>
                <p {...flexItems}>Logged in as: {this.state.decodedEmail}</p>
                <button {...flexItems} {...btnStyles} onClick={this.logOut}>Sign out</button>

            </div>
        } else {
            loggedIn = <p>Currently not logged in.</p>

        }
        return (
            <nav {...headerStyle}>
                <div {...flexCont}>
                    <Link to="/register"><button {...btnStyles}>Register</button></Link>
                    <Link to="/login"><button {...btnStyles}>Login</button></Link>
                </div>
                <div>
                    {loggedIn}
                </div>
            </nav>
        )
    }
}

export default Header;