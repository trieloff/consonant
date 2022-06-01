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

export function decorateButtons(el) {
  const buttons = el.querySelectorAll('em a, strong a');
  buttons.forEach((button) => {
    const parent = button.parentElement;
    const buttonType = parent.nodeName === 'STRONG' ? 'blue' : 'outline';
    button.classList.add('con-button', buttonType);
    parent.insertAdjacentElement('afterend', button);
    parent.remove();
  });
  if (buttons.length > 0) {
    buttons[0].closest('p').classList.add('action-area');
  }
  const links = el.querySelectorAll('a:not([class])');
  if (links) {
    links.forEach((link) => {
      link.classList.add('link-underline');
    });
  }
}

export function decorateIcons(el, displayText = true) {
  const regex = /[^{{]+(?=}})/g; // {{value}}
  const placeholders = el.textContent.match(regex);
  placeholders?.forEach((str) => {
    if (window.iconLibrary) {
      const icon = window.iconLibrary[str];
      if (icon) {
        const svg = `<img height="40" width="40" alt="${icon[0]}" src="${icon[1]}">`;
        const anchor = `<a class="icon ${str}" href="${icon[2]}">${svg} ${displayText ? icon[0] : ''}</a>`;
        el.innerHTML = el.innerHTML.replace(`{{${str}}}`, anchor);
      } else {
        el.innerHTML = el.innerHTML.replace(`{{${str}}}`, '');
      }
    }
  });
  const icons = el.querySelectorAll('.icon');
  if (icons.length > 0) {
    icons[0].closest('p').classList.add('icon-area');
  }
}

export function decorateBlockDaa(el) {
  const lh = [];
  const exclude = ['--', 'block'];
  el.classList.forEach((c) => {
    if (!c.includes(exclude[0]) && c !== exclude[1]) lh.push(c);
  });
  el.setAttribute('daa-im', 'true');
  el.setAttribute('daa-lh', lh.join('|'));
}

export function decorateTextDaa(el, heading) {
  console.log(el);
  el.setAttribute('daa-lh', heading.textContent);
  const links = el.querySelectorAll('a, button');
  if (links) {
    links.forEach((link, i) => {
      const linkType = () => {
        if (link.classList.contains('con-button') || link.nodeName === 'BUTTON') {
          return 'cta';
        }
        if (link.classList.contains('icon')) {
          return 'icon cta';
        }
        return 'link';
      };
      const str = `${linkType(link)}|${link.innerText} ${i + 1}`;
      link.setAttribute('daa-ll', str);
    });
  }
}

export function decorateText(el, size) {
  const headings = el.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const heading = headings[headings.length - 1];
  if (!size || size === 'small') {
    heading.classList.add('heading-XS');
    heading.nextElementSibling.classList.add('body-S');
    if (heading.previousElementSibling) {
      heading.previousElementSibling.classList.add('detail-M');
    }
  }
  if (size === 'medium') {
    heading.classList.add('heading-M');
    heading.nextElementSibling.classList.add('body-S');
    if (heading.previousElementSibling) {
      heading.previousElementSibling.classList.add('detail-M');
    }
  }
  if (size === 'large') {
    heading.classList.add('heading-XL');
    heading.nextElementSibling.classList.add('body-M');
    if (heading.previousElementSibling) {
      heading.previousElementSibling.classList.add('detail-L');
    }
  }
  decorateIcons(el);
  decorateButtons(el);
  decorateTextDaa(el, heading);
}

// decorate text content in block by passing array of classes [ detail, heading, body ]
export function decorateContent(el, classList) {
  if (el && classList.length === 3) {
    const text = el.querySelector('h1, h2, h3, h4, h5, h6')?.closest('div');
    text?.classList.add('text');
    text?.querySelector(':scope img')?.closest('p')?.classList.add('icon-area');
    const headings = text.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const heading = headings[headings.length - 1];
    heading.classList.add(classList[1]);
    heading.nextElementSibling.classList.add(classList[2]);
    if (heading.previousElementSibling) heading.previousElementSibling.classList.add(classList[0]);
    el?.querySelector(':scope > div:not([class])')?.classList.add('image');
  }
}

// check if hex or has color library value
export function getLibColor(str) {
  const isHex = str[0] === '#';
  const libColor = !isHex && window.colorlibrary[str];
  return !isHex && libColor ? libColor : str;
}

// decorate background with color lib
export function decorateBlockBg(block, node) {
  node.classList.add('background');
  if (!node.querySelector(':scope img') && window.colorlibrary) {
    const bgColor = getLibColor(node.textContent);
    block.style.background = bgColor;
    const darkColors = ['#323232', '#000000'];
    if (darkColors.includes(bgColor)) block.classList.add('dark');
    node.remove();
  }
}

export function decorateHeadline(header, size) {
  const headingRow = header.parentElement;
  headingRow.classList.add('heading-row');
  headingRow.parentElement.classList.add('container');
  const headerClass = (size === 'large') ? 'heading-XL' : 'heading-L';
  header.classList.add(headerClass, 'headline');
}

export function getBlockSize(el) {
  const sizes = ['small', 'medium', 'large'];
  let defaultSize = sizes[1];
  sizes.forEach((size) => {
    if (el.classList.contains(size)) {
      defaultSize = size;
    }
  });
  return defaultSize;
}
