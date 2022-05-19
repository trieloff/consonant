/* eslint-disable no-unused-expressions */
/* global describe it */

import init from '../../../blocks/icon-block/icon-block.js';
import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { cleanVariations } from '../../../scripts/scripts.js';

const mock = await readFile({ path: './icon-block.mock.html' });
document.body.innerHTML = mock;
cleanVariations(document.body);

describe('icon blocks', () => {
    const blocks = document.querySelectorAll('.icon-block');
    blocks.forEach(block => {
        init(block);
        const isVertical = block.classList.contains('vertical');
        describe(`icon block ${isVertical ? "vertical" : "full-width"}`, () => {
            const children = block.querySelectorAll('.text');
            if (children.length) {
                children.forEach(blk => {
                    it('has an icon', () => {
                        const icon = blk.querySelector('.product-area');
                        expect(icon).to.exist;
                    });

                    it('has a heading', () => {
                        const heading = blk.querySelector(isVertical ? '.heading-S' : '.heading-XL');
                        expect(heading).to.exist;
                    });

                    it('has body text', () => {
                        const body = blk.querySelector('.body-M');
                        expect(body).to.exist;
                    });
                });
            }
        })
    });
})
