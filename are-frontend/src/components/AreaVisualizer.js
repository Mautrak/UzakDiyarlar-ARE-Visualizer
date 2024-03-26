// src/components/AreaVisualizer.js

import React, { useState } from 'react';
import Mobile from './Mobile';
import Object from './Object';
import Room from './Room';

function AreaVisualizer() {
  const [areaData, setAreaData] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const decoder = new TextDecoder('iso-8859-9');
    const content = decoder.decode(await file.arrayBuffer());
    parseAreaFile(content);
  };

  const parseAreaFile = (content) => {
    const lines = content.split('\n');
    const parsedData = {
      areaInfo: {},
      mobiles: [],
      objects: [],
      rooms: [],
      resets: [],
      shops: [],
      specials: [],
    };

    let currentSection = null;
    let currentRoom = null;
    let currentMobile = null;

    for (let line of lines) {
      line = line.trim();

      if (line.startsWith('#AREADATA')) {
        currentSection = 'areaInfo';
        console.log('Parsing area info...');
      } else if (line.startsWith('#NEW_MOBILES')) {
        currentSection = 'mobiles';
        console.log('Parsing mobiles...');
      } else if (line.startsWith('#OBJECTS')) {
        currentSection = 'objects';
        console.log('Parsing objects...');
      } else if (line.startsWith('#ROOMS')) {
        currentSection = 'rooms';
        console.log('Parsing rooms...');
      } else if (line.startsWith('#RESETS')) {
        currentSection = 'resets';
        console.log('Parsing resets...');
      } else if (line.startsWith('#SHOPS')) {
        currentSection = 'shops';
        console.log('Parsing shops...');
      } else if (line.startsWith('#SPECIALS')) {
        currentSection = 'specials';
        console.log('Parsing specials...');
      } else if (line.startsWith('#')) {
        if (currentSection === 'rooms') {
          if (currentRoom) {
            parsedData.rooms.push(currentRoom);
            console.log('Room parsed:', currentRoom);
          }
          const vnum = parseInt(line.slice(1));
          currentRoom = { vnum, name: '', description: '', exits: [] };
          console.log('New room started:', currentRoom);
        } else if (currentSection === 'mobiles') {
          if (currentMobile) {
            parsedData.mobiles.push(currentMobile);
            console.log('Mobile parsed:', currentMobile);
          }
          const vnum = parseInt(line.slice(1));
          currentMobile = { vnum, keywords: '', shortDescription: '', longDescription: '', description: '', stats: {} };
          console.log('New mobile started:', currentMobile);
        } else {
          currentSection = null;
          console.log('Ignoring line:', line);
        }
      } else if (currentSection === 'areaInfo') {
        const [key, value] = line.split(/\s+/);
        parsedData.areaInfo[key] = value;
        console.log('Area info:', key, value);
      } else if (currentSection === 'mobiles' && currentMobile) {
        if (!currentMobile.keywords) {
          currentMobile.keywords = line.trim();
          console.log('Mobile keywords:', currentMobile.keywords);
        } else if (!currentMobile.shortDescription && line.includes('~')) {
          currentMobile.shortDescription = line.trim();
          console.log('Mobile short description:', currentMobile.shortDescription);
        } else if (!currentMobile.longDescription && line.includes('~')) {
          currentMobile.longDescription = line.trim();
          console.log('Mobile long description:', currentMobile.longDescription);
        } else if (!currentMobile.description && line.includes('~')) {
          currentMobile.description = line.trim();
          console.log('Mobile description:', currentMobile.description);
        } else if (line.includes('~')) {
          const stats = line.split(' ');
          currentMobile.stats = {
            act: stats[0],
            affect: stats[1],
            align: stats[2],
            type: stats[3],
            level: stats[4],
            hitroll: stats[5],
            damroll: stats[6],
            hp: stats[7],
            mana: stats[8],
            damage: stats[9],
            off: stats[10],
            imm: stats[11],
            res: stats[12],
            vuln: stats[13],
            material: stats[14] ? stats[14].replace('~', '') : '',
          };
          console.log('Mobile stats:', currentMobile.stats);
        }
      } else if (currentSection === 'objects') {
        // Parse object data and add to parsedData.objects array
        console.log('Parsing object:', line);
      } else if (currentSection === 'rooms' && currentRoom) {
        if (!currentRoom.name) {
          currentRoom.name = line.trim();
          console.log('Room name:', currentRoom.name);
        } else if (!currentRoom.description && line !== '~') {
          currentRoom.description += line + '\n';
          console.log('Room description:', currentRoom.description);
        } else if (line.startsWith('D')) {
          const exitData = line.split(/~/);
          const direction = exitData[0].slice(1).trim();
          currentRoom.exits.push({ direction });
          console.log('Room exit:', direction);
        } else if (line === 'S') {
          currentRoom.description = currentRoom.description.trim();
          parsedData.rooms.push(currentRoom);
          console.log('Room completed:', currentRoom);
          currentRoom = null;
        }
      } else if (currentSection === 'resets') {
        // Parse reset data and add to parsedData.resets array
        console.log('Parsing reset:', line);
      } else if (currentSection === 'shops') {
        // Parse shop data and add to parsedData.shops array
        console.log('Parsing shop:', line);
      } else if (currentSection === 'specials') {
        // Parse special data and add to parsedData.specials array
        console.log('Parsing special:', line);
      }
    }

    if (currentRoom) {
      currentRoom.description = currentRoom.description.trim();
      parsedData.rooms.push(currentRoom);
      console.log('Final room:', currentRoom);
    }

    if (currentMobile) {
      parsedData.mobiles.push(currentMobile);
      console.log('Final mobile:', currentMobile);
    }

    console.log('Parsed data:', parsedData);
    setAreaData(parsedData);
  };

  return (
    <div className="area-visualizer">
      <h2>Upload Area File</h2>

      <div className="file-upload">
        <input type="file" accept=".are" onChange={handleFileUpload} />
      </div>

      {areaData && (
        <div className="area-content">
          <h3>Area Information:</h3>
          <pre>{JSON.stringify(areaData.areaInfo, null, 2)}</pre>

          <h3>Mobiles:</h3>
          {areaData.mobiles.map((mobile, index) => (
            <Mobile key={index} mobile={mobile} />
          ))}

          <h3>Objects:</h3>
          {areaData.objects.map((object, index) => (
            <Object key={index} object={object} />
          ))}

          <h3>Rooms:</h3>
          {areaData.rooms.map((room, index) => (
            <Room key={index} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AreaVisualizer;