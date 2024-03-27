// src/components/Mobile.js

import React from 'react';

export const parseMobileData = (data) => {
  const mobile = {
    vnum: data.vnum,
    keywords: '',
    shortDescription: '',
    longDescription: '',
    description: '',
    race: '',
    stats: {},
  };

  let currentField = '';
  let descriptionLines = [];

  data.lines.forEach((line) => {
    if (line.includes('~')) {
      if (!mobile.keywords) {
        mobile.keywords = line.replace(/~/g, '').trim();
        currentField = 'shortDescription';
      } else if (currentField === 'shortDescription') {
        mobile.shortDescription = line.replace(/~/g, '').trim();
        currentField = 'longDescription';
      } else if (currentField === 'longDescription') {
        mobile.longDescription = line.replace(/~/g, '').trim();
        currentField = 'description';
      } else if (currentField === 'description') {
        mobile.description = descriptionLines.join(' ').trim();
        currentField = 'race';
      } else if (currentField === 'race') {
        mobile.race = line.replace(/~/g, '').trim();
        currentField = 'stats';
      }
    } else if (currentField === 'description') {
      descriptionLines.push(line.trim());
    }
  });

  if (currentField === 'description') {
    mobile.description = descriptionLines.join(' ').trim();
  }

  const statsLine = data.lines[data.lines.length - 1].trim();
  const stats = statsLine.split(' ');
  mobile.stats = {
    act: stats[0],
    affect: stats[1],
    align: stats[2],
  };

  return mobile;
};

function Mobile({ mobileData }) {
  const mobile = parseMobileData(mobileData);

  return (
    <div className="mobile">
      <h2>{mobile.keywords}</h2>
      <p>Short Description: {mobile.shortDescription}</p>
      <p>Long Description: {mobile.longDescription}</p>
      <p>Description: {mobile.description}</p>
      <h3>Stats:</h3>
      <ul>
        <li>Act: {mobile.stats.act}</li>
        <li>Affect: {mobile.stats.affect}</li>
        <li>Align: {mobile.stats.align}</li>
        <li>Type: {mobile.stats.type}</li>
        <li>Level: {mobile.stats.level}</li>
        <li>Hitroll: {mobile.stats.hitroll}</li>
        <li>Damroll: {mobile.stats.damroll}</li>
        <li>HP: {mobile.stats.hp}</li>
        <li>Mana: {mobile.stats.mana}</li>
        <li>Damage: {mobile.stats.damage}</li>
      </ul>
    </div>
  );
}

export default Mobile;