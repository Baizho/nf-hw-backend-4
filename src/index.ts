import 'dotenv/config'
import express from 'express'
import { createServer } from 'node:http'
import connectDB from './db'
import globalRouter from './routes/global-router'
import { logger } from './logger'
import { createBucket, listBuckets } from './middlewares/S3-middleware'

connectDB()

const app = express()

app.use(express.json())
app.use(logger)
app.use('/api/v5', globalRouter)

const server = createServer(app)

// createBucket("my-bucket-nurmyrza");
listBuckets();

const PORT = process.env.PORT;
// const fileparser = require('./fileparser');

app.get('/', (req, res) => {
  res.send(`
    <h2>File Upload With <code>"Node.js"</code></h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>Select a file: 
        <input name="file" type="file" />
      </div>
      <input type="submit" value="Upload" />
    </form>

  `);
});

app.post('/api/upload', async (req, res) => {
  // await fileparser(req)
  // .then(data => {
  //   res.status(200).json({
  //     message: "Success",
  //     data
  //   })
  // })
  // .catch(error => {
  //   res.status(400).json({
  //     message: "An error occurred.",
  //     error
  //   })
  // })
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}.`);
// })

server.listen(PORT, () => {
  console.log('server running at http://localhost:3000/api/v5')
})
