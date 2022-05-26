import express from 'express'
import config from './utils/config'
import './service/crontab'

const app = express()

app.get(config.baseUrl, (req, res) => {
  res.send('service status ok')
})

app.listen(config.port, () => {
  console.log('http://localhost:3000')
})