import { StatusExtractorPipe } from './status-extractor.pipe';

describe('StatusExtractorPipe', () => {
  it('create an instance', () => {
    const pipe = new StatusExtractorPipe();
    expect(pipe).toBeTruthy();
  });
});
