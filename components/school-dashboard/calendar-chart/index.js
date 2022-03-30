import React from 'react';
import { Calendar } from 'antd';
import classes from './calendarChart.module.css'
import ShortDescriptionWithPieChart from './pie-chartOne';
import DashboardCardCounter from './card-counter';
import LegendEffectChart from './legendChart';


const CalendarChart = () => {
    
    function onPanelChange(value, mode) {
        // console.log(value, mode);
    }

    return (
        <section>
            <div className='md:grid md:grid-cols-3 md:gap-3 bg-slate-100 p-5 rounded-lg'>
                <div className='bg-slate-50 col-span-2'>
                    {/* PieChart */}
                    <div className='md:flex md:items-center md:justify-between lg:flex lg:justify-evenly'>
                        <DashboardCardCounter />
                        <ShortDescriptionWithPieChart />
                    </div>

                    {/* LegendEffect Line Chart */}
                    <div className='overflow-x-scroll md:overflow-x-hidden'>
                        <LegendEffectChart />
                    </div>
                </div>

                <div className='bg-slate-50 w-full h-full -z-0'>
                    <div className={classes.calendar}>
                        <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CalendarChart;