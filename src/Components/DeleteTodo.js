import React from "react";
import Axios from "axios";
import { token$ } from "./Store";
import { DeleteForever } from "@material-ui/icons"
import { css } from "glamor";

const API_ROOT = "http://3.120.96.16:3002";
class DeleteTodo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            token: token$.value,
        }
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        this.subscription = token$.subscribe(token => {
            this.setState({ token });
        });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();

    }

    onClick() {
        Axios.delete(API_ROOT + "/todos/" + this.props.id, {
            headers: {
                Authorization: "Bearer " + this.state.token,
            }
        }).then(() => {
            this.props.update(this.state.token);
        });
    }


    render() {

        const dltStyle = css({
            color: "#3f3f3f",
            fontSize: "24px",
            ":hover": {
                cursor: "pointer",
                opacity: "0.5",

            }
        })
        return (
            <DeleteForever {...dltStyle} onClick={this.onClick}></DeleteForever>
        )

    }
}

export default DeleteTodo;