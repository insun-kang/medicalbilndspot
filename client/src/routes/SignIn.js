import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import 'routes/css/SignIn.css';

axios.defaults.withCredentials = true;

// 로그인 페이지
function SignIn() {
  const url = `http://localhost:5000`;
  const history = useHistory();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // (로그인 폼) 입력 핸들러
  const onChangeHandler = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'userEmail') {
      setUserEmail(value);
    } else if (name === 'userPassword') {
      setUserPassword(value);
    }
  };

  // 강제로 Home page로 이동 (임시 함수)
  const onMoveHome = (event) => {
    window.location.replace('/community');
  };

  // 로그인 버튼 핸들러
  async function onSignInHandler(event) {
    await axios
      .post(url + '/', {
        method: 'POST',
        body: JSON.stringify({
          userEmail: userEmail,
          userPassword: userPassword,
        }),
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === 400) {
          alert('로그인 성공');
          sessionStorage.setItem('accessToken', response.data.token);
          window.location.replace('/home');
        } else if (response.data.status === 401) {
          alert('가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.');
        } else {
          alert('error');
        }
      })
      .catch((error) => {});
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>토닥토닥</h2>
        <input
          name="userEmail"
          type="email"
          value={userEmail}
          onChange={onChangeHandler}
          placeholder="이메일"
          required
        />
        <input
          name="userPassword"
          type="password"
          value={userPassword}
          onChange={onChangeHandler}
          placeholder="비밀번호"
          required
        />
        <br />
        {/* 추후  onSignInHandler 교체 */}
        <button onClick={onMoveHome}>로그인</button>
        <button
          onClick={() => {
            history.push({
              pathname: '/sign-up',
            });
          }}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignIn;
