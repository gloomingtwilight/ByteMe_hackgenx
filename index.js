

const http=require('http'); 
const server=http.createServer((req,res)=>
    {   if(req.url==='/profile'){
        res.end("The profile page"); 
    }if(req.url==='/about'){
        res.end("the about page"); 
    }

    }); 

    server.listen(3000)