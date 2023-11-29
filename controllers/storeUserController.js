const User = require('../models/User');
//รับค่าจาก form ใน register มาหลังจากนั้นนำข้อมูลที่ได้รับไปเก็บไว้ใน database
//ดึงข้อมูลมาจาก /models/User
//หากมี error ให้แสดงข้อความ error ออกมายัง user

module.exports = (req, res) => {
    // รับข้อมูลมาจาก form email เพื่อตรวจสอบ
    // ถ้าใน form เป็น hotmail และ outlook ให้แจ้ง alert ขึ้นมา และให้ redirect ในหน้า register
    const email = req.body.email;
    const isHotmailOrOutlook = email.match(/@(hotmail\.com|outlook\.com)$/);
    const isGmail = email.match(/@gmail\.com$/);
    //จับ error หาก user กรอก hotmail และ outlook ให้ขึ้น alert และไม่ให้บันทึกข้อมูลนี้ลง database
    if (isHotmailOrOutlook) {
        req.flash('validationErrors', 'ไม่สามารถลงทะเบียนด้วย Hotmail และ Outlook ได้');
        req.flash('data', req.body);
        return res.redirect('/register');
    }
     //จับ error หาก user กรอกสิ่งที่ไม่ใช้ email เช่น test@sdfsdfsd.com เป็นต้น ให้ขึ้น alert และไม่ให้บันทึกข้อมูลนี้ลง database
    if (!isGmail) {
        req.flash('validationErrors', 'ให้ใช้ @Gmail.com เท่านั้น');
        req.flash('data', req.body);
        return res.redirect('/register');
    }

    User.create(req.body)
        .then(() => {
            console.log("User registered successfully");
            res.redirect('/');
        })
        .catch((error) => {
            console.error(error.errors);
            if (error) {
                const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
                req.flash('validationErrors', validationErrors);
                req.flash('data', req.body);
                return res.redirect('/register');
            }
        });
};