import React from "react";
import MessageTrendUser from '../charts/MessageTrendUser';
import { AuthContext } from "../providers/AuthorizationProvider";

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {}
        }
    }

    static contextType = AuthContext;

    componentDidMount() {
        const { userId } = this.props.match.params;

        fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/users/${userId}?guildId=${'518686827096440832'}`, {
            method: "GET",
        })
        .then(res => res.json())
        .then(userData => {
            this.setState({ userData });
        });
    }

    render() {
        const { userId } = this.props.match.params;
        const { userData } = this.state;
        const { guildId, authorizationCode } = this.context;

        return (
            <div>
                <div>
                    <h1>{userData.nickname}</h1>
                    <p>Account Created: {userData.age}</p>
                </div>
                <div>
                    <MessageTrendUser
                        userId={userId}
                        guildId={guildId}
                        authorizationCode={authorizationCode}
                    />
                </div>
            </div>
        ); 
    }
}