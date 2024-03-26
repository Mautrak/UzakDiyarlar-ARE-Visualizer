import React from 'react';

function Help(props) {
  return (

      Keywords: {props.help.keywords}
      Text:
      {props.help.text}

  );
}

export default Help;