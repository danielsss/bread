import { describe, it } from 'mocha';
import Yeast from './yeast.js';
import { expect } from 'chai';


describe('🆙 RSS', () => {

  const yeast = new Yeast({ key: process.env.M_TEAM_API_KEY as string});

  it('should be able to generate RSS feed links', async () => {

    const urls = await yeast.rss.genlink({ });
    expect(urls).to.have.property('readUrl');
    expect(urls).to.have.property('dlUrl');

  });

});


