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
        fetch (`${window.location.protocol}//${window.location.hostname}:4000/api/guilds?guildId=${'518686827096440832'}`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            let labels = [];
            let joinValues = [];
            let leaveValues = [];
            let i = 0;
            while (i < data.length ) {
                if (i == data.length - 1) { // Last one
                }
                let curr = data[i];
                let next = data[i + 1];

                if (curr.day == next.day && curr.month == next.month) { // TODO: Account for year, maybe make a class.
                    joinValues.push(curr.total);
                    leaveValues.push(next.total);
                    labels.push(`${curr.month}/${curr.day}`);
                    i += 2;
                } else {
                    if (curr.type == 0) {
                        joinValues.push(curr.total);
                        leaveValues.push(0);
                    } else if (curr.type == 1) {
                        joinValues.push(0);
                        leaveValues.push(curr.total);
                    }
                    i += 1;
                }
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