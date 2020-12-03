import { FirstErrorPipe } from './first-error.pipe';

describe('FirstErrorPipe', () => {
  test('create an instance', () => {
    const pipe = new FirstErrorPipe();
    expect(pipe).toBeTruthy();
  });
});

describe('transform() should', () => {
  const pipe = new FirstErrorPipe();

  test('return first property name', () => {
    expect(pipe.transform({ one: 1, two: 2 })).toMatch('one');
  });

  test('return null when value null', () => {
    expect(pipe.transform(null)).toBeNull();
  });
});
