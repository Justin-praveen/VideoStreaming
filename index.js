const express = require("express");

const streams = require("stream")

const path = require("path")


const Dummyfile  = require("./Dummy.txt")

const fs  = require("fs")

const app = express()

app.get("/text",async(req,res)=>{

      // Set the appropriate headers
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Disposition', 'attachment; filename=file.txt');
  
      // Create a read stream for the file
      const fileStream = fs.createReadStream("/home/justin/Desktop/Stream/Server/Dummy.txt");
  
      // Pipe the file stream to the response stream
      fileStream.pipe(res);
}) 

app.get("/videos",async(req,res)=>{

    // Set the appropriate headers
    res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Content-Disposition', 'inline');

    // Create a read stream for the file
    const fileStream = fs.createReadStream("/home/justin/Desktop/Stream/Server/files.mp4");

    // Pipe the file stream to the response stream
    fileStream.pipe(res);
}) 

app.listen(7000,()=>{
    console.log("Port connected")
})


app.get('/video', (req, res) => {
   
    const stat = fs.statSync("/home/justin/Desktop/Stream/Server/files.mp4");
    const fileSize = stat.size;
    const range = req.headers.range;
  
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;
      const file = fs.createReadStream("/home/justin/Desktop/Stream/Server/files.mp4", { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      };
  
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
  
      res.writeHead(200, head);
      fs.createReadStream("/home/justin/Desktop/Stream/Server/files.mp4").pipe(res);
    }
  });


