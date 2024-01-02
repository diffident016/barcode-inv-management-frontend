import React, { useEffect, useState } from 'react'
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
import salesforecast from '../../assets/data/salesforecast.json'
import makePrediction from '../../components/SimpleSalesForecast';
import { format } from 'date-fns';
import {
    forecastIcon,
    growthIcon
} from '../../assets/images'

function SalesForecast({ sales }) {

    const [forecastData, setForecast] = useState([]);
    const [selected, setSelected] = useState(0);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const getPrediction = () => {
        const predictions = makePrediction(
            salesforecast["forecast_input"],
            salesforecast["months_to_predict"],
            salesforecast["sales_cycle"]);

        const group = sales['sales'].reduce((group, sale) => {
            const { dateRecord } = sale;
            group[format(dateRecord, 'MMM')] = group[format(dateRecord, 'MMM')] ?? [];
            group[format(dateRecord, 'MMM')].push(sale);
            return group;
        }, {});

        var newData = [];
        months.map((key, index) => {

            let sales = 0;

            if (!group[key]) {
                return newData.push({
                    name: key,
                    Forecasted: Math.round(predictions['predictions'][index]),
                })
            }

            group[key].map((item) => {
                sales = sales + item.totalSales
            })

            newData.push({
                name: key,
                Actual: sales,
                Forecasted: Math.round(predictions['predictions'][index])
            })
        })

        setSelected({
            label: newData[0].name,
            actual: newData[0]['Actual'] || 'No data yet.',
            forecast: newData[0]['Forecasted'] || 'No data yet.'
        })
        setForecast(newData);

    }

    useEffect(() => {
        getPrediction();
    }, [sales])

    return (
        <div className='flex flex-row w-full h-full gap-2'>
            <div className='flex flex-col flex-1 h-full bg-white border rounded-lg p-4'>
                <h1 className='font-lato-bold text-sm'>Sales Forecast</h1>
                <ResponsiveContainer width="100%" height="100%" className='text-sm py-2' >
                    <LineChart
                        width={450}
                        height={250}
                        data={forecastData}
                        onClick={(e) => {
                            const payload = e.activePayload[0]['payload'];
                            setSelected({
                                label: e.activeLabel,
                                actual: payload['Actual'] || 'No data yet.',
                                forecast: payload['Forecasted'] || 'No data yet.'
                            })
                        }}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 15,
                            bottom: 15,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <XAxis dataKey="name" >
                            <Label value="Months of the Year" offset={0} position="bottom" />
                        </XAxis>
                        <YAxis>
                            <Label value="Sales" angle={-90} offset={0} position="left" />
                        </YAxis>
                        <Line type="monotone" dataKey="Actual" stroke="#ffc100" activeDot={{ r: 5 }} />
                        <Line type="monotone" dataKey="Forecasted" stroke="#8400ff" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className='flex flex-col w-[300px] h-full bg-white border rounded-lg p-4'>
                <h1 className='font-lato-bold text-sm'>Actual Sales ({selected['label']})</h1>
                <div className='flex w-full flex-row py-6 px-2'>
                    <div className='w-12 h-12 bg-[#fff2cc] p-2 rounded-lg'>
                        <img src={growthIcon} className='w-8 h-8' />
                    </div>
                    <div className='flex flex-col px-4'>
                        <p className='font-lato-bold opacity-70 text-sm'>Sales</p>
                        <p className='font-lato-bold'>{selected['actual']}</p>
                    </div>
                </div>
                <h1 className='font-lato-bold text-sm pt-2'>Forcasted Sales ({selected['label']})</h1>
                <div className='flex w-full flex-row py-6 px-2'>
                    <div className='w-12 h-12 bg-[#8400ff]/10 p-2 rounded-lg'>
                        <img src={forecastIcon} className='w-8 h-8' />
                    </div>
                    <div className='flex flex-col px-4'>
                        <p className='font-lato-bold opacity-70 text-sm'>Sales</p>
                        <p className='font-lato-bold'>{selected['forecast']}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalesForecast