import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from "react-router-dom";
import { NotificationManager } from 'react-notifications'; 
import 'react-notifications/lib/notifications.css'; 
import '../main.css';
import './Login.css';
import logo from '../../assets/imgs/logo.png';

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");
    
        try {
            const response = await fetch("http://localhost:3001/api/login", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || "Erro ao fazer login");
            }
    
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user)); // Save user data
    
            NotificationManager.success('Login realizado com sucesso!', 'Sucesso');
            navigate('/dashboard'); 
    
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setError(error.message);
            NotificationManager.error(error.message, 'Erro ao realizar login');
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
                        <form onSubmit={handleSubmit}>
                            <label className="inputCustom" htmlFor="emailOrUsername">E-mail</label>
                            <input
                                type="text"
                                placeholder="Digite seu email"
                                name="emailOrUsername"
                                id="emailOrUsername"
                                required
                                className="inputField"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label className="inputCustom" htmlFor="password">Senha</label>
                            <input
                                type="password"
                                placeholder="Digite sua senha"
                                name="password"
                                id="password"
                                required
                                className="inputField"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {error && <p className="error-message">{error}</p>}

                            <button type="submit" className="submitButton" disabled={loading}>
                                {loading ? "Entrando..." : "Login"}
                            </button>
                            <div className="router">
                                <p className="link">
                                    Não tem cadastro? Clique <Link to="/register">aqui</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};
