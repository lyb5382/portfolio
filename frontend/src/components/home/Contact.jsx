import React from 'react'
import "./styles/Contact.scss"
import contact from '../../utils/contact'
const Contact = () => {
  return (
    <div className='inner contact-inner'>
      <h1 className="tit">
        contact
        <span className="star-spin"><i className="star">✱</i></span>
      </h1>
      <div className="contact-wrapper">
        <form className='contact-form'>
          <ul>
            <li>
              <label htmlFor="name" className='label'>이름</label>
              <div className="field">
                <input type="text" placeholder='홍길동' />
              </div>
            </li>
            <li>
              <label htmlFor="email" className='label'>이메일</label>
              <div className="field">
                <input type="email" placeholder='example@naver.com' />
              </div>
            </li>
            <li>
              <label htmlFor="phone" className='label'>연락처</label>
              <div className="field">
                <input type="tel" placeholder='010-1234-5678' />
              </div>
            </li>
            <li>
              <label htmlFor="message" className='label'>문의 내용</label>
              <div className="field">
                <textarea name="message" id="message" rows={7} placeholder='문의 하실 내용을 자세히 적어주세요' required></textarea>
              </div>
            </li>
            <li>
              <div className="field">
                <button type='submit'>contact me</button>
              </div>
            </li>
          </ul>

        </form>
        <ul className="contact-lst">
          {contact.basics.map((item) => (
            <li key={item.label}>
              <strong className="label">{item.label}</strong>
              <div className="content">
                <a href={item.href}>{item.value}</a>
                <div className="hint">{item.hint}</div>
              </div>
            </li>
          ))}
          <li>
            <strong className="label">채널</strong>
            <div className="contact-chips">
              {contact.channels.map((item) => (
                <a href={item.href} key={item.value}>{item.label}</a>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Contact