// src/components/AreaVisualizer.js

import React, { useState, useMemo } from 'react';
import { useTable, useFilters, useGlobalFilter } from 'react-table';
import './AreaVisualizer.css';
import Room from './Room';
import Mobile from './Mobile'; // Add this import statement

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
  let currentMobileData = null;

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
        if (line.startsWith('#')) {
          if (currentMobileData) {
            parsedData.mobiles.push(currentMobileData);
          }
          const vnum = parseInt(line.slice(1));
          currentMobileData = { vnum, lines: [] };
        } else if (currentMobileData) {
          currentMobileData.lines.push(line);
        }
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

  if (currentMobileData) {
    parsedData.mobiles.push(currentMobileData);
    console.log('Final mobile:', currentMobileData);
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
      return areaData.mobiles.map((mobileData) => {
        const mobile = Mobile.parseMobileData(mobileData);
        return {
          vnum: mobile.vnum,
          keywords: mobile.keywords,
          shortDescription: mobile.shortDescription,
          longDescription: mobile.longDescription,
          description: mobile.description,
        };
      });
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