import React from 'react';

function Mobile(props) {
  const mobile = props.mobile;

  return (

      {mobile.keywords} - {mobile.short_description}

      Description:
      {mobile.description}

      Stats:
      Level: {mobile.level}
      Alignment: {mobile.alignment}
      Sex: {mobile.sex === 0 ? 'Neutral' : mobile.sex === 1 ? 'Male' : 'Female'}

      Flags:
      Act Flags: {mobile.act_flags}
      Affected Flags: {mobile.affected_flags}

  );
}

export default Mobile;