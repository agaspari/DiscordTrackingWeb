import React from 'react';
import Select from 'react-select';

export default class UserDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        fetch (`${window.location.protocol}//${window.location.hostname}:4000/api/users?guildId=${'518686827096440832'}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            const users = data.map(datum => {
                return {
                    'value': datum.userId,
                    'label': datum.nickname
                };
            }).filter(datum => datum.nickname);

            console.log(users);
            this.setState({ users });
        });
    }

    render() {
        const { users } = this.state;

        return (
            <div className="user-select">
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    name="users"
                    options={users}
                    onChange={(e) => { window.location.href = `/user/${'518686827096440832'}/${e.value}`}}
                />
            </div>
        );
    }
}