import React from "react";
import Chart from 'react-apexcharts'
import * as CONSTANTS from '../Constants'

export default class GuildActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        fetch (`${window.location.protocol}//${window.location.hostname}:4000/api/guilds?guildId=${'697941791365660733'}`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            let labels = [];
            let joinValues = [];
            let leaveValues = [];
            for (let i = 0; i < data.length; i += 2) {
                labels.push(`${data[i].month}/${data[i].day}`);
                joinValues.push(data[i].total);
                leaveValues.push(data[i + 1].total);
            }

            this.setState({ labels, joinValues, leaveValues });
            console.log(data);
        });
    }

    render() {
        const { labels, joinValues, leaveValues } = this.state;

        return (
            <div className="chart">
                <div className="chart-container">
                    <Chart
                        options={{
                            xaxis: {
                                categories: labels || []
                            },
                            plotOptions: CONSTANTS.PLOT_OPTIONS,
                            legend: CONSTANTS.LEGEND
                        }}
                        series={[
                            {
                                name: "Joins",
                                data: joinValues || []
                            },
                            {
                                name: "Leaves",
                                data: leaveValues || []
                            },
                        ]}
                        type="line" width={'85%'} height={750} margin={'auto'}
                    />
                </div>
            </div>
        );
    }
}