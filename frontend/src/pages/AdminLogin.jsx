import React, { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const nav = useNavigate()
  const [formdata, setFormdata] = useState({ username: '', password: '' })
  const [check, setCheck] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [err, setErr] = useState(null)
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post('/api/auth/login', formdata, { withCredentials: true })
      if (response.data.user) {
        nav('/admin/post')
      }
    } catch (error) {
      const errMsg = error.response.data.message || '로그인 실패'
      setErr({ message: errMsg })
    }
  }
  return (
    <div>
      <div className='login-header'>
        <h3>관리자 로그인</h3>
        <p>관리자 전용 페이지</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-fiend">
          <label htmlFor="username">ID : </label>
          <input type="text" name='username' id='username' value={formdata.username} onChange={handleChange} required placeholder='ID 입력' />
        </div>
        <div className="form-fiend">
          <label htmlFor="password">비밀번호 : </label>
          <input type="text" name='password' id='password' value={formdata.password} onChange={handleChange} required placeholder='비밀번호 입력' />
        </div>
        <div className="error-box"></div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default AdminLogin