import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import Login from './Login';
import { AuthProvider } from '../context/AuthContext';
import { AUTH_CREDENTIALS } from '../data/mock';

function renderLogin({ initialEntries = ['/login'] } = {}) {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<div>Página protegida</div>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
}

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows an accessible error when credentials are invalid', async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText('Correo electrónico'), 'nadie@intelilab.pe');
    await user.type(screen.getByLabelText('Contraseña'), 'incorrecta');
    await user.click(screen.getByRole('button', { name: 'Ingresar' }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Correo o contraseña incorrectos.');
  });

  it('navigates away after a successful login', async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText('Correo electrónico'), AUTH_CREDENTIALS.email);
    await user.type(screen.getByLabelText('Contraseña'), AUTH_CREDENTIALS.password);
    await user.click(screen.getByRole('button', { name: 'Ingresar' }));

    expect(await screen.findByText('Página protegida')).toBeInTheDocument();
  });

  it('redirects an already authenticated user away from /login', () => {
    localStorage.setItem(
      'il-auth-session',
      JSON.stringify({ name: 'Usuario', initials: 'JP', role: 'Rol', email: AUTH_CREDENTIALS.email })
    );

    renderLogin();

    expect(screen.getByText('Página protegida')).toBeInTheDocument();
  });
});
