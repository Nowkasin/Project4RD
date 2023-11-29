const bcrypt = require('bcrypt')
const User = require('../models/User')
const match = require('nodemon/lib/monitor/match')

module.exports = async (req, res) => {
    //ดึงข้อมูล nameuser และ password จาก form login มา
    const { nameuser, password } = req.body;
    
    // Check if username and password are provided
    if (!nameuser || !password) {
        req.session.alertMessage = 'Please enter both username and password.';
        req.session.alertType = 'error';
        return res.redirect('/login');
    }

    try {
        // นำ  nameuser ที่รับค่ามาจาก form มาหหาใน datsbase โดยจะรอจนกว่าคำสั่งนั้นจะทำงานเสร็จแล้วค่อยส่งค่าออกไป
        let user = await User.findOne({ nameuser: nameuser });

        //ถ้า nameuser ในตัวแปร user ตรงกับฐานข้อมูล
        if (user) {
            // นำ password ที่ถูกเข้ารหัสแล้วมาค้นหาใน database
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                // ถ้า password ตรงกับฐานข้อมูลก็ให้ดึงตัว id ใน ฐานข้อมูลออกมาจากนั้นให้ redirect กลับไปยังหน้า index
                //user._id มาจากฐานข้อมูลซึ่งจะูกเก็บไว้ใน userId ที่ถูกเรียกออกมา
                req.session.userId = user._id;
                //หลังจากตรวจสอบ nameuser,password(ข้อมูลตรงกับฐานข้อมูล) และ ดึึง userId ออกมาแล้วให้ redirect กลับไปยังหน้าแรก
                return res.redirect('/');
            } else {
                // ถ้า password ไม่ตรงกับฐานข้อมูลก็ให้แสดง error
                req.session.alertMessage = 'Invalid password. Please try again.';
                req.session.alertType = 'password';
                return res.redirect('/login');
            }
        } else {
            // ถ้า nameuser ในตัวแปร user ไม่ตรงกับฐานข้อมูลให้แสดง error
            req.session.alertMessage = 'Invalid username. Please try again.';
            req.session.alertType = 'username';
            return res.redirect('/login');
        }
    } catch (error) {
        // ถ้าเกิดข้อผิดพลาดในการเข้าถึงฐานข้อมูลให้แสดง error
        console.error(error);
        req.session.alertMessage = 'An error occurred. Please try again later.';
        req.session.alertType = 'error';
        return res.redirect('/login');
    }
};
