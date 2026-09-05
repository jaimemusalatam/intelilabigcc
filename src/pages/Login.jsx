import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Icon } from '../components/icons';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to={location.state?.from ?? '/'} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate(location.state?.from ?? '/', { replace: true });
  };

  return (
    <div className="il-login">
      <div className="il-login__card">
        <div className="il-login__brand">
          <svg width="34" height="37" viewBox="0 0 42 46" fill="none" stroke="var(--il-red)" strokeWidth="2.4" strokeLinejoin="round">
            <path d="M21 2.5 38.5 12v22L21 43.5 3.5 34V12z" />
            <path d="M14.5 30.5 27 15.5" strokeLinecap="round" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span className="il-login__brand-name">InteliLab</span>
            <span className="il-login__brand-suffix">IGCC</span>
          </div>
        </div>

        <div className="il-login__intro">
          <h1>Iniciar sesión</h1>
          <p>Sistema inteligente para gestión y cumplimiento — ISO 15189:2022</p>
        </div>

        <form className="il-login__form" onSubmit={handleSubmit}>
          <div className="il-field">
            <label htmlFor="il-login-email">Correo electrónico</label>
            <input
              id="il-login-email"
              className="il-input"
              type="email"
              autoComplete="username"
              placeholder="nombre@intelilab.pe"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="il-field">
            <label htmlFor="il-login-password">Contraseña</label>
            <input
              id="il-login-password"
              className="il-input"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="il-login__error" role="alert">
              <Icon name="alerta" size={16} strokeWidth={1.8} />
              <span>{error}</span>
            </div>
          )}

          <button className="il-btn il-btn--primary il-login__submit" type="submit">
            Ingresar
          </button>

          <a className="il-login__forgot" href="mailto:soporte@intelilab.pe?subject=Recuperar%20acceso%20IGCC">
            ¿Olvidaste tu contraseña? Contacta a soporte
          </a>
        </form>

        <div className="il-login__footer">
          <Icon name="candado" size={14} color="var(--il-ink-3)" strokeWidth={1.8} />
          <span>Acceso restringido al personal autorizado del laboratorio.</span>
        </div>
      </div>
    </div>
  );
}
