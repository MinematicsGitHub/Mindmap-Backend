import fs from 'fs'
import compression from "compression";
import * as dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { pagination } from "typeorm-pagination";
import Routes from './routes/Routes';
const helmet = require("helmet");
var cors = require('cors')
const cookieParser = require('cookie-parser');
const path = require('path');

try {

  dotenv.config();

  const PORT = process.env.PORT || 5009;
  const app = express();
  var bodyParser = require('body-parser');
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(helmet());
  app.use(cors(
    {
      origin: [
        // "http://192.168.29.140:8081",
        "http://localhost:3000",
        "http://192.168.43.197:3002", // give correct IP
      ],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }
  ))

  app.use(cookieParser());

  app.use(
    compression({
      threshold: 0,
      level: 6,
      filter: function () {
        return true;
      },
    })
  );
  app.use(pagination);

  app.use("/api", Routes);

  app.get("/health", (_, res) => {
    res.status(200).json({
      success: true,
      message: "API IS WORKING on 05/09/2023",
    });
  });

  createConnection()
    .then(async () => {
      app.listen(PORT, () => {
        console.log(`CONNECTED TO DB AND SERVER STARTED ON PORT  ${PORT}`);
      });
    })
    .catch((error: any) => console.log(error));


  // Serve uploaded images
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  // GET endpoint to retrieve uploaded  images
  app.get('/image/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = `./uploads/${imageName}`;

    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.status(404).send(err);
        return;
      }

      res.setHeader('Content-Type', 'image/jpeg');
      res.send(data);
    });
  });

} catch (error) {

  const content = error.message + '\n'

  fs.writeFile('./test.txt', content, { flag: 'a+' }, err => {
    if (err) {
      console.error(err)
      return
    }
    console.log('file written successfully');

  })
}

