import { UrlencodePipe } from './urlencode.pipe';

describe('UrlencodePipe', () => {
  it('create an instance', () => {
    const pipe = new UrlencodePipe();
    expect(pipe).toBeTruthy();
  });
});
