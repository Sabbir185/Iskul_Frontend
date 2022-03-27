import React, { useState } from 'react';
import AdminLayout from '../../../layout/adminLayout';
import { PlusCircleFilled, PlusCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import AddRoutine from '../../../components/modal/add-routine';

const Routine = () => {

    // modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    }



    return (
        <AdminLayout>

            {/* routine add */}
            <div className='text-cyan-900 md:flex md:flex-row md:items-center md:justify-around '>
                <div>
                    <p className='font-semibold text-lg'>Routine Management</p>

                </div>
                <div className='flex items-center gap-3'>
                    <p>Add Routine</p>
                    <p className='' onClick={showModal}>
                        <PlusCircleFilled className='text-xl hover:scale-125 transition cursor-pointer' />
                    </p>
                </div>

            </div>



            <Modal title="Create Routine" visible={isModalVisible} onCancel={handleCancel} footer={null} >
                <AddRoutine />
            </Modal>


        </AdminLayout>
    );
};

export default Routine;