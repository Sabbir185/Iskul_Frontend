import React from 'react';
import CalendarChart from '../../components/school-dashboard/calendar-chart';
import NoticeRadicalChar from '../../components/school-dashboard/latest-notice-radicalChart';
import AdminLayout from '../../layout/adminLayout';


const School = () => {

    return (
        <AdminLayout>

            <CalendarChart />
            
            <NoticeRadicalChar />

        </AdminLayout>
    );
};

export default School;