import { useEffect, useRef } from 'react';

// Cierra `open` cuando se hace click fuera del elemento referenciado.
export function useClickOutside(open, onOutside) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onOutside();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onOutside]);

  return ref;
}
