

exports.uploaded = async (req, res) => {
    res.json({ file: req.file });
}


// app.post('/upload', upload.single('avatar'), (req, res) => {
//     console.log('File :', req.file)

//     res.redirect('/')
//   });