import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { RequireAuth } from './App';
import { AuthProvider } from './context/AuthContext';
import { AUTH_CREDENTIALS } from './data/mock';

function renderProtected(initialEntries) {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/login" element={<div>Página de login</div>} />
          <Route
            path="/privado"
            element={
              <RequireAuth>
                <div>Contenido privado</div>
              </RequireAuth>
            }
          />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
}

describe('RequireAuth', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('redirects to /login when there is no session', () => {
    renderProtected(['/privado']);

    expect(screen.getByText('Página de login')).toBeInTheDocument();
    expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument();
  });

  it('renders the protected content when authenticated', () => {
    localStorage.setItem(
      'il-auth-session',
      JSON.stringify({ name: 'Usuario', initials: 'JP', role: 'Rol', email: AUTH_CREDENTIALS.email })
    );

    renderProtected(['/privado']);

    expect(screen.getByText('Contenido privado')).toBeInTheDocument();
  });
});
