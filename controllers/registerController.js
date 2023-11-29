//ใช้สำหรับตรวจสอบและแจ้งเตือนข้อมูลให้ user
module.exports = (req,res) => {
    
    let email = ""  
    let password = ""
    let nameuser = ""
    let tel = ""
    let day = ""
    let month = ""
    let year = ""
    let data = req.flash('data')[0]// นำข้อมูลจาก flash ที่ชื่อdata มาเก็บไว่ในตัวแปร data

   // ถ้าตัวแปรข้อมูล data มีค่าอยู่แล้วให้ทำการ set ค่าให้กับตัวแปรข้างบนโดยการเข้าถึง data. ตัวแปรด้านบน
    if(typeof data != "undefined"){
        email = data.email
        password = data.password
        nameuser = data.nameuser
        tel = data.tel
        day = data.day
        month = data.month
        year = data.year
    }
  
    res.render('register',{
        //เรียกใช้ข้อความ error ส่งไปยังหน้า register
        //validationErrors เป็นตัวแปรไว้เก็บค่า error ซึ่งมาจาก file storeUserController
       errors: req.flash('validationErrors'),
       email: email,
       password: password,
       nameuser: nameuser,
       tel: tel,
       day: day,
       month: month,
       year: year
    })

}