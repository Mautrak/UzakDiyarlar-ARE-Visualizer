// src/components/AreaVisualizer.js

import React, { useState, useMemo } from 'react';
import { useTable, useFilters, useGlobalFilter } from 'react-table';
import './AreaVisualizer.css';
import Room from './Room';

function AreaVisualizer() {
  const [areaData, setAreaData] = useState(null);
  const [selectedSection, setSelectedSection] = useState('rooms');

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
    let currentRoomData = null;
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
          if (currentRoomData) {
            parsedData.rooms.push(currentRoomData);
          }
          const vnum = parseInt(line.slice(1));
          currentRoomData = { vnum, lines: [] };
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
        } else if (line.match(/^\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+$/)) {
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
          };
          console.log('Mobile stats:', currentMobile.stats);
        }
      } else if (currentSection === 'objects') {
        // Parse object data and add to parsedData.objects array
        console.log('Parsing object:', line);
      } else if (currentSection === 'rooms' && currentRoomData) {
        currentRoomData.lines.push(line);
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

    if (currentRoomData) {
      parsedData.rooms.push(currentRoomData);
    }

    if (currentMobile) {
      parsedData.mobiles.push(currentMobile);
      console.log('Final mobile:', currentMobile);
    }

    console.log('Parsed data:', parsedData);
    setAreaData(parsedData);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Vnum',
        accessor: 'vnum',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
    ],
    []
  );

  const data = useMemo(() => {
    if (!areaData) {
      return [];
    }

    switch (selectedSection) {
      case 'rooms':
        return areaData.rooms.map((roomData) => {
          const room = Room.parseRoomData(roomData);
          return {
            vnum: room.vnum,
            name: room.name,
            description: room.description,
          };
        });
      case 'mobiles':
        return areaData.mobiles;
      case 'objects':
        return areaData.objects;
      default:
        return [];
    }
  }, [areaData, selectedSection]);

  const tableInstance = useTable(
    { columns, data },
    useFilters,
    useGlobalFilter
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

  return (
    <div className="area-visualizer">
      <h1>Merc Area File Visualizer</h1>

      <div className="file-upload">
        <label htmlFor="file-input" className="file-upload-label">
          Upload Area File
        </label>
        <input
          id="file-input"
          type="file"
          accept=".are"
          onChange={handleFileUpload}
          className="file-upload-input"
        />
      </div>

      {areaData && (
        <div className="area-content">
          <div className="sidebar">
            <h2>Area Information</h2>
            <pre>{JSON.stringify(areaData.areaInfo, null, 2)}</pre>
            <ul className="section-list">
              <li
                className={selectedSection === 'rooms' ? 'active' : ''}
                onClick={() => setSelectedSection('rooms')}
              >
                Rooms
              </li>
              <li
                className={selectedSection === 'mobiles' ? 'active' : ''}
                onClick={() => setSelectedSection('mobiles')}
              >
                Mobiles
              </li>
              <li
                className={selectedSection === 'objects' ? 'active' : ''}
                onClick={() => setSelectedSection('objects')}
              >
                Objects
              </li>
            </ul>
          </div>
          <div className="main-content">
            <div className="filter-input">
              <input
                type="text"
                value={globalFilter || ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search"
              />
            </div>
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AreaVisualizer;