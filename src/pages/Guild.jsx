import React from "react";
import TimeTotalUsers from '../charts/TimeTotalUsers';
import MessageTotalUsers from '../charts/MessageTotalUsers';
import MessageTrendUsers from '../charts/MessageTrendUsers';
import UserDropdown from '../components/UserDropdown';
import GuildActivity from "../charts/GuildActivity";
import { AuthContext } from "../providers/AuthorizationProvider";

export default class Guild extends React.Component {
    constructor(props) {
        super(props);
        const start = new Date();
        start.setDate(start.getDate() - 7);

        this.state = {
            dateSelect: 'alltime',
            startDate: new Date(2000, 0).toISOString(), // Arbitrary start date before bot records
            endDate: new Date().toISOString()
        }
    }

    static contextType = AuthContext;

    onRadioSelect = (e) => {
        const { startDate, endDate } = this.state;
        const dateSelect = e.target.value;

        if (dateSelect === 'custom') {
            this.setState({ startDate, endDate, dateSelect: e.target.value });
        } else if (dateSelect === 'alltime') {
            this.setState({ startDate: new Date(2000, 0).toISOString(), endDate: new Date().toISOString(), dateSelect: e.target.value  });
        } else {
            const today = new Date();
            const start = new Date();
            switch (dateSelect) {
                case 'day':
                    start.setDate(start.getDate() - 1);
                    break;
                case 'week':
                    start.setDate(start.getDate() - 7);
                    break;
                case 'month':
                    start.setMonth(start.getMonth() - 1);
                    break;
            }
            this.setState({ startDate: start.toISOString(), endDate: today.toISOString(), dateSelect: e.target.value });
        }
    }

    render() {
        const { dateSelect, startDate, endDate } = this.state;
        const { authorizationCode } = this.context;
        const { guildId } = this.props.match.params;

        return (
            <div>
                <div>
                    <div>
                        <input type="radio" id="day" name="dateSelect" value="day" checked={dateSelect === "day"} onChange={this.onRadioSelect}/>
                        <label htmlFor="day">Day</label><br/>
                        <input type="radio" id="week" name="dateSelect" value="week" checked={dateSelect === "week"} onChange={this.onRadioSelect}/>
                        <label htmlFor="week">Week</label><br/>
                        <input type="radio" id="month" name="dateSelect" value="month" checked={dateSelect === "month"} onChange={this.onRadioSelect}/>
                        <label htmlFor="month">Month</label><br/>
                        <input type="radio" id="alltime" name="dateSelect" value="alltime" checked={dateSelect === "alltime"} onChange={this.onRadioSelect}/>
                        <label htmlFor="alltime">All Time</label><br/>
                        <input type="radio" id="custom" name="dateSelect" value="custom" checked={dateSelect === "custom"} onChange={this.onRadioSelect}/>
                        <label htmlFor="custom">Custom Range</label>
                    </div>
                    {dateSelect === "custom" && (
                        <div>
                            <label htmlFor="start">Start date:</label>
                            <input type="date" id="start" value="2018-07-22"/>

                            <label htmlFor="end">End date: </label>
                            <input type="date" id="end" value="2018-07-22" />
                        </div>
                    )}
                </div>
                <div>
                    <UserDropdown
                        guildId={guildId}
                        authorizationCode={authorizationCode}
                    />
                    <h3>Total Messages from Users</h3>
                    <MessageTotalUsers
                       startDate={startDate}
                       endDate={endDate}
                       guildId={guildId}
                       authorizationCode={authorizationCode}
                    />
                    <h3>Total VoiceChannel Time from Users</h3>
                    <TimeTotalUsers
                        startDate={startDate}
                        endDate={endDate}
                        guildId={guildId}
                        authorizationCode={authorizationCode}
                    />
                    <h3>Total Message Trend from Users</h3>
                    <MessageTrendUsers
                        guildId={guildId}
                        authorizationCode={authorizationCode}
                    />
                    <h3>Guild Activity (Joins/Leaves)</h3>
                    <GuildActivity
                        guildId={guildId}
                        authorizationCode={authorizationCode}
                    />
                </div>
            </div>
        ); 
    }
}