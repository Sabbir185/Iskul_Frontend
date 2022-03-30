import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';
import img1 from '../../public/images/1.jpg'
import img2 from '../../public/images/2.jpg'
import img3 from '../../public/images/3.jpg'
import img4 from '../../public/images/4.jpg'



const CarouselAuto = () => {
    

    return (
        <Carousel autoplay>
            <div className='shrink h-52 rounded-lg'>
                <Image src={img1} alt='slider-image1'/>
            </div>
            <div className='shrink h-52 rounded-lg'>
                <Image src={img2} alt='slider-image2'/>
            </div>
            <div className='shrink h-52 rounded-lg'>
                <Image src={img3} alt='slider-image3'/>
            </div>
            <div className='shrink h-52 rounded-lg'>
                <Image src={img4} alt='slider-image4'/>
            </div>
        </Carousel>
    );
};

export default CarouselAuto;