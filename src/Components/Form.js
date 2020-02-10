import React from "react";
import { css } from "glamor";

class Form extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let BGstyles = css({
            height: "90vh",
            backgroundColor: "#FCF6F5FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

        })

        let inputStyles = css({
            boxSizing: "border-box",
            backgroundColor: "transparent",
            width: "250px",
            height: "40px",
            borderTopStyle: "hidden",
            borderLeftStyle: "hidden",
            borderRightStyle: "hidden",
            borderBottom: "3px solid #636b63",
            marginBottom: "15px",
            padding: "4px",
            color: "black",

            ":focus": {
                outline: "none",

            },

        })
        let btnStyles = css({
            boxSizing: "border-box",
            width: "250px",
            height: "40px",
            backgroundColor: "#2BAE66FF",
            border: "1px solid #514F5E",
            color: "#F9F9F9",
            borderRadius: "4px",

            ":hover": {
                opacity: "0.5",
                cursor: "pointer",
            }
        })

        let formCont = css({
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            color: "#F9F9F9",
        })

        const title = css({
            color: "#636b63",
        })


        return (
            <div {...BGstyles} className="bg-standard">
                <div {...formCont} className="form-cont">
                    <h1 {...title}>{this.props.btnValue}</h1>
                    <form onSubmit={this.props.onSubmit} action="">
                        <input {...inputStyles} onChange={this.props.onChange} value={this.props.valueEmail} type="text" name="email" id="email" placeholder="Email" /><br />
                        <input {...inputStyles} onChange={this.props.onChange} value={this.props.valuePass} type="password" name="pass" id="pass" placeholder="Password" /><br />
                        <input {...btnStyles} type="submit" value={this.props.btnValue} />
                    </form>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Form;