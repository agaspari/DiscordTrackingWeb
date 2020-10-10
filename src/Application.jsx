import React from "react";
import Chart from 'react-apexcharts'

export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: [],
            messagedata: []
        }
    }

    componentDidMount() {
        fetch (`${window.location.protocol}//${window.location.hostname}:4000/api/users/518686827096440832/`, {
            
        })
        .then(res => res.json())
        .then(data => {
            let timeCounts = [];
            let timeUserCounts = [];
            for (let i = 0; i < data.length; i++) {
                let totalMinutes = Math.floor(data[i].totalTime / 60);
                const hours = Math.round(totalMinutes / 60, 2)
                const minutes = Math.round(totalMinutes % 60);
                timeCounts.push(totalMinutes);
                timeUserCounts.push((data[i].nickname || data[i].username) + "\n" + hours + "hr " + ((minutes < 10) ? "0" + minutes : minutes) + "min");
            }
            this.setState({ timeCounts, timeUserCounts });
        });

        fetch (`${window.location.protocol}//${window.location.hostname}:4000/api/messages/518686827096440832/`, {
            
        })
        .then(res => res.json())
        .then(data => {
            let messageCounts = [];
            let messageCountUsers = [];
            for (let i = 0; i < data.length; i++) {
                messageCounts.push(data[i].count);
                messageCountUsers.push((data[i].nickname || data[i].username));
            }
            this.setState({ messageCounts, messageCountUsers });
        });

        fetch (`${window.location.protocol}//${window.location.hostname}:4000/api/messages/trend/518686827096440832/`, {
            
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


        fetch (`${window.location.protocol}//${window.location.hostname}:4000/api/messages/total/518686827096440832/`, {
            
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ weeklymessages: data[0].count });
        });


        // fetch (`${window.location.protocol}//${window.location.hostname}:4000/api/jointime/total/518686827096440832/`, {
            
        // })
        // .then(res => res.json())
        // .then(data => {
        //     this.setState({ weeklyjointime: data.weeklyjointime });
        // });
    }

    render() {
        const {  weeklymessages, timeCounts, timeUserCounts, messageCounts, messageCountUsers, trendDay, trendDayValues } = this.state;
        console.log(trendDay, trendDayValues)
        return (
            <div>
                <span>Total Weekly Messages: {weeklymessages}</span>
                {/* <Chart
                    width={'100%'}
                    height={'300px'}
                    chartType="ColumnChart"
                    data={userdata}
                    options={{
                        // Material design options
                        chart: {
                            title: 'Weekly Join Quantity',
                            subtitle: 'Num joins per user in the last week',
                        },
                    }}
                /> */}
                <br/>
                <Chart
                    options={{
                        chart: {
                            id: 'apexchart-example'
                        },
                        xaxis: {
                            categories: messageCountUsers || []
                        }
                    }}

                    series={[
                        {
                            name: "Number of Messages Sent",
                            data: messageCounts || []
                        }
                    ]}
                    type="bar" width={'100%'} height={750}    
                />
                <Chart
                    options={{
                        chart: {
                            id: 'apexchart-example'
                        },
                        xaxis: {
                            categories: timeUserCounts || []
                        }
                    }}

                    series={[
                        {
                            name: "Total Minutes in Server",
                            data: timeCounts || []
                        }
                    ]}
                    type="bar" width={'100%'} height={750}    
                />
                <Chart
                    options={{
                        chart: {
                            id: 'apexchart-example'
                        },
                        xaxis: {
                            categories: trendDay || []
                        }
                    }}

                    series={[
                        {
                            name: "Messages on this day",
                            data: trendDayValues || []
                        }
                    ]}
                    type="line" width={'100%'} height={750}    
                />
            </div>
        ); 
    }
}