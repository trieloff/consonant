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
* Icon Block - v0.0.1
*/

import { decorateButtons, decorateContent, decorateIcons } from "../../scripts/decorate.js";

export default function init(el) {
    const children = el.querySelectorAll(':scope > div');
    if (children.length > 1) {
        if (children[0].childNodes.length == 1) {
            children[0].classList.add('background');
            const bgImg = children[0].querySelector(':scope img');
            if (!bgImg) {
                const bgColor = children[0].textContent;
                el.style.background = bgColor;
                children[0].remove();
            }
        }
        const vertical = el.querySelectorAll(':scope > div:not([class])');
        vertical.forEach(block => {
            const headingClass = el.classList.contains('vertical') ? 'heading-S' : 'heading-XL';
            const contentClasses = ['product-area', headingClass, 'body-M'];
            decorateContent(block, contentClasses);
            decorateButtons(block);
        });
        decorateIcons(el, false);
    }
}