const express = require('express') //เรียกใช้ตัว express
const app = express()//เรียกใช้ตัว express ผ่านตัวแปร app
const ejs = require('ejs')//เรียกใช้ file .ejs
const mongoose = require('mongoose')//เรียกใช้ mongoose ใช้สำหรับทำงานกับฐานข้อมูง
const expressSession = require('express-session')//เรียกใช้ express-session เพื่อเก็บ session ของ user
const flash = require('connect-flash')//เรียกใช้ flash เพื่อเก็บข้อความ error เพื่อแสดงผลเมื่อ user ไม่ได้กรอกข้อมูล
const passport = require('passport')

require('./controllers/passport')(passport)


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
const BKdetail = require('./controllers/BKdetail')
const BKdetail2 = require('./controllers/BKdetail2')
const BKdetail3 = require('./controllers/BKdetail3')
const BKdetail4 = require('./controllers/BKdetail4')
const BKdetail5 = require('./controllers/BKdetail5')
const BKdetail6 = require('./controllers/BKdetail6')
const BKdetail7 = require('./controllers/BKdetail7')
const BKdetail8 = require('./controllers/BKdetail8')
const BKdetail9 = require('./controllers/BKdetail9')
const BKdetail10 = require('./controllers/BKdetail10')
const BKdetail11 = require('./controllers/BKdetail11')
const BKdetail12 = require('./controllers/BKdetail12')
const BKdetail13 = require('./controllers/BKdetail13')
const BKdetail14 = require('./controllers/BKdetail14')
const BKdetail15 = require('./controllers/BKdetail15')
const BKdetail16 = require('./controllers/BKdetail16')
const BKdetail17 = require('./controllers/BKdetail17')
const BKdetail18 = require('./controllers/BKdetail18')
const BKdetail19 = require('./controllers/BKdetail19')
const BKdetail20 = require('./controllers/BKdetail20')
const BKdetail21 = require('./controllers/BKdetail21')
const BKdetail22 = require('./controllers/BKdetail22')
const BKdetail23 = require('./controllers/BKdetail23')
const BKdetail24 = require('./controllers/BKdetail24')
const BKdetail25 = require('./controllers/BKdetail25')
const BKdetail26 = require('./controllers/BKdetail26')
const BKdetail27 = require('./controllers/BKdetail27')
const CONTACTUS = require('./controllers/ContactUS')
const FindBookController = require('./controllers/FindbookController')



//middelware
const redirectIfAuth = require('./middleware/redirectIfAuth')
const authMiddleware = require('./middleware/authMiddleware')
const authgoogle = require('./auth')



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

app.use(passport.initialize());
app.use(passport.session());


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
app.get('/detail',authMiddleware,BKdetail)
app.get('/detail2',authMiddleware,BKdetail2)
app.get('/detail3',authMiddleware,BKdetail3)
app.get('/detail4',authMiddleware,BKdetail4)
app.get('/detail5',authMiddleware,BKdetail5)
app.get('/detail6',authMiddleware,BKdetail6)
app.get('/detail7',authMiddleware,BKdetail7)
app.get('/detail8',authMiddleware,BKdetail8)
app.get('/detail9',authMiddleware,BKdetail9)
app.get('/detail10',authMiddleware,BKdetail10)
app.get('/detail11',authMiddleware,BKdetail11)
app.get('/detail12',authMiddleware,BKdetail12)
app.get('/detail13',authMiddleware,BKdetail13)
app.get('/detail14',authMiddleware,BKdetail14)
app.get('/detail15',authMiddleware,BKdetail15)
app.get('/detail16',authMiddleware,BKdetail16)
app.get('/detail17',authMiddleware,BKdetail17)
app.get('/detail18',authMiddleware,BKdetail18)
app.get('/detail19',authMiddleware,BKdetail19)
app.get('/detail20',authMiddleware,BKdetail20)
app.get('/detail21',authMiddleware,BKdetail21)
app.get('/detail22',authMiddleware,BKdetail22)
app.get('/detail23',authMiddleware,BKdetail23)
app.get('/detail24',authMiddleware,BKdetail24)
app.get('/detail25',authMiddleware,BKdetail25)
app.get('/detail26',authMiddleware,BKdetail26)
app.get('/detail27',authMiddleware,BKdetail27)
app.get('/contact',authMiddleware,CONTACTUS)
app.get('/find',FindBookController)
app.use('/auth',redirectIfAuth,require('./auth'))



app.listen(4100, () => {
    console.log("App listening on port 4100")
})