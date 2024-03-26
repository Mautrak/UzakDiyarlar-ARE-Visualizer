import React from 'react';

function Room(props) {
  const room = props.room;

  // Assuming room.exits is an array of objects with properties like direction and to_room
  const exitsList = room.exits.map((exit) => (
    <li key={exit.direction}>
      {exit.direction}: {exit.to_room}
    </li>
  ));

  return (

      {room.name}

      Description:
      {room.description}

      Details:
      Room Flags: {room.room_flags}
      Sector Type: {room.sector_type}

      Exits:
      {exitsList.length > 0 ? (
        <ul>{exitsList}</ul>
      ) : (
        <p>No exits.</p>
      )}

  );
}

export default Room;