import { FETCH_OPTIONS } from '../../src/config/fetch-options';

describe('routes', () => {
  test('has stats property', () => expect(FETCH_OPTIONS).toHaveProperty('headers'));
  test('has data prop', () => expect(FETCH_OPTIONS).toHaveProperty('json'));
});
