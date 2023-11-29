const User = require('../models/User')
//เหมือนกับ redirectIfAuth แต่ต่างกันตรงที่ส่วนนี้จะป้องกันไม่ให้ user เข้าถึงส่วนข้อมูลเมื่อยังไม่ได้ login

//เป็นการป้องกันไม่ให้ user คลิกเข้าไปดูเนื้อหาของหนังสือ เมื่อ user ยังไม่ได้ login เข้าสู่ระบบ
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
      
      
    }
    res.redirect('/');
    
  }


module.exports = (req, res, next) => {
    User.findById(req.session.userId).then((user) => {
        if (!user) {
            return res.redirect('/')//เป็นการเช็คว่าถ้าไม่มีการ loginให้กลับไปหน้าแรก
        }
        console.log('User logged in successfully')
        next()
    }).catch(error => {
        console.error(error)
    })
}