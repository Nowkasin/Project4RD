//เป็นการป้องกันไม่ให้ user เข้า path อื่นๆ แต่ส่วนนี้จะถูกใช้เมื่อมีการ login เข้าสู่ระบบแล้ว
module.exports = (req, res, next) => {
    //ถ้ามีการ login เข้ามาแล้วก็จะให้ redirect กลับไปยังหน้าแรก
    if(req.session.userId) {
        return res.redirect('/')
    }

    next()
}