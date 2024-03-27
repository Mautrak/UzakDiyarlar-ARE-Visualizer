// src/components/Room.js

import React from 'react';

function Room({ roomData }) {
  const room = Room.parseRoomData(roomData);

  return (
    <div className="room">
      <h2>{room.name}</h2>
      <p>{room.description}</p>
      <h3>Exits:</h3>
      <ul>
        {room.exits.map((exit, index) => (
          <li key={index}>
            {exit.direction} - To Room: {exit.toRoom}
            <br />
            Description: {exit.description}
            <br />
            Keywords: {exit.keywords}
            <br />
            Locks: {exit.locks}
            <br />
            Key: {exit.key}
          </li>
        ))}
      </ul>
    </div>
  );
}

const parseRoomData = (roomData) => {
  const room = {
    vnum: roomData.vnum,
    name: '',
    description: '',
    exits: [],
  };

  let currentField = 'name';
  let descriptionLines = [];

  roomData.lines.forEach((line) => {
    if (currentField === 'name') {
      room.name = line.trim();
      currentField = 'description';
    } else if (currentField === 'description') {
      if (line.startsWith('~')) {
        room.description = descriptionLines.join(' ').trim();
        currentField = 'exits';
      } else {
        descriptionLines.push(line.trim());
      }
    } else if (currentField === 'exits' && line.startsWith('D')) {
      const exitData = line.split(/~/);
      const direction = exitData[0].slice(1).trim();
      const toRoom = exitData[5] ? parseInt(exitData[5].trim(), 10) : 0;
      room.exits.push({ direction, toRoom });
    }
  });

  if (currentField === 'description') {
    room.description = descriptionLines.join(' ').trim();
  }

  return room;
};

Room.parseRoomData = parseRoomData;

export default Room;