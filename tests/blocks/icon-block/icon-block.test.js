/* eslint-disable no-unused-expressions */
/* global describe it */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import init from '../../../blocks/marquee/marquee.js';
import { cleanVariations } from '../../../scripts/scripts.js';

const mock = await readFile({ path: './icon-block.mock.html' });
document.body.innerHTML = mock;
cleanVariations(document.body);

describe('icon-block', () => {
    const iconBlocks = document.querySelectorAll('.icon-block');
    iconBlocks.forEach(icon => init(icon));

    describe('default marquee', () => {
        it('has a heading', () => {
            const heading = marquees[0].querySelector('.heading-XL');
            expect(heading).to.exist;
        });

        it('has an icon', () => {
            const icon = marquees[0].querySelector('.icon-img');
            expect(icon).to.exist;
        });

        it('has body text', () => {
            const body = marquees[0].querySelector('.body-M');
            expect(body).to.exist;
        });
    });
});
