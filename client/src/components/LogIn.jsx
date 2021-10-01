import React from "react"

export default class LogIn extends React.Component {
    render() {
        return (
            <div>
                <form action="/api/login" method="post">
                    <label htmlFor="email">Email: </label>
                    <input type="text" name="email" id="email" />
                    <br />
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" />
                    <br />
                    <button type="submit">Log In</button>
                </form>
            </div>
        )
    }
}
