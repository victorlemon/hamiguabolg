import express from 'express'
import bodyParser from 'body-parser'
import mysql from 'mysql'
import cors from 'cors'

import jwt from 'jsonwebtoken'

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'bolg'
})

db.connect((err) => {
  if (err) throw err
  console.log('Connected to database')
})

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post('/api/posts', (req, res) => {
  const post = req.body
  const query = 'INSERT INTO posts SET ?'
  db.query(query, post, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

app.post('/api/categories', (req, res) => {
  const category = req.body
  const query = 'INSERT INTO categories SET ?'
  db.query(query, category, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

app.get('/api/posts', (req, res) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) throw err
    res.json(results)
  })
})
// 注册接口
app.post('/api/register', async (req, res) => {
  try {
    // 检查用户名是否已经存在
    db.query(
      'SELECT * FROM users WHERE username = ?',
      [req.body.username],
      async (error, results) => {
        if (error) {
          throw error
        }

        if (results.length > 0) {
          return res.status(400).json({ message: '用户名已存在' })
        } else {
          // 创建新用户
          db.query(
            'INSERT INTO users SET ?',
            { username: req.body.username, password: req.body.password },
            (error, results) => {
              if (error) {
                throw error
              }

              // 返回新创建的用户
              res.json({
                user: { _id: results.insertId, username: req.body.username }
              })
            }
          )
        }
      }
    )
  } catch (error) {
    res.status(500).json({ message: '服务器错误' })
  }
})

// 登录接口
app.post('/api/login', async (req, res) => {
  try {
    // 验证用户名和密码
    db.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [req.body.username, req.body.password],
      async (error, results) => {
        if (error) {
          throw error
        }

        if (results.length > 0) {
          // 生成 JWT
          const token = jwt.sign({ _id: results[0].id }, 'your_jwt_secret')

          // 返回用户和 JWT
          res.json({
            user: { _id: results[0].id, username: req.body.username },
            token
          })
        } else {
          return res.status(400).json({ message: '用户名或密码错误' })
        }
      }
    )
  } catch (error) {
    res.status(500).json({ message: '服务器错误' })
  }
})

app.listen(3000, () => console.log('Server running on port 3000'))
