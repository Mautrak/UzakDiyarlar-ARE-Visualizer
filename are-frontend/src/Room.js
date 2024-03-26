import React from 'react';

function Room(props) {
  const room = props.room;

  // Assuming room.exits is an array of objects with properties like direction and to_room
  const exitsList = room.exits.map((exit, index) => (
    <li key={index}>
      {exit.direction}: {exit.to_room}
    </li>
  ));

  return (
    <div className="room">
      <h1>{room.name}</h1>

      <h2>Description:</h2>
      <p>{room.description}</p>

      <h2>Details:</h2>
      <ul>
        <li>Room Flags: {room.room_flags}</li>
        <li>Sector Type: {room.sector_type}</li>
      </ul>

      <h2>Exits:</h2>
      {exitsList.length > 0 ? (
        <ul className="exits-list">{exitsList}</ul>
      ) : (
        <p>No exits.</p>
      )}
    </div>
  );
}

export default Room;