import Seed from './seed.js';
import Member from './member.js';
import Laboratory from './laboratory.js';
import System from './system.js';

export interface BreadOptions {
  // To generate an api key, visit m-team's Laboratory page.
  key: string;
  // Example: https://m-*.*/**. Default is test environment of m-team.
  url?: string;
}

class Bread {

  public seed: Seed;
  public member: Member;
  public laboratory: Laboratory;
  public system: System;


  /**
   * =============================== Alias Definitions ===============================
   */
  public lab: Laboratory;
  public sys: System;



  constructor(protected options: BreadOptions) {
    if (typeof options !== 'object') {
      throw new Error('options must be an object of type BreadOptions');
    }

    if (!options.key) {
      throw new Error('options.key is required');
    }

    this.seed = new Seed(options);
    this.member = new Member(options);
    this.lab = this.laboratory = new Laboratory(options);
    this.sys = this.system = new System(options);
  }
}

export default Bread;

