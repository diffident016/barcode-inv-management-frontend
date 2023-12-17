import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Label,
    ResponsiveContainer
} from 'recharts';


function SalesForcast() {

    const data = [
        {
            name: 'Jan',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Feb',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Mar',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Apr',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'May',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Jun',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Jul',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'Aug',
            uv: 3790,
            pv: 4500,
            amt: 2100,
        },
        {
            name: 'Sep',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'Oct',
            uv: 3090,
            pv: 4600,
            amt: 2100,
        },
        {
            name: 'Nov',
            uv: 3190,
            pv: 4100,
            amt: 2100,
        },
        {
            name: 'Dec',
            uv: 3590,
            pv: 4600,
            amt: 2100,
        },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="w-full h-16 bg-white/60 border rounded-lg">
                    <p className="label">{`Actual Sales : ${payload[0].value}`}</p>
                    <p className="label">{`Forcasted Sales : ${payload[1].value}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className='flex flex-col flex-1 h-full bg-white border rounded-lg p-4'>
            <h1 className='font-lato-bold text-sm'>Sales Forecast</h1>
            <ResponsiveContainer width="100%" height="100%" className='text-sm py-2' >
                <LineChart
                    width={450}
                    height={250}
                    data={data}
                    margin={{
                        top: 5,
                        right: 10,
                        left: 15,
                        bottom: 15,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" >
                        <Label value="Months of the Year" offset={0} position="bottom" />
                    </XAxis>
                    <YAxis>
                        <Label value="Sales" angle={-90} offset={0} position="left" />
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="pv" stroke="#ffc100" activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="uv" stroke="#8400ff" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SalesForcast