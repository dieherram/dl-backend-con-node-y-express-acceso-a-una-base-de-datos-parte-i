import express from 'express'
import cors from 'cors'

import { findAll, create } from './models/posts.models.js'
import { validateFields } from '../utils/errors.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

app.get('/posts', async (req, res) => {
  try {
    const result = await findAll()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ status: false, message: `Ha ocurrido un error ${error}` })
  }
})

app.post('/posts', async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body

    const errors = validateFields({ titulo, url, descripcion });

    if (errors.length > 0) {
      return res.status(400).json({ status: false, errors });
    }

    const result = await create(titulo, url, descripcion)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ status: false, message: `Ha ocurrido un error ${error}` })
  }
})

app.all('*', (req, res) => res.status(400).json({ status: true, message: 'Endpoint no encontrado' }))

app.listen(PORT, () => { console.log(`Servidor funcionando en puerto: ${PORT}`) })
