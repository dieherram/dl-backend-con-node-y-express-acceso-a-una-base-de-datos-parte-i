import db from '../database/db_connect.js'

export const findAll = async () => await db('SELECT * FROM posts')

export const create = async (titulo, url, descripcion) =>
  await db('INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3) RETURNING *;', [titulo, url, descripcion])
