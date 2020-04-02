const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/config/database');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      /* .set('Authorization', 'asdlkalsdk') */
      .send({
        name: 'APAD',
        email: 'contato@apad.com.',
        whatsapp: '17988138299',
        city: 'Pguara',
        uf: 'GO'
      })
      .expect(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
