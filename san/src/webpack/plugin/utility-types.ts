/** PartialLiteral */
export type PL = 'Partial';
/** RequiredLiteral */
export type RL = 'Required';

export type PartialOrRequired<T, F extends PL | RL> = {
  [P in keyof T]: F extends PL ? Partial<T[P]> : Required<T[P]>;
};
