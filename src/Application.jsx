import React from "react";
import { Chart } from 'react-google-charts'

export default class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: [],
            messagedata: []
        }
    }

    componentDidMount() {
        fetch (`http://localhost:4000/api/users/518686827096440832/`, {
            
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const userdata = [["Name", "Total Minutes"]];
            for (let i = 0; i < data.length; i++) {
                let totalMinutes = data[i].totalTime / 60;
                const hours = Math.floor(totalMinutes / 60)
                const minutes = Math.round(totalMinutes % 60);

                userdata.push([ (data[i].nickname || data[i].username) + "\n" + hours + ":" + ((minutes < 10) ? "0" + minutes : minutes), totalMinutes ]);
            }
            this.setState({ userdata });
        });

        fetch (`http://localhost:4000/api/messages/518686827096440832/`, {
            
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const messagedata = [["Name", "Total Messages"]];
            for (let i = 0; i < data.length; i++) {

                messagedata.push([ (data[i].nickname || data[i].username) + "\n" + data[i].count, data[i].count ]);
            }
            this.setState({ messagedata });
        });
    }

    render() {
        const { userdata, messagedata } = this.state;
        return (
            <div>
                <Chart
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
                />
                <br/>
                <Chart
                    width={'100%'}
                    height={'300px'}
                    chartType="ColumnChart"
                    data={messagedata}
                    options={{
                        // Material design options
                        chart: {
                            title: 'Weekly Message Quantity',
                            subtitle: 'Num messages per user in the last week',
                        },
                    }}
                />
            </div>
        ); 
    }
}