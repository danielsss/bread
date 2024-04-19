import Base from './base.js';
import { MissingArgumentError } from './errors.js';
import { Response } from './request.js';
import {
  CreateSeekTorrentInput
} from './interfaces/seek/input.type.js';

import {
  SeekDetailOutput
} from './interfaces/seek/output.type.js';

class Seek extends Base {


  /**
   * @description Add more excess rewards into seeking the torrent
   * @param { string | number } seekId
   * @param { number } reward
   */
  public async addTo(seekId: string | number, reward: number) {
    if (this.utils.isEmpty(seekId)) throw new MissingArgumentError('seekId');
    if (reward <= 0) throw new Error('reward must be greater than 0');
    return this.request.post<Response<null>>({
      method: 'addto', body: { seekId, reward }, type: 'form', unwrap: false
    }).then(this.isSuccessful.bind(this));
  }

  /**
   * @description To request someone else to seek the torrent
   * @param options
   */
  public async create(options: CreateSeekTorrentInput) {
    if (this.utils.isEmpty(options)) throw new MissingArgumentError('options');
    if (this.utils.isEmpty(options.title)) throw new MissingArgumentError('options.title');
    if (this.utils.isEmpty(options.intro)) throw new MissingArgumentError('options.intro');
    if (!this.utils.has(options, 'category')) throw new MissingArgumentError('options.category');
    if (!this.utils.has(options, 'reward')) throw new MissingArgumentError('options.reward');
    if (!this.utils.has(options, 'dmmCode')) options.dmmCode = '';

    if (options.reward <= 999) throw new Error('Minimum reward is 1000');

    return this.request.post<string>({ method: 'create', body: options });
  }

  /**
   * @description To get the detail of the seeking torrent
   * @param { string | number } seekId
   */
  public async detail(seekId: string | number) {
    if (this.utils.isEmpty(seekId)) throw new MissingArgumentError('seekId');
    return this.request.post<SeekDetailOutput>({ method: 'seek_detail', body: { seekId }, type: 'form' });
  }


  public async edit() {}
  public async recovery() {}
  public async search() {
    return this.request.post({ method: 'seek_search' });
  }
  public async submit() {}
  public async take() {}

}

export default Seek;
