const express=require("express");
const multer=require('multer');
const app=express()


app.use(express.static('./uploads'));
// const upload=multer({dest:"./uploads"});
const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        if(req.url=='/profile'){
            cb(null,"./uploads/profile")
        }else{
             cb(null,"./uploads/testing")
        }

    },
    filename:(req,file,cb)=>{
        let name=Date.now()+file.originalname
        cb(null,name)
    }
})
const upload =multer({storage})


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})
app.get('/profile',(req,res)=>{
    res.sendFile(__dirname+'/signup.html')
})
// I will use upload.array() instead of upload.single to upload
//  multiple files and also limit of files upload can be 
// set by using a second argument eg. upload.array("test-upload",2). now maximum 2 
// files can be uploaded
//upload.any("----") is used when u dont know user will submit single or multiple files
//upload.fields([{name:"test-upload",maxCount:2},{name:"test-upload1",maxCount:3}]) is used when there are multiple file inputs for the same end point
app.post('/upload',upload.array("test-upload"),(req,res)=>{
console.log(req.files);
// res.redirect('/');
// res.send(`<img src="/${req.file.filename}">`);
})

app.post('/profile',upload.array("profile-upload"),(req,res)=>{
    console.log(req.files);
})
app.listen(3000,(req,res)=>{
    console.log("server Started...");
})