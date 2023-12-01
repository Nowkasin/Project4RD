const express = require('express') //เรียกใช้ตัว express
const app = express()//เรียกใช้ตัว express ผ่านตัวแปร app
const ejs = require('ejs')//เรียกใช้ file .ejs
const mongoose = require('mongoose')//เรียกใช้ mongoose ใช้สำหรับทำงานกับฐานข้อมูง
const expressSession = require('express-session')//เรียกใช้ express-session เพื่อเก็บ session ของ user
const flash = require('connect-flash')//เรียกใช้ flash เพื่อเก็บข้อความ error เพื่อแสดงผลเมื่อ user ไม่ได้กรอกข้อมูล



//connection of mongoDB
//mongodb+srv://admin:1234@cluster0.jkwkvib.mongodb.net/?retryWrites=true&w=majority connect string จากเว็บ mongoDB
mongoose.connect('mongodb+srv://admin:1234@cluster0.jkwkvib.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true //เป็นการ connect mongo แบบ url
})

// global เป็นตัวแปรที่ใช้เก็บตัวแปรหรือค่าที่สามารถเข้าถึงได้จากทุกที่ในแอปพลิเคชัน
// global.loggedIn คือค่าที่บอกว่าผู้ใช้ได้ล็อกอินเข้าสู่ระบบแล้ว และ ใช้ในการตรวจสอบสิทธิ์การเข้าถึงหน้าที่ต้องการล็อกอินเพื่อเข้าถึงได้
global.loggedIn = null



// Controllers ดึงการ export จาก folder controllers เพื่อให้สามารถ export หน้าเว็บได้
const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const storeUserController = require('./controllers/storeUserController')//เก็บข้อมูลจาก register
const loginUserController = require('./controllers/loginUserController')
const logoutController = require('./controllers/logoutController')
const profileController = require('./controllers/profileController')
const mapController = require('./controllers/mapController')
const RListController = require('./controllers/RListController')
const BKdetail = require('./controllers/Oshidetail/BKdetail')
const BKdetail2 = require('./controllers/Oshidetail/BKdetail2')
const BKdetail3 = require('./controllers/Oshidetail/BKdetail3')
const BKdetail4 = require('./controllers/Oshidetail/BKdetail4')
const BKdetail5 = require('./controllers/Oshidetail/BKdetail5')
const BKdetail6 = require('./controllers/Oshidetail/BKdetail6')
const BKdetail7 = require('./controllers/Oshidetail/BKdetail7')
const BKdetail8 = require('./controllers/Oshidetail/BKdetail8')
const BKdetail9 = require('./controllers/Oshidetail/BKdetail9')
const BKdetail10 = require('./controllers/Oshidetail/BKdetail10')
const BKdetail11 = require('./controllers/Oshidetail/BKdetail11')
const BKdetail12 = require('./controllers/Kusuriyadetail/KusuriyaDT1')
const BKdetail13 = require('./controllers/Kusuriyadetail/KusuriyaDT2')
const BKdetail14 = require('./controllers/Kusuriyadetail/KusuriyaDT3')
const BKdetail15 = require('./controllers/Kusuriyadetail/KusuriyaDT4')
const BKdetail16 = require('./controllers/Kusuriyadetail/KusuriyaDT5')
const BKdetail17 = require('./controllers/Kusuriyadetail/KusuriyaDT6')
const BKdetail18 = require('./controllers/Kusuriyadetail/KusuriyaDT7')
const BKdetail19 = require('./controllers/Kusuriyadetail/KusuriyaDT8')
const BKdetail20 = require('./controllers/shangri/shangriDT1')
const BKdetail21 = require('./controllers/shangri/shangriDT2')
const BKdetail22 = require('./controllers/shangri/shangriDT3')
const BKdetail23 = require('./controllers/shangri/shangriDT4')
const BKdetail24 = require('./controllers/shangri/shangriDT5')
const BKdetail25 = require('./controllers/shangri/shangriDT6')
const BKdetail26 = require('./controllers/shangri/shangriDT7')
const BKdetail27 = require('./controllers/shangri/shangriDT8')
const BKdetail28 = require('./controllers/Sasayaku/SasayakuDT1')
const BKdetail29 = require('./controllers/Sasayaku/SasayakuDT2')
const BKdetail30 = require('./controllers/Sasayaku/SasayakuDT3')
const BKdetail31 = require('./controllers/Sasayaku/SasayakuDT4')
const BKdetail32 = require('./controllers/Sasayaku/SasayakuDT5')
const BKdetail33 = require('./controllers/Sasayaku/SasayakuDT6')
const BKdetail34 = require('./controllers/Sasayaku/SasayakuDT7')
const BKdetail35 = require('./controllers/Skip/Skip1')
const BKdetail36 = require('./controllers/Skip/Skip2')
const BKdetail37 = require('./controllers/Chitose/ChitoseDT1')
const BKdetail38 = require('./controllers/Chitose/ChitoseDT2')
const BKdetail39 = require('./controllers/Chitose/ChitoseDT3')
const BKdetail40 = require('./controllers/Youchien/youchien1')
const BKdetail41 = require('./controllers/Youchien/youchien2')
const BKdetail42 = require('./controllers/Youchien/youchien3')
const BKdetail43 = require('./controllers/Satou/satou1')
const BKdetail44 = require('./controllers/Satou/satou2')
const BKdetail45 = require('./controllers/Satou/satou3')
const BKdetail46 = require('./controllers/shangri/shangriDT9')
const BKdetail47 = require('./controllers/kang/kang1')
const BKdetail48 = require('./controllers/kang/kang2')
const BKdetail49 = require('./controllers/kang/kang3')
const BKdetail50 = require('./controllers/kang/kang4')
const BKdetail51 = require('./controllers/kang/kang5')
const BKdetail52 = require('./controllers/komarin/komarin1')
const BKdetail53 = require('./controllers/komarin/komarin2')
const BKdetail54 = require('./controllers/komarin/komarin3')
const CONTACTUS = require('./controllers/ContactUS')
const Allbook = require('./controllers/Allbook')
const FindBookController = require('./controllers/FindbookController')



//middelware
const redirectIfAuth = require('./middleware/redirectIfAuth')
const authMiddleware = require('./middleware/authMiddleware')



app.use(express.static('public'))//เป็นการเข้าถึงตัว floder public เพื่อให้สามารถใช้ file ที่อยู่ใน public ได้
app.use(express.json())// ใช้สำหรับ แปลงข้อมูลที่มีรูปแบบ JSON String ให้อยู่ในรูป JSON Objext  
app.use(express.urlencoded())// ใช้สำหรับแปลงข้อมูลจาก form ในรูปแบบ url encode เป็น Object
app.use(flash())//เป็นตัวแจ้งสถานะ(Alert)
//expressSession หลังจ่าก login เข้าสู่ระบบแล้ว Server จะสร้าง Session เก็บไว้ หลังจากนั้นจะส่งข้อมูล และคุกกี้ (Cookie) กลับไปให้ Client
// เป็น key ที่ใช้ในการเข้ารหัส session data ที่ถูกส่งไปยังผู้ใช้
app.use(expressSession({
    secret: "node secret"
}))
//ส่วนนี้สามารถเข้าถึงได้ทุก path โดยจะมีการดึงข้อมูลจาก session ลงไปใตัวแปร loggedIn
app.use("*", (req, res, next) => {
    //นำข้อมูล session ที่เข้าถึง  userId เก็บไว้ในตัวแปร loggedIn
    loggedIn = req.session.userId
    next()
})


app.set('view engine', 'ejs')//set ค่าให้ใช้งานนามสกุล 'ejs','php ได้

//กำหนด path ให้กับเว็บ
app.get('/', indexController)
app.get('/profile' ,authMiddleware, profileController)
app.get('/login',redirectIfAuth,loginController)
app.get('/register',redirectIfAuth,registerController)
app.post('/user/register',redirectIfAuth,storeUserController)
app.post('/user/login',redirectIfAuth,loginUserController)
app.get('/logout',logoutController)
app.get('/map',mapController)
app.get('/list',authMiddleware,RListController)
app.get('/detail/Oshi1',authMiddleware,BKdetail)
app.get('/detail/Oshi2',authMiddleware,BKdetail2)
app.get('/detail/Oshi3',authMiddleware,BKdetail3)
app.get('/detail/Oshi4',authMiddleware,BKdetail4)
app.get('/detail/Oshi5',authMiddleware,BKdetail5)
app.get('/detail/Oshi6',authMiddleware,BKdetail6)
app.get('/detail/Oshi7',authMiddleware,BKdetail7)
app.get('/detail/Oshi8',authMiddleware,BKdetail8)
app.get('/detail/Oshi9',authMiddleware,BKdetail9)
app.get('/detail/Oshi10',authMiddleware,BKdetail10)
app.get('/detail/Oshi11',authMiddleware,BKdetail11)
app.get('/detail/Kusuriya1',authMiddleware,BKdetail12)
app.get('/detail/Kusuriya2',authMiddleware,BKdetail13)
app.get('/detail/Kusuriya3',authMiddleware,BKdetail14)
app.get('/detail/Kusuriya4',authMiddleware,BKdetail15)
app.get('/detail/Kusuriya5',authMiddleware,BKdetail16)
app.get('/detail/Kusuriya6',authMiddleware,BKdetail17)
app.get('/detail/Kusuriya7',authMiddleware,BKdetail18)
app.get('/detail/Kusuriya8',authMiddleware,BKdetail19)
app.get('/detail/shangri1',authMiddleware,BKdetail20)
app.get('/detail/shangri2',authMiddleware,BKdetail21)
app.get('/detail/shangri3',authMiddleware,BKdetail22)
app.get('/detail/shangri4',authMiddleware,BKdetail23)
app.get('/detail/shangri5',authMiddleware,BKdetail24)
app.get('/detail/shangri6',authMiddleware,BKdetail25)
app.get('/detail/shangri7',authMiddleware,BKdetail26)
app.get('/detail/shangri8',authMiddleware,BKdetail27)
app.get('/detail/shangri9',authMiddleware,BKdetail46)
app.get('/detail/Sasayaku1',authMiddleware,BKdetail28)
app.get('/detail/Sasayaku2',authMiddleware,BKdetail29)
app.get('/detail/Sasayaku3',authMiddleware,BKdetail30)
app.get('/detail/Sasayaku4',authMiddleware,BKdetail31)
app.get('/detail/Sasayaku5',authMiddleware,BKdetail32)
app.get('/detail/Sasayaku6',authMiddleware,BKdetail33)
app.get('/detail/Sasayaku7',authMiddleware,BKdetail34)
app.get('/detail/Skip1',authMiddleware,BKdetail35)
app.get('/detail/Skip2',authMiddleware,BKdetail36)
app.get('/detail/Chitose1',authMiddleware,BKdetail37)
app.get('/detail/Chitose2',authMiddleware,BKdetail38)
app.get('/detail/Chitose3',authMiddleware,BKdetail39)
app.get('/detail/Youchien1',authMiddleware,BKdetail40)
app.get('/detail/Youchien2',authMiddleware,BKdetail41)
app.get('/detail/Youchien3',authMiddleware,BKdetail42)
app.get('/detail/Satou-san1',authMiddleware,BKdetail43)
app.get('/detail/Satou-san2',authMiddleware,BKdetail44)
app.get('/detail/Satou-san3',authMiddleware,BKdetail45)
app.get('/detail/Kang1',authMiddleware,BKdetail47)
app.get('/detail/Kang2',authMiddleware,BKdetail48)
app.get('/detail/Kang3',authMiddleware,BKdetail49)
app.get('/detail/Kang4',authMiddleware,BKdetail50)
app.get('/detail/Kang5',authMiddleware,BKdetail51)
app.get('/detail/Komarin1',authMiddleware,BKdetail52)
app.get('/detail/Komarin2',authMiddleware,BKdetail53)
app.get('/detail/Komarin3',authMiddleware,BKdetail54)
app.get('/contact',authMiddleware,CONTACTUS)
app.get('/find',authMiddleware ,FindBookController)
app.get('/allbook',authMiddleware,Allbook)


app.listen(4100, () => {
    console.log("App listening on port 4100")
})