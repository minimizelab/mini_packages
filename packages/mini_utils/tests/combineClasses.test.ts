import { combineClasses } from '../src/combineClasses';

describe('combineClasses', () => {
  it('combine strings', () => {
    expect(combineClasses(['test', 'hej'])).toEqual('test hej');
  });
  it('combine strings and objects', () => {
    expect(combineClasses(['test', { hello: true }])).toEqual('test hello');
  });
  it('handles undefined', () => {
    expect(combineClasses([undefined, 'hello'])).toEqual('hello');
  });
});
