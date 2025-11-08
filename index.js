const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let tareas = [];

app.post('/tareas', (req, res) => {
  const { id, descripcion } = req.body;
  tareas.push({ id, descripcion });
  res.status(201).send({ id, descripcion });
});

app.get('/tareas', (req, res) => {
  res.send(tareas);
});

app.put('/tareas/:id', (req, res) => {
  const { id } = req.params;
  const { descripcion } = req.body;
  const tareaIndex = tareas.findIndex(t => t.id === id);
  if (tareaIndex !== -1) {
    tareas[tareaIndex].descripcion = descripcion;
    res.send(tareas[tareaIndex]);
  } else {
    res.status(404).send({ error: 'Tarea no encontrada' });
  }
});

app.delete('/tareas/:id', (req, res) => {
  const { id } = req.params;
  const tareaIndex = tareas.findIndex(t => t.id === id);
  if (tareaIndex !== -1) {
    tareas.splice(tareaIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send({ error: 'Tarea no encontrada' });
  }
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});