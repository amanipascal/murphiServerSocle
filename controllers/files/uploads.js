

exports.uploaded = async (req, res) => {
    res.json({ file_data: req.file });
}
