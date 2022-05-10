/* eslint-disable no-unused-expressions */
/* global describe it */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import init from '../../../blocks/media/media.js';
import { cleanVariations } from '../../../scripts/scripts.js';

const mock = await readFile({ path: './media.mock.html' });
document.body.innerHTML = mock;
cleanVariations(document.body);
describe('media', () => {
  const medias = document.querySelectorAll('.media');
  medias.forEach((media) => {
    init(media);
  });
  describe('default media medium', () => {
    it('has a heading-M', () => {
      const heading = medias[0].querySelector('.heading-M');
      expect(heading).to.exist;
    });
    it('has a supporting image', () => {
      const image = medias[0].querySelector('.foreground .image img');
      expect(image).to.exist;
    });
  });
  describe('dark media large', () => {
    it('has a heading-L', () => {
      const heading = medias[1].querySelector('.heading-L');
      expect(heading).to.exist;
    });
    it('has a supporting bg color', () => {
      const isDark = medias[1].classList.contains('dark');
      expect(isDark).to.exist;
    });
  });
});
