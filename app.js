const express = require('express');
const app = express();
const multer = require('multer')
const port = '3000';


const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage:storage})
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))
app.get('/', (req, res) => {
    res.render('upload')
})

app.post('/upload', upload.single('uploaded_file'), (req, res)=> {
    if(!req.file){
        return res.status(400).send("no file uploaded")
    }
    res.send('file uploaded')
})


app.listen(port, ()=> {
    console.log("server is running at", port)
})