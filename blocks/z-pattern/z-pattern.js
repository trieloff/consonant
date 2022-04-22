/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/*
 * Z-Pattern - v0.0.1
 */

import { decorateBlock, loadBlock } from '../../scripts/scripts.js';
import { getBlockSize } from "../../scripts/decorate.js";

async function getOddRowsCount(rows) {
  let zRowsOddCount = 0;
  for await (const row of rows) {
    const firstCol = row.querySelector(':scope > div > div:first-of-type');
    const rowIsOdd = firstCol.querySelector('h1, h2, h3, h4, h5, h6');
    if (rowIsOdd) zRowsOddCount++;
  }
  return zRowsOddCount;
}

function isColorDark(color) {
  let r, g, b;
  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If HEX --> store the red, green, blue values in separate variables
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If RGB --> Convert it to HEX
    color = +("0x" + color.slice(1).replace( color.length < 5 && /./g, '$&$&' ));
    r = color >> 16;
    g = color >> 8 & 255;
    b = color & 255;
  }
  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  const hsp = Math.sqrt( 0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b) );
  // Using the HSP value, determine whether the color is light or dark
  return (hsp < 127.5);
}

const init = async (block) => {
    const children = block.querySelectorAll(':scope > div');
    if (children.length > 1) {
      // If first two rows are single column this indicates a bg decorator row is present
      if (children[0].childNodes.length === 1 && children[1].childNodes.length === 1) {
        children[0].classList.add('background');
        const bgImg = children[0].querySelector(':scope img');
        if (!bgImg) {
          block.style.background = children[0].textContent;
          const blockColorDark = isColorDark(children[0].textContent);
          if(blockColorDark) {
            block.classList.add('dark')
          }
          children[0].remove();
        }
      }
    }
    const header = block.querySelector('h1, h2, h3, h4, h5, h6');
    if (header) {
        const headingRow = header.parentElement;
        headingRow.classList.add('heading-row');
        headingRow.parentElement.classList.add('container');
        const blockIsLarge = block.classList.contains('large');
        const headerClass = blockIsLarge ? 'heading-XL' : 'heading-L';
        header.classList.add(headerClass, 'headline');
    }
    const size = getBlockSize(block);
    const zRows = block.querySelectorAll(':scope > div:not([class])');
    zRows.forEach((mediaBlock) => {
        mediaBlock.classList.add('media');
        decorateBlock(mediaBlock);
        const mediaRow = document.createElement('div');
        const children = mediaBlock.querySelectorAll(':scope > div');
        children.forEach((child) => {
          mediaRow.appendChild(child);
        });
        mediaBlock.classList.add(size);
        mediaBlock.appendChild(mediaRow);
        loadBlock(mediaBlock);
    });
    const zRowsOddCount = await getOddRowsCount(zRows);
    if(zRowsOddCount === 0) {
      zRows.forEach((row, i) => {
        if ( i % 2 ) row.classList.add('media--reversed');
      });
    }
}

export default init;
