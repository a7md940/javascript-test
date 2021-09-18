import { List } from './index.js'

describe('List', () => {
  it('should create list', () => {
    const list = List({ initial: [1, 2, 3, 4], initialOrder: true })
    const expected = [1, 2, 3, 4];
    const actual = list.items

    expect(actual).toEqual(expected)
  })

  it('should sort initial list items', () => {
    const list = List({ initial: [4, 3, -1, 1, 2, 5, 0] })
    const expected = [-1, 0, 1, 2, 3, 4, 5];
    const actual = list.items

    expect(actual).toEqual(expected)
  })

  it('should sort initial list items', () => {
    const list = List({ initial: [100, -100, 10, 9, 200, -300] })
    const expected = [-300, -100, 9, 10, 100, 200];
    const actual = list.items

    expect(actual).toEqual(expected)
  })

  it('should insert b into list a', () => {
    const list = List({ initial: [1, 2, 3, 4], initialOrder: true })
    const expected = [1, 2, 3, 4, 5];
    const actual = list.insert(5).items

    expect(actual).toEqual(expected)
  })

  it('should remove b from list a', () => {
    const list = List({ initial: [1, 2, 3, 4], initialOrder: true })
    const expected = [1, 2, 3];
    const actual = list.remove(4).items

    expect(actual).toEqual(expected)
  })

  it('[numbers] should findIndex of b at list a', () => {
    const list = List({ initial: [1, 2, 3, 4], initialOrder: true })
    const expected = 2;
    const actual = list.findIndex(3)

    expect(actual).toEqual(expected)
 })

  it('[by sortKey] should findIndex of b at list a', () => {
    const list = List({ initial: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }], initialOrder: true, sortKey: 'value' })
    const expected = 2;
    const actual = list.findIndex({ value: 3 })

    expect(actual).toEqual(expected)
  })

  // PLEASE cover the rest of the methods/scenarios with tests
  it('should insert b into the middle of the list a', () => {
    const list = List({ initial: [1, 2, 4, 5], initialOrder: true })
    const expected = [1, 2, 3, 4, 5];
    const actual = list.insert(3).items
    expect(actual).toEqual(expected)
  })
  it('(2) should insert b into the middle of the list a', () => {
    const list = List({ initial: [1, 2, 4, 5, 7, 10, 15, 16, 19, 21, 30, 35], initialOrder: true })
    const expected = [1, 2, 4, 5, 7, 10, 15, 16, 17, 19, 21, 30, 35];
    const actual = list.insert(17).items

    expect(actual).toEqual(expected)
  })
  it('(3) should insert b into the middle of the list a', () => {
    const list = List({ initial: [1, 2, 4, 5, 7, 10, 15, 16, 17, 19, 21, 30, 35], initialOrder: true })
    const expected = [1, 2, 4, 5, 7, 10, 15, 16, 17, 17, 19, 21, 30, 35];
    const actual = list.insert(17).items

    expect(actual).toEqual(expected)
  })
  it('should insert b into the end of the list a', () => {
    const list = List({ initial: [1, 2, 4, 5], initialOrder: true })
    const expected = [1, 2, 4, 5, 10];
    const actual = list.insert(10).items
    expect(actual).toEqual(expected)
  })
  it('should insert b into the start of the list a', () => {
    const list = List({ initial: [{ value: 1 }, { value: 2 }, { value: 4 }, { value: 5 }], initialOrder: true, sortKey: 'value' })
    const expected = [{ value: -7 }, { value: 1 }, { value: 2 }, { value: 4 }, { value: 5 }];
    const actual = list.insert({ value: -7 }).items
    expect(actual).toEqual(expected)
  })
})
