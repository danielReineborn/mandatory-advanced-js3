import React from "react";
import { css } from "glamor";

class ListItem extends React.Component {

    shouldComponentUpdate(nextProps) {
        return (
            this.props.id !== nextProps.id
        )
    }

    render() {
        const listStyle = css({
            borderLeft: "4px solid #2BAE66FF",
            height: "45px",
            width: "325px",
            margin: "16px",
            padding: "6px",
            backgroundColor: "#e0f9ec",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Roboto, sans-serif",
            fontSize: "18px",
            color: "#3f3f3f",

        })
        return (
            <p id={this.props.id} {...listStyle}> {this.props.children}</p >
        )
    }
}

export default ListItem;