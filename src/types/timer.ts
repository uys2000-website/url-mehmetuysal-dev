export class Timer {
  _start!: number;
  _end!: number;
  start!: () => void;
  end!: (log: boolean) => void;
  log!: () => void;
  constructor() {
    this._start = 0;
    this._end = 0;
    this.start = () => {
      this._start = Date.now();
    };
    this.end = (log) => {
      this._end = Date.now();
      if (log) this.log();
    };
    this.log = () => {
      console.log(`
      Start Time is ${this._start}
      End Time is ${this._end}
      Compleated in ${this._end - this._start} ms
      `);
    };
  }
}
