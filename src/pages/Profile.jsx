import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Profile = (props) => {
  let navigate = useNavigate();
  const [login, setLogin] = useState(''); //перехват логина пользователя
  const handleLoginName = (e) =>{
    setLogin(e.target.value)
  }
  const handleLogin = (e) =>{ //функция отправки value form
    props.setLogIn(true);
    localStorage.setItem('logIn', true) //сохранение переключателя пользователя
    localStorage.setItem('userName', login) //сохранение логина пользователя
    props.setUserName(login) //устанавливаем имя
    e.preventDefault() //отмена перезагрузки страницы
    navigate("/")
  }
  return (
      <section>
          <form className='loginForm' onSubmit={handleLogin}>
            <div className="div">
              <input type="text" placeholder='Login' onChange={handleLoginName}/>
            </div>
            <div className="div">
              <input type="password" placeholder='Password'/>
            </div>
            <div className="div">
              <button type="submit">Ok</button>
            </div>
          </form>
      </section>
  );
};


