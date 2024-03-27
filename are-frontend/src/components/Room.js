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

  roomData.lines.forEach((line) => {
    if (!room.name) {
      room.name = line.trim();
    } else if (!room.description && line !== '~') {
      room.description += line + '\n';
    } else if (line.startsWith('D')) {
      const exitData = line.split(/~/);
      const direction = exitData[0].slice(1).trim();
      const description = exitData[1] ? exitData[1].trim() : '';
      const keywords = exitData[2] ? exitData[2].trim() : '';
      const locks = exitData[3] ? parseInt(exitData[3].trim()) : 0;
      const key = exitData[4] ? parseInt(exitData[4].trim()) : 0;
      const toRoom = exitData[5] ? parseInt(exitData[5].trim()) : 0;
      room.exits.push({ direction, description, keywords, locks, key, toRoom });
    }
  });

  room.description = room.description.trim();
  return room;
};

Room.parseRoomData = parseRoomData;

export default Room;