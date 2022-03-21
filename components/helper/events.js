import React from 'react';
import Image from 'next/image'
import classes from './events.module.css'

const Events = ({ image, ind }) => {

  return (
    <div className='rounded'>
      <Image src={image} alt={`event-${ind}`} className={classes.eventImg}/>
    </div>
  );
};

export default Events;