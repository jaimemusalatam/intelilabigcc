import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthProvider, useAuth } from './AuthContext';
import { AUTH_CREDENTIALS } from '../data/mock';

const STORAGE_KEY = 'il-auth-session';

function wrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts unauthenticated when there is no stored session', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('rejects invalid credentials without creating a session', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    let outcome;
    act(() => {
      outcome = result.current.login('nadie@intelilab.pe', 'incorrecta');
    });

    expect(outcome).toEqual({ ok: false, error: 'Correo o contraseña incorrectos.' });
    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('logs in with valid credentials and persists the session', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    let outcome;
    act(() => {
      outcome = result.current.login(AUTH_CREDENTIALS.email, AUTH_CREDENTIALS.password);
    });

    expect(outcome).toEqual({ ok: true });
    expect(result.current.isAuthenticated).toBe(true);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY))).toMatchObject({
      email: AUTH_CREDENTIALS.email,
    });
  });

  it('normalizes email case and trims whitespace on login', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    let outcome;
    act(() => {
      outcome = result.current.login(
        AUTH_CREDENTIALS.email.toUpperCase(),
        `  ${AUTH_CREDENTIALS.password}  `
      );
    });

    expect(outcome).toEqual({ ok: true });
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('clears the session and localStorage on logout', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login(AUTH_CREDENTIALS.email, AUTH_CREDENTIALS.password);
    });
    expect(result.current.isAuthenticated).toBe(true);

    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('discards a malformed stored session instead of crashing', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ foo: 'bar' }));

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('throws when useAuth is used outside of AuthProvider', () => {
    expect(() => renderHook(() => useAuth())).toThrow(
      'useAuth debe usarse dentro de <AuthProvider>'
    );
  });
});
