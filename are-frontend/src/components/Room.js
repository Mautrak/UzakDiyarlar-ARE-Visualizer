// src/components/Room.js

import React from 'react';


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
      let toRoom = 0;
      if (exitData.length >= 5) {
        const toRoomData = exitData[4].trim().split(/\s+/);
        toRoom = parseInt(toRoomData[toRoomData.length - 1], 10);
      }
      room.exits.push({ direction, toRoom });
    }
  });

  if (currentField === 'description') {
    room.description = descriptionLines.join(' ').trim();
  }

  return room;
};


const formatExits = (exits) => {
  const directions = ['north', 'east', 'south', 'west', 'up', 'down'];
  const formattedExits = exits
    .map((exit) => {
      const directionIndex = parseInt(exit.direction, 10);
      if (!isNaN(directionIndex) && directionIndex >= 0 && directionIndex < directions.length) {
        const direction = directions[directionIndex];
        return `${direction.charAt(0).toUpperCase() + direction.slice(1)} (${exit.toRoom})`;
      }
      return null;
    })
    .filter((exit) => exit !== null);
  return formattedExits.join(', ');
};


function Room({ roomData }) {
  const room = parseRoomData(roomData);

  return (
    <div className="room">
      <h2>{room.name}</h2>
      <p>{room.description}</p>
      <h3>Exits:</h3>
      <p>{formatExits(room.exits)}</p>
    </div>
  );
}

export { Room, parseRoomData, formatExits };