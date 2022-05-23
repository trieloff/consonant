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

import { decorateBlock } from '../../scripts/scripts.js';
import { decorateBlockBg, decorateHeadline, getBlockSize } from '../../scripts/decorate.js';
import media from '../media/media.js';

function getOddRowsCount(rows) {
  let zRowsOddCount = 0;
  rows.forEach((row) => {
    const firstCol = row.querySelector(':scope > div > div:first-of-type');
    const rowIsOdd = firstCol.querySelector('h1, h2, h3, h4, h5, h6');
    if (rowIsOdd) zRowsOddCount += 1;
  });
  return zRowsOddCount;
}

function getChildSingleRowCount(children) {
  let length = 0;
  for (let i = 0; i < children.length; i += 1) {
    if (children[i].children.length === 1) {
      length += 1;
    }
  }
  return length;
}

export default function init(el) {
  const children = el.querySelectorAll(':scope > div');
  const size = getBlockSize(el);
  const singleRowCount = getChildSingleRowCount(children);
  // 1 single row  (bg || headline)
  // 2 single rows (bg && headline)
  const headerIndex = singleRowCount === 2 ? 1 : 0;
  const rowHeader = children[headerIndex].querySelector('h1, h2, h3, h4, h5, h6');
  const rowBg = children[0].textContent != null;
  if (rowHeader && singleRowCount) decorateHeadline(rowHeader, size);
  if (rowBg && singleRowCount && rowHeader != null) decorateBlockBg(el, children[0]);
  const zRows = el.querySelectorAll(':scope > div:not([class])');
  zRows.forEach((row) => {
    row.classList.add('media');
    decorateBlock(row);
    const mediaRow = document.createElement('div');
    const blockChildren = row.querySelectorAll(':scope > div');
    blockChildren.forEach((child) => {
      mediaRow.appendChild(child);
    });
    row.classList.add(size);
    row.appendChild(mediaRow);
  });
  const zRowsOddCount = getOddRowsCount(zRows);
  if (zRowsOddCount === 0) {
    zRows.forEach((row, i) => {
      if (i % 2) row.classList.add('media--reversed');
    });
  }
  const mediaItems = el.querySelectorAll(':scope > .media');
  mediaItems.forEach((i) => {
    media(i);
  });
}
