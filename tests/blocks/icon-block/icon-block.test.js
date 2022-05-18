/* eslint-disable no-unused-expressions */
/* global describe it */

import init from '../../../blocks/marquee/marquee.js';
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
        describe('icon block', () => {
            const children = document.querySelectorAll('.text');
            if (children.length) {
                children.forEach(blk => {
                    it('has an icon', () => {
                        const icon = blk.querySelector('.detail-M');
                        expect(icon).to.exist;
                    });

                    it('has a heading', () => {
                        const heading = blk.querySelector('.heading-XL');
                        expect(heading).to.exist;
                    });

                    it('has body text', () => {
                        const body = blk.querySelector('.body-M');
                        expect(body).to.exist;
                    });
                })
            }

        })
    })
})
