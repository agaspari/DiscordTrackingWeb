import React from "react";
import Chart from 'react-apexcharts'
import * as CONSTANTS from '../Constants'

export default class MessageTrendUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        const { userId } = this.props;

        fetch (`${window.location.protocol}//${window.location.hostname}:4000/api/messages/trend/${userId}?guildId=${'518686827096440832'}`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            let trendDay = [];
            let trendDayValues = [];
            for (let i = 0; i < data.length; i++) {
                trendDay.push(data[i].date);
                trendDayValues.push(data[i].count);
            }
            this.setState({ trendDay, trendDayValues });
        });
    }

    render() {
        const { trendDay, trendDayValues } = this.state;

        return (
            <div className="chart">
                <div className="chart-container">
                    <Chart
                        options={{
                            xaxis: {
                                categories: trendDay || []
                            },
                            plotOptions: CONSTANTS.PLOT_OPTIONS,
                            legend: CONSTANTS.LEGEND
                        }}
                        series={[
                            {
                                name: "Messages on this day",
                                data: trendDayValues || []
                            }
                        ]}
                        type="line" width={'85%'} height={750} margin={'auto'}
                    />
                </div>
            </div>
        );
    }
}