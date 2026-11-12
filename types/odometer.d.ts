// Minimal typings for odometer@0.4.8 (ships without types).
declare module "odometer" {
  interface OdometerOptions {
    el: HTMLElement;
    value?: number;
    format?: string;
    theme?: string;
    duration?: number;
  }

  export default class Odometer {
    constructor(options: OdometerOptions);
    update(value: number): void;
  }
}

interface Window {
  odometerOptions?: { auto?: boolean };
}
