import React from 'react';

function Mobile(props) {
  const mobile = props.mobile;

  return (
    <div className="mobile">
      <h1>{mobile.keywords} - {mobile.short_description}</h1>

      <h2>Description:</h2>
      <p>{mobile.description}</p>

      <h2>Stats:</h2>
      <ul>
        <li>Level: {mobile.level}</li>
        <li>Alignment: {mobile.alignment}</li>
        <li>Sex: {mobile.sex === 0 ? 'Neutral' : mobile.sex === 1 ? 'Male' : 'Female'}</li>
      </ul>

      <h2>Flags:</h2>
      <ul>
        <li>Act Flags: {mobile.act_flags}</li>
        <li>Affected Flags: {mobile.affected_flags}</li>
      </ul>
    </div>
  );
}

export default Mobile;