import React from "react";
import MessageTrendUser from '../charts/MessageTrendUser';

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
       
    }

    render() {
        const { userId } = this.props.match.params;

        return (
            <div>
                <MessageTrendUser
                    userId={userId}
                />
            </div>
        ); 
    }
}