import React, { Component, createContext } from "react";

export const AuthContext = createContext({ });
export default class AuthorizationProvider extends Component {
    constructor(props) {
        super(props);
        this.setAuthData = (guildId, authorizationCode) => {
            sessionStorage.setItem("guildId", guildId);
            sessionStorage.setItem("authorizationCode", authorizationCode);
            this.setState({ guildId, authorizationCode });
        }

        this.state = {
            guildId: sessionStorage.getItem("guildId") || "",
            authorizationCode: sessionStorage.getItem("authorizationCode") || "",
            setAuthData: this.setAuthData
        };
    }

    

    render() {
        return (
            <div className='main'>
                <AuthContext.Provider value={this.state}>
                    {this.props.children}
                </AuthContext.Provider>
            </div>
        );
    }
}