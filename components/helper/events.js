import React from 'react';
import Image from 'next/image'
import classes from './events.module.css'

const Events = ({ image, ind }) => {

  return (
    < >
      <Image src={image} alt={`event-${ind}`} className={classes.eventImg}/>
    </>
  );
};

export default Events;