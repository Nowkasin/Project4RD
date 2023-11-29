module.exports = (req, res) => {
    //หากกดปุ่ม logout ระบบจะทำการลบ session ทิ้ง
    req.session.destroy(() => {
        res.redirect('/')
    })
}
//exports หน้า logout หลังจากกดปุ่ม logout แล้วให้ redirect กลับไปหา index