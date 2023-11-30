const User = require('../models/User');

module.exports = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // ตรวจสอบความยาวของ password
    if (password.length <= 5) {
        req.flash('validationErrors', 'Password ต้องมีมากกว่า 5 ตัวอักษร');
        req.flash('data', req.body);
        return res.redirect('/register');
    }

    // ตรวจสอบว่า password ไม่ใช่ตัวเลข 0-9
    if (/^\d+$/.test(password)) {
        req.flash('validationErrors', 'Password ต้องไม่เป็นตัวเลข 0-9');
        req.flash('data', req.body);
        return res.redirect('/register');
    }

    const isHotmailOrOutlook = email.match(/@(hotmail\.com|outlook\.com)$/);
    const isGmail = email.match(/@gmail\.com$/);

    if (isHotmailOrOutlook) {
        req.flash('validationErrors', 'ไม่สามารถลงทะเบียนด้วย Hotmail และ Outlook ได้');
        req.flash('data', req.body);
        return res.redirect('/register');
    }

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
