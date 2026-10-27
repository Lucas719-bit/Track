import http from 'node:http';
import {readFile} from 'node:fs/promises';
const allowed=new Set(['index.html','style.css','app.js','tracking.js']);
http.createServer(async(req,res)=>{const name=new URL(req.url,'http://localhost').pathname.slice(1)||'index.html';if(!allowed.has(name)){res.writeHead(404).end();return;}try{const data=await readFile(new URL(name,import.meta.url));res.setHeader('Content-Type',name.endsWith('.html')?'text/html':name.endsWith('.css')?'text/css':'text/javascript');res.end(data);}catch{res.writeHead(500).end('Unable to load app');}}).listen(5173,'127.0.0.1',()=>console.log('Track: http://localhost:5173'));
