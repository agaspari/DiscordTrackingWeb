import React from "react";
import TimeTotalUsers from '../charts/TimeTotalUsers';
import MessageTotalUsers from '../charts/MessageTotalUsers';
import MessageTrendUsers from '../charts/MessageTrendUsers';
import UserDropdown from '../components/UserDropdown';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateSelect: 'week',
            startDate: '',
            endDate: ''
        }
    }

    componentDidMount() {

    }

    onRadioSelect = (e) => {
        this.setState({ dateSelect: e.target.value });
    }

    getDateRange = () => {
        const { dateSelect, startDate, endDate } = this.state;
        if (dateSelect === 'custom') {
            return { startDate, endDate };
        } else {
            const today = new Date();
            const start = new Date();
            switch (dateSelect) {
                case 'day':
                    start.setDate(start.getDate() - 1);
                    break;
                case 'week':
                    start.setDate(start.getDate() - 7   );
                    break;
                case 'month':
                    start.setMonth(start.getMonth() - 1);
                    break;
            }
            return { startDate: start.toISOString(), endDate: today.toISOString() };
        }
    }

    render() {
        const { trendDay, trendDayValues, dateSelect, startDate, endDate } = this.state;
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
                    <button>Update</button>
                </div>
                <div>
                    <UserDropdown/>
                    <MessageTotalUsers
                       startDate={this.getDateRange().startDate}
                       endDate={this.getDateRange().endDate}
                    />
                    <TimeTotalUsers
                        startDate={this.getDateRange().startDate}
                        endDate={this.getDateRange().endDate}
                    />
                    <MessageTrendUsers
                        startDate={this.getDateRange().startDate}
                        endDate={this.getDateRange().endDate}
                    />

                </div>
            </div>
        ); 
    }
}