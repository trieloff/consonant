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
  describe('default media', () => {
    it('has a heading', () => {
      const heading = medias[0].querySelector('.heading-XL');
      expect(heading).to.exist;
    });

    it('has a background image', () => {
      const image = medias[0].querySelector('.background img');
      expect(image).to.exist;
    });

    it('doesnt have detail', () => {
      const detail = medias[0].querySelector('.detail-M');
      expect(detail).to.not.exist;
    });

  });
});
