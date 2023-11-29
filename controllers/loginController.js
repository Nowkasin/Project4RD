module.exports = (req, res) => {
    const alertMessage = req.session.alertMessage;
    // Clear the alert message from session
    req.session.alertMessage = undefined;
    res.render('login', { alertMessage: alertMessage });
}
// exports หน้า login ออกมา