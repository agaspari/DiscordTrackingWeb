import React from 'react';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import { history } from "../AppRouter";

class UserDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        const { guildId, authorizationCode } = this.props;

        fetch (`${window.location.protocol}//${window.location.hostname}:4000/api/users?guildId=${guildId}&authorizationCode=${authorizationCode}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            const users = data
                .filter(datum => datum.nickname)
                .map(datum => {
                return {
                    'value': datum.userId,
                    'label': datum.nickname
                };
            });

            console.log(users);
            this.setState({ users });
        });
    }

    render() {
        const { users } = this.state;
        const { guildId } = this.props;

        return (
            <div className="user-select">
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    name="users"
                    options={users}
                    onChange={(e) => { history.push(`/user/${guildId}/${e.value}`) }}
                />
            </div>
        );
    }
}

export default withRouter (UserDropdown);