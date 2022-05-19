/* eslint-disable no-unused-expressions */
/* global describe it */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import init from '../../../blocks/z-pattern/z-pattern.js';
import { cleanVariations } from '../../../scripts/scripts.js';

const mock = await readFile({ path: './z-pattern.mock.html' });
document.body.innerHTML = mock;
cleanVariations(document.body);

describe('z-pattern', () => {
  const zPatterns = document.querySelectorAll('.z-pattern');
  zPatterns.forEach((block) => {
    init(block);
  });
  describe('default z-pattern', () => {
    it('has at least 2 media rows', () => {
      const mediaRows = zPatterns[0].querySelectorAll('.media');
      expect(mediaRows).length.greaterThanOrEqual(2);
    });
  });

  describe('large z-pattern', () => {
    it('has a heading-XL', () => {
      const heading = zPatterns[1].querySelector('.heading-XL');
      expect(heading).to.exist;
    });

    it('doesnt have a detail-M', () => {
      const detailM = zPatterns[1].querySelector('.detail-M');
      expect(detailM).to.not.exist;
    });
  });

  describe('z-pattern', () => {
    it('does not have heading row', () => {
      const headingRow = zPatterns[2].querySelector('.heading-row');
      expect(headingRow).to.not.exist;
    });
  });
});
