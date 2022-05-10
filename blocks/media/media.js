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
 * Media - v0.0.1
 */

import { decorateText, decorateIcons, decorateButtons, getBlockSize, decorateBackground } from '../../scripts/decorate.js';

export default function init(el) {
  const toggleClassStr = 'media-reverse-mobile';
  const children = el.querySelectorAll(':scope > div');
  if (children.length > 1) {
    if (children[0].childElementCount === 1) {
      decorateBackground(children[0]);
    }
  }
  const size = getBlockSize(el);
  const media = el.querySelectorAll(':scope > div:not([class])');

  const container = document.createElement('div');
  container.classList.add('container', 'foreground');
  media.forEach((row) => {
    row.classList.add('media-row');
    const text = row.querySelector('h1, h2, h3, h4, h5, h6').closest('div');
    if (text) text.classList.add('text');
    const image = row.querySelector(':scope > div:not([class])');
    if (image) {
      image.classList.add('image');
    }
    decorateText(text, size);
    decorateIcons(text);
    decorateButtons(text);
    container.append(row);
  });
  el.append(container);
  const mediaRowReversed = el.querySelector(':scope > .foreground > .media-row > div').classList.contains('text');
  if (mediaRowReversed) el.classList.add(toggleClassStr);
}
