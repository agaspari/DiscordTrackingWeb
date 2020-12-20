import React from "react";
import { AuthContext } from "../providers/AuthorizationProvider";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guildId: "",
            authorizationId: "",
            error: ""
        }
    }

    static contextType = AuthContext;

    inputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    showError = (error) => {
        this.setState({ error }, () => {
            setTimeout(() => {
                this.setState({ error: "" });
            }, 2000);
        })
    }
    validateAuthorization = () => {
        const { guildId, authorizationId } = this.state;

        fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/authorization/${guildId}/${authorizationId}`, {
            method: "GET"
        })
        .then(data => { 
            if (data.status === 200) {
                return data.json();
            } else {
                this.showError("Invalid Authorization for Provided Guild");
                return undefined;
            }
        })
        .then(json => {
            if (json) {
                this.context.setAuthData(guildId, authorizationId);
                this.props.history.push(`/guild/${guildId}`);
            }
        });
    }

    render() {
        const { guildId, authorizationId, error } = this.state;

        return (
            <div>
                <h1>Insert Credentials</h1>
                <div>
                    <label htmlFor="guildId">Guild ID</label><br/>
                    <input name="guildId" value={guildId} onChange={this.inputChange}/><br/><br/>
                    <label htmlFor="authorizationId">Authorization Id</label><br/>
                    <input name="authorizationId" value={authorizationId} onChange={this.inputChange}/><br/><br/>
                    <button onClick={this.validateAuthorization}>Load Guild</button><br/><br/>
                    {error && (
                        <span style={{ color: "red" }}>{error}</span>
                    )}
                </div>
            </div>
        ); 
    }
}