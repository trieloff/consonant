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

import { decorateBlock, loadBlock  } from '../../scripts/scripts.js';
import { getBlockSize, decorateBlockBg } from "../../scripts/decorate.js";

async function getOddRowsCount(rows) {
  let zRowsOddCount = 0;
  for await (const row of rows) {
    const firstCol = row.querySelector(':scope > div > div:first-of-type');
    const rowIsOdd = firstCol.querySelector('h1, h2, h3, h4, h5, h6');
    if (rowIsOdd) zRowsOddCount++;
  }
  return zRowsOddCount;
}

const init = async (block) => {
    const children = block.querySelectorAll(':scope > div');
    if (children.length > 1) {
      // If first two rows are single column this indicates a bg decorator row is present
      if (children[0].childNodes.length === 1 && children[1].childNodes.length === 1) {
        decorateBlockBg(block, children[0]);
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
