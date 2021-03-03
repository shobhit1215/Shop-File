const fs=require('fs');

const requestHandler=(req,res)=>{


    const url= req.url;
   const method=req.method; 
    if(url==='/') //if the url is matched return the below html code as a response
    {
       res.write('<html>');
       res.write('<head><title>Return Message</title></head>');
       res.write('<body><form action="/message" method="POST" ><input type="text" name="XYZ"><button type="submit">SEND</button></form></body>');
       res.write('</html>');
       return res.end();
    }
    if(url==='/message' && method==='POST')
    {
       const body=[];
       req.on('data',(chunck)=>{   //read the data from the response
          console.log(chunck);
           body.push(chunck);
       });
       return req.on('end',()=>{          //write it in the file
          const ParseBody=Buffer.concat(body).toString();
          console.log(ParseBody);
          const mess=ParseBody.split('=')[1];
          //fs.writeFileSync('message.txt',mess);//it is a syncronous operation it blocks the code till the 
          //file operations compeleted
             fs.writeFile('message.txt',mess, err =>{ //It accepts a callback function which get's executed after some time
                res.statusCode=302;
                res.setHeader('Location','/');
                return res.end();
             });      
       
       });
 
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Hello from my node.js server</h1></body>');
    res.write('</html>');
    res.end();
 
};
module.exports={handler:requestHandler};//requestHandler function gets exported to.


