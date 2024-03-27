// src/components/Mobile.js

import React from 'react';

function Mobile({ mobileData }) {
  const mobile = Mobile.parseMobileData(mobileData);

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

const parseMobileData = (mobileData) => {
  const mobile = {
    vnum: mobileData.vnum,
    keywords: '',
    shortDescription: '',
    longDescription: '',
    description: '',
    stats: {},
  };

  mobileData.lines.forEach((line) => {
    if (!mobile.keywords) {
      mobile.keywords = line.trim();
    } else if (!mobile.shortDescription && line.includes('~')) {
      mobile.shortDescription = line.trim();
    } else if (!mobile.longDescription && line.includes('~')) {
      mobile.longDescription = line.trim();
    } else if (!mobile.description && line.includes('~')) {
      mobile.description = line.trim();
    } else if (line.match(/^\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+\s+\d+$/)) {
      const stats = line.split(' ');
      mobile.stats = {
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
    }
  });

  return mobile;
};

Mobile.parseMobileData = parseMobileData;

export default Mobile;