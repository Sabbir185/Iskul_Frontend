import React, { useState, useCallback } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const data = [
    {
        name: "Sat",
        uv: 4000,
        pv: 2400,
        amt: 2400
    },
    {
        name: "Sun",
        uv: 3000,
        pv: 1398,
        amt: 2210
    },
    {
        name: "Mon",
        uv: 2000,
        pv: 9800,
        amt: 2290
    },
    {
        name: "Tue",
        uv: 2780,
        pv: 3908,
        amt: 2000
    },
    {
        name: "Wed",
        uv: 1890,
        pv: 4800,
        amt: 2181
    },
    {
        name: "Thus",
        uv: 5000,
        pv: 4400,
        amt: 2500
    },
    {
        name: "Fri",
        uv: 0,
        pv: 0,
        amt: 2100
    }
];

export default function LegendEffectChart() {
    const [opacity, setOpacity] = useState({
        uv: 1,
        pv: 1
    });

    const handleMouseEnter = useCallback(
        (o) => {
            const { dataKey } = o;

            setOpacity({ ...opacity, [dataKey]: 0.5 });
        },
        [opacity, setOpacity]
    );

    const handleMouseLeave = useCallback(
        (o) => {
            const { dataKey } = o;
            setOpacity({ ...opacity, [dataKey]: 1 });
        },
        [opacity, setOpacity]
    );

    return (
        <div>
            <LineChart
                width={600}
                height={200}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 10,
                    bottom: 0
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
                <Line
                    type="monotone"
                    dataKey="pv"
                    strokeOpacity={opacity.pv}
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
                <Line
                    type="monotone"
                    dataKey="uv"
                    strokeOpacity={opacity.uv}
                    stroke="#82ca9d"
                />
            </LineChart>
        </div>
    );
}
