const express=require("express");
const multer=require('multer');
const app=express()


app.use(express.static('./uploads'));
const upload=multer({dest:"./uploads"});
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})
// I will use upload.array() instead of upload.single to upload
//  multiple files and also limit of files upload can be 
// set by using a second argument eg. upload.array("test-upload",2). now maximum 2 
// files can be uploaded
app.post('/upload',upload.single("test-upload"),(req,res)=>{
console.log(req.files);
// res.redirect('/');
res.send(`<img src="/${req.file.filename}">`);
})
app.listen(3000,(req,res)=>{
    console.log("server Started...");
})