import React, { Fragment, useState } from 'react';
import { URL_API } from '../../services/ApiRest'
import axios from 'axios';
import { Link, Redirect,useHistory } from 'react-router-dom';
const Login = () => {

    const [usuario, guardarUsuario] = useState('');
    const [password, guardarPassword] = useState('');
    const [error, guardarError] = useState(false);
    const [errorApi, guardarErrorApi] = useState('');
    const history=useHistory();

    const setUsuario = (e) => {
        guardarUsuario(e.target.value);
    }


    const setPassword = (e) => {
        guardarPassword(e.target.value);
    }

    const enviarDatos = (e) => {
        e.preventDefault();
        if (usuario.trim() === '' || password.trim() === '') {
            console.log("hay error");
            guardarError(true)
            return;
        }
        guardarError(false);
        let url = `${URL_API}user/${usuario}`;
        axios.put(url, null, {
            headers: {
                "Content-Type": "application/json",
                "password": password,
                "app": 'APP_BCK'
            }
        })
            .then(response => {
                console.log(response);
                localStorage.token = response.data.sessionTokenBck;
                localStorage.email = response.data.email;
              // <Redirect to='/panel'/>
              history.push('/panel')
            }).catch(error => {
                guardarErrorApi(errorApi);
            })
    }
    return (
        <Fragment>



            <div className="container mt-5">

                <form>
                    {error ? <p className="alert alert-danger">Campos Obligatorios</p> : null}
                    <div className="mb-3 ">
                        <label for="exampleInputEmail1" className="form-label">Usuario</label>
                        <input name="usuario" type="text" className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" onChange={setUsuario} />

                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Contraseña</label>
                        <input name="password" type="password" className="form-control" id="exampleInputPassword1" onChange={setPassword} />
                    </div>


                    <button type="submit" className="btn btn-primary" onClick={enviarDatos}>Login</button>
                </form>
            </div>

        </Fragment>

    );
}

export default Login;