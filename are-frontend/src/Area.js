import React from 'react';

function Area(props) {
  return (

      {props.area.name}
      Level Range: {props.area.level_range_low} - {props.area.level_range_high}
      Author: {props.area.author}

  );
}

export default Area;