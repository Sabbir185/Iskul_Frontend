import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: "Group A", value: 80 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 20 },
    { name: "Group E", value: 200 }
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#fe0004", "#FF8042"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, 
    outerRadius, percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.25;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
const StudentChart = () => {
    return (
        <div>
            <PieChart width={300} height={200}>
                <Pie
                    data={data}
                    cx={100}
                    cy={100}
                    innerRadius={40}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={0}
                    dataKey="value"
                    label={renderCustomizedLabel}
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>

            </PieChart>
        </div>
    );
};

export default StudentChart;