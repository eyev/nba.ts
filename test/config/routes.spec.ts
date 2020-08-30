import { ROUTES } from '../../src/config/routes';

describe('routes', () => {
  test('has stats property', () => expect(ROUTES).toHaveProperty('stats'));
  test('has data prop', () => expect(ROUTES).toHaveProperty('data'));
});
