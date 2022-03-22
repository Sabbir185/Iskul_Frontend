import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Grade 1',
        salary: 30000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Grade 2',
        salary: 25000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Grade 4',
        salary: 18500,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Grade 3',
        salary: 23500,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Grade 5',
        salary: 15000,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Grade 6',
        salary: 12000,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Grade 7',
        salary: 10000,
        pv: 4300,
        amt: 2100,
    },
];

const ChartView = () => {
    return (
        <div style={{ width: '100%' }}>
            <ResponsiveContainer width="100%" height={130}>
                <AreaChart
                    width={500}
                    height={200}
                    data={data}
                    syncId="anyId"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="salary" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartView;