const mongoose = require('mongoose')
const Schema = mongoose.Schema //เก็บข้อมูลแบบ Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    //สร้าง filed ในตัว mongoDB
    email: {
        type: String,
        required: [true, 'Please provide email']//ถ้ามี error ให้แสดงข้อความนี้
    },
    nameuser: {
        type: String,
        required: [true, 'Please provide username']
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    tel: {
        type: String,
        required: [true, 'Please provide phone number']
    },
    day: {
        type: String,
        required: [true, 'Please provide day']
    },
    month: {
        type: String,
        required: [true, 'Please provide month']
    },
    year: {
        type: String,
        required: [true, 'Please provide year']
    }
})

// ดึง UserSchema มาเข้ารหัสก่อนที่จะบันทึกข้อมูล
UserSchema.pre('save', function(next) {
    // สร้างตัวแปร user ให้เก็บ obj ใน UserSchema 
    const user = this
    //ดึง bcrypt เพื่อเข้ารหัสตัว password โดยเข้าถึง user.password
    //รอบในการเข้ารหัส 10 รอบ
    bcrypt.hash(user.password, 10).then(hash => {
        // hash คือตัวเก็บข้อมูลที่ผ่านการเข้ารหัสแล้ว
        //หลังจากเข้ารหัส password แล้ว นำข้อมูลที่เข้ารหัสไปเก็บใน  user.password
        user.password = hash
        //หลังจากเก็บข้อมูลแล้วใช้ func next() ในการทำงานต่อ
        next()
        //ถ้ามี error ให้ดักจับข้อมูล error ตรงนี้
    }).catch(error => {
        console.error(error)
    })
})

const User = mongoose.model('User', UserSchema)
module.exports = User