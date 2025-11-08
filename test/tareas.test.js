const request = require('supertest');
const app = require('../index');

describe('API Gestor Tareas', () => {
  it('debería crear una tarea', async () => {
    const response = await request(app)
      .post('/tareas')
      .send({ id: '1', descripcion: 'Tarea de prueba' });
    expect(response.status).toBe(201);
    expect(response.body.descripcion).toBe('Tarea de prueba');
  });

  it('debería listar tareas', async () => {
    const response = await request(app).get('/tareas');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});