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
import { decorateBlockBg, decorateHeadline, getBlockSize } from '../../scripts/decorate.js';

function getOddRowsCount(rows) {
  let zRowsOddCount = 0;
  rows.forEach((row) => {
    const firstCol = row.querySelector(':scope > div > div:first-of-type');
    const rowIsOdd = firstCol.querySelector('h1, h2, h3, h4, h5, h6');
    if (rowIsOdd) zRowsOddCount += 1;
  });
  return zRowsOddCount;
}

export default function init(el) {
  const children = el.querySelectorAll(':scope > div');
  const size = getBlockSize(el);
  if (children.length > 1) {
    let numberOfSingleColRows = 0;
    for (let i = 0; i < children.length; i += 1) {
      if (children[i].childNodes.length === 1) {
        numberOfSingleColRows += 1;
      }
    }
    // 2 single rows (bg && headline)
    if (numberOfSingleColRows === 2) {
      const rowBg = children[0].textContent != null;
      const rowHeader = children[1].querySelector('h1, h2, h3, h4, h5, h6');
      if (rowBg) decorateBlockBg(el, children[0]);
      if (rowHeader) decorateHeadline(el, rowHeader, size);
    }
    // 1 single row (bg || headline)
    if (numberOfSingleColRows === 1) {
      const rowHeader = children[0].querySelector('h1, h2, h3, h4, h5, h6');
      if (!rowHeader) {
        decorateBlockBg(el, children[0]);
      } else {
        decorateHeadline(el, rowHeader, size);
      }
    }
  }
  const zRows = el.querySelectorAll(':scope > div:not([class])');
  zRows.forEach((mediaBlock) => {
    mediaBlock.classList.add('media');
    decorateBlock(mediaBlock);
    const mediaRow = document.createElement('div');
    const blockChildren = mediaBlock.querySelectorAll(':scope > div');
    blockChildren.forEach((child) => {
      mediaRow.appendChild(child);
    });
    mediaBlock.classList.add(size);
    mediaBlock.appendChild(mediaRow);
    loadBlock(mediaBlock);
  });
  const zRowsOddCount = getOddRowsCount(zRows);
  if (zRowsOddCount === 0) {
    zRows.forEach((row, i) => {
      if (i % 2) row.classList.add('media--reversed');
    });
  }
}
