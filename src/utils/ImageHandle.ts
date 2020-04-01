import * as sharp from 'sharp';
import * as request from "request"
import { Writable } from 'stream';
import { response } from 'express';

function resizeImg (url: string, writer: Writable) {
  
  request.get(url)
  .on('error', err => {
    console.log (err)
    writer.write(JSON.stringify({
      success: false
    }))
  }).pipe(sharp().resize({ width: 250 }).png()).pipe(writer)
}

export default resizeImg