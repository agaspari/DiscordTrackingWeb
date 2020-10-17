import React from "react";
import Chart from 'react-apexcharts'
import * as CONSTANTS from '../Constants'

export default class TimeTotalUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        }
    }

    componentDidMount() {
        const { currentPage } = this.state;
        this.fetchData(currentPage - 1);
    }

    changePage(direction) {
        const { currentPage } = this.state;

        if (direction === CONSTANTS.DIRECTION.RIGHT) {
            this.setState({ currentPage: currentPage + 1 }, () => {
                this.fetchData(currentPage);
            });
        } else if (direction === CONSTANTS.DIRECTION.LEFT) {
            if (currentPage <= 1) return;
            this.setState({ currentPage: currentPage - 1 }, () => {
                this.fetchData(currentPage - 2);
            });
        }
    }

    fetchData(currentPage) {
        const { startDate, endDate } = this.props;
        fetch (`${window.location.protocol}//${window.location.hostname}:4000/api/messages?guildId=${'518686827096440832'}&pageNum=${currentPage}&startDate=${startDate}&endDate=${endDate}`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            if (data.length == 0) {
                this.setState({ currentPage });
                return;
            }
            let messageCounts = [];
            let messageCountUsers = [];
            for (let i = 0; i < data.length; i++) {
                messageCounts.push(data[i].count);
                messageCountUsers.push([[data[i].nickname || data[i].username], data[i].count]);
            }
            this.setState({ messageCountUsers, messageCounts });
        });
    }

    render() {
        const { currentPage, messageCountUsers, messageCounts } = this.state;
        return (
            <div className="chart">
                <div className="chart-container">
                    <Chart
                        options={{
                            colors: CONSTANTS.COLORS,
                            xaxis: {
                                categories: messageCountUsers || []
                            },
                            plotOptions: CONSTANTS.PLOT_OPTIONS,
                            legend: CONSTANTS.LEGEND
                        }}
                        series={[
                            {
                                name: "Number of Messages Sent",
                                data: messageCounts || []
                            }
                        ]}
                        type="bar" width={'85%'} height={750} margin={'auto'}
                    />

                </div>
                <div className="page-selector">
                    <button onClick={() => this.changePage(CONSTANTS.DIRECTION.LEFT)}>Left</button>
                        <span>Current Page: {currentPage}</span>
                    <button onClick={() => this.changePage(CONSTANTS.DIRECTION.RIGHT)}>Right</button>
                </div>
            </div>
        );
        
    }
}