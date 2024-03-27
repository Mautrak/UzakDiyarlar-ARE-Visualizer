// src/components/Object.js


import React from 'react';

function Object(props) {
  const object = props.object;

  return (
    <div className="object">
      <h1>{object.keywords} - {object.short_description}</h1>

      <h2>Description:</h2>
      <p>{object.long_description}</p>

      <h2>Details:</h2>
      <ul>
        <li>Item Type: {object.item_type}</li>
        <li>Extra Flags: {object.extra_flags}</li>
        <li>Wear Flags: {object.wear_flags}</li>
        <li>Values: {object.value_0}, {object.value_1}, {object.value_2}, {object.value_3}</li>
        <li>Weight: {object.weight}</li>
      </ul>

      {object.action_description && (
        <div className="action-description">
          <h2>Action Description:</h2>
          <p>{object.action_description}</p>
        </div>
      )}

      {object.container && (
        <div className="container">
          <h2>Container:</h2>
          <p>{object.container.vnum} - {object.container.short_description}</p>
        </div>
      )}

      {object.extra_descriptions && (
        <div className="extra-descriptions">
          <h2>Extra Descriptions:</h2>
          <ul>
            {object.extra_descriptions.map((desc, index) => (
              <li key={index}>
                <strong>{desc.keywords}:</strong> {desc.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {object.applies && (
        <div className="applies">
          <h2>Applies:</h2>
          <ul>
            {object.applies.map((apply, index) => (
              <li key={index}>
                {apply.apply_type}: {apply.apply_value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Object;