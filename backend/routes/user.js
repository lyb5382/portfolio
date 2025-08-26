const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { default: axios } = require('axios')

const User = require('../models/User')
const cookieParser = require('cookie-parser')

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.status(400).json({ message: '이미 존재하는 user name' })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, password: hashedPassword })
        await user.save()
        res.status(201).json({ message: '회원가입 완료' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: '서버 에러' })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username }).select('+password')
        if (!user) return res.status(401).json({ message: '없는 user' })
        if (!user.isActive) return res.status(401).json({ message: '비활성 계정' })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            user.failedLoginAttempts += 1
            user.lastLoginAttempt = new Date()
            if (user.failedLoginAttempts >= 5) {
                user.isActive = false
                await user.save()
                return res.status(401).json({ message: '계정 잠김' })
            }
            await user.save()
            return res.status(401).json({ message: `비밀번호 ${user.failedLoginAttempts}회 틀림, 5회 틀리면 계정 잠금` })
        }
        user.failedLoginAttempts = 0
        user.lastLoginAttempt = new Date()
        user.isLoggedIn = true
        try {
            const { data } = await axios.get('http://api.ipify.org/?format=json')
            if (data?.ip) user.ipAddress = data.ip
        } catch (error) {
            console.error('IP주소 조회 실패')
        }
        await user.save()
        const token = jwt.sign({ userId: user._id, username: user.username, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' })
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 })
        const userWithoutPassword = user.toObject()
        delete userWithoutPassword.password
        return res.status(200).json({ message: '로그인', token, user: userWithoutPassword })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: '서버 에러' })
    }
})

router.post('/logout', async (req, res) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(400).json({ message: '로그아웃된 계정' })
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decoded.userId)
            if (user) {
                user.isLoggedIn = false
                await user.save()
            }
        } catch (error) {
            console.log('토큰 검증 오류', error)
        }
        res.clearCookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' })
        res.json({ message: '로그아웃' })

    } catch (error) {
        console.log('서버 오류', error)
        return res.status(500).json({ message: '서버 에러' })
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 })
        return res.status(201).json({ message: '전체 유저', users })
    } catch (error) {
        return res.status(500).json({ message: '서버 에러' })
    }
})

router.delete('/delete/:userId', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId)
        if (!user) {
            return res.status(404).json({ message: '없는 계정' })
        }
        const users = await User.find().sort({ createdAt: -1 })
        return res.status(201).json({ message: '삭제 완료', users })
    } catch (error) {
        return res.status(500).json({ message: '서버 에러' })
    }
})

module.exports = router