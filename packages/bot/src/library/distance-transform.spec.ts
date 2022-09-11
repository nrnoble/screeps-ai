import { SysCall } from 'kernel';
import { distanceTransform } from './distance-transform';

const mapToDT = (map: number[][]): number[][] => {
  // Assume square
  const size = map.length;
  const cm = new PathFinder.CostMatrix();
  // Seed cost matrix
  map.forEach((row, x) => {
    row.forEach((value, y) => {
      cm.set(x, y, value === 0 ? 0 : Infinity);
    });
  });

  const uut = distanceTransform({ x: [0, size - 1], y: [0, size - 1] }, cm);

  // Unwind the generator
  let result: IteratorResult<void | SysCall, CostMatrix>;
  do {
    result = uut.next();
  } while (!result.done);

  // Populate a map with result
  const arr = Array.from(Array(size), () => [] as number[]);
  for (let x = 0; x <= size - 1; ++x) {
    for (let y = 0; y <= size - 1; ++y) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      arr[x]![y] = result.value.get(x, y);
    }
  }

  return arr;
};

describe('distance-transform', () => {
  it('sees borders as edges', () => {
    const result = mapToDT([
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ]);
    expect(result).toEqual([
      [1, 1, 1],
      [1, 2, 1],
      [1, 1, 1],
    ]);
  });
  it('respects walls', () => {
    const result = mapToDT([
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ]);
    expect(result).toEqual([
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ]);
  });
  it('measures distance', () => {
    const result = mapToDT([
      [1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ]);
    expect(result).toEqual([
      [1, 1, 1, 1, 1],
      [1, 0, 1, 2, 1],
      [1, 1, 1, 2, 1],
      [1, 2, 2, 2, 1],
      [1, 1, 1, 1, 1],
    ]);
  });
});
