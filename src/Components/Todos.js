import React from "react";
import { token$, updateToken } from "./Store";
import { Redirect } from "react-router-dom";
import axios from "axios";
import DeleteTodo from "./DeleteTodo";
import Header from "./Header";
import ListItem from "./ListItem";
import { css } from "glamor";

const API_ROOT = "http://3.120.96.16:3002";


class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: token$.value,
            todos: [],
            newTodo: "",
            email: "",

        }

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchTodos = this.fetchTodos.bind(this);
    }

    componentDidMount() {
        this.subscription = token$.subscribe(token => {
            this.setState({ token });
        });

        this.fetchTodos(token$.value);
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    fetchTodos(token) {
        axios.get(API_ROOT + "/todos", {
            headers: {
                Authorization: "Bearer " + token,
            }
        }).then((response) => {
            let todos = response.data.todos;
            this.setState({
                todos,
            })
        }).catch((err) => {

            console.error(`Error ${err.response.status}: ${err.response.data.message}`);
            updateToken(null);
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.post(API_ROOT + "/todos", {
            content: this.state.newTodo,
        }, {
            headers: {
                Authorization: "Bearer " + token$.value,
            }
        }).then((response) => {
            this.setState({
                todos: [...this.state.todos, response.data.todo],
            });
        })
            .catch((err) => {
                console.error(err.response);
                updateToken(null);

            })

        this.setState({
            newTodo: "",
        })
    }

    deleteTodo(id) {
        this.setState({
            todos: this.state.todos.filter(t => t.id !== id)
        });
    }

    render() {

        const flexCont = css({
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
        })

        const bgStyle = css({
            backgroundColor: "#FCF6F5FF",
            height: "100%",
        })

        const inputStyle = css({
            width: "375px",
            height: "45px",
            margin: "16px",
            fontSize: "18px",
            border: "2px solid #2BAE66FF",
            padding: "4px",
            ":focus": {
                outline: "none",
            }
        })

        if (!this.state.token) { //state.token is from Store.js and if token is out of time -> null and redirects.
            return <Redirect to="/login" />
        }
        return (
            <section {...bgStyle}>
                <Header token={this.state.token}></Header>

                <div {...flexCont}>
                    <form autoComplete="off" onSubmit={this.handleSubmit} action="">
                        <input value={this.state.newTodo}
                            {...inputStyle}
                            onChange={this.onChange}
                            type="text" name="newTodo"
                            id="todo"
                            placeholder="Todo"
                        />

                    </form>
                    {this.state.todos.map((x) => {
                        return <ListItem id={x.id} key={x.id}>{x.content} <DeleteTodo update={() => this.deleteTodo(x.id)} id={x.id}></DeleteTodo></ListItem>
                    })}
                </div>
            </section>
        )
    }
}

export default Todos;