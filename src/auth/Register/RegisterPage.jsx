import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate  } from "react-router-dom";
import '../main.css';
import './Register.css';
import logo from '../../assets/imgs/logo.png';
import { NotificationManager } from 'react-notifications'; 
import 'react-notifications/lib/notifications.css'; 

export const RegisterPage = () => {
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(null); 
    
    const navigate = useNavigate(); 

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0]; 
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);  
            };
            reader.readAsDataURL(file);  
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }
    
        setLoading(true); 
    
        try {
            const response = await fetch('http://localhost:3001/api/register', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name, avatar }), 
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || 'Erro desconhecido');
            }
    
            NotificationManager.success('Cadastro realizado com sucesso!', 'Sucesso', 3000);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setAvatar(null); 
            setError(""); 

            navigate('/'); 
        } catch (error) {
            console.error("Erro ao se cadastrar:", error);
            setError(error.message);
            NotificationManager.error(error.message, 'Erro', 3000);
        } finally {
            setLoading(false); 
        }
    };
    
    
    return (
        <>
        <main className="custom">
            <div className="split left-side">
                <img src={logo} alt="logo com o nome concurseiro" className="logoAuth" />
            </div>

            <div className="split right-side">
                <div className="formulario">
                    {/* <h2 className="title">Cadastro</h2> */}

                    <div className="avatar-section">
                        <label htmlFor="avatar" className="avatar-label">
                            {avatar ? (
                                <img src={avatar} alt="Avatar" className="avatar-preview" />
                            ) : (
                                <div className="avatar-placeholder">Escolha uma foto</div>
                            )}
                        </label>
                        <input
                            type="file"
                            id="avatar"
                            accept="image/*"
                            style={{ display: 'none' }}  
                            onChange={handleAvatarChange}
                        />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <label className="inputCustom" htmlFor="nomeFull">Nome Completo</label>
                        <input
                            type="text"
                            placeholder="Digite seu nome completo"
                            name="nomeFull"
                            id="nomeFull"
                            required
                            className="inputField"
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                        />

                        <label className="inputCustom" htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            placeholder="Digite seu email"
                            name="email"
                            id="email"
                            required
                            className="inputField"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />

                        <label className="inputCustom" htmlFor="password">Senha</label>
                        <div className="input-container">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Digite sua senha"
                                name="password"
                                id="password"
                                required
                                className="inputField"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                className="toggle-visibility"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? "👁️" : "🙈"}
                            </span>
                        </div>

                        <label className="inputCustom" htmlFor="confirmPassword">Confirme sua Senha</label>
                        <div className="input-container">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Confirme sua senha"
                                name="confirmPassword"
                                id="confirmPassword"
                                required
                                className="inputField"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <span
                                className="toggle-visibility"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? "👁️" : "🙈"}
                            </span>
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" className="submitButton" disabled={loading}>
                            {loading ? "Cadastrando..." : "Cadastrar"}
                        </button>
                        <div className="router">
                            <p className="link">
                                Já tem cadastro? Clique <Link to="/">aqui</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </main>
        </>
    );
};
