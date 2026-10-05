import { useEffect, type RefObject } from 'react';

type UseSidebarOutsideClickParams = {
  asideRef: RefObject<HTMLElement | null>;
  arrowRef: RefObject<HTMLElement | null>;
  isOpen: boolean;
  onClose: () => void;
};

export const useSidebarOutsideClick = ({
  asideRef,
  arrowRef,
  isOpen,
  onClose,
}: UseSidebarOutsideClickParams): void => {
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Node;

      if (asideRef.current?.contains(target)) return;
      if (arrowRef.current?.contains(target)) return;

      onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, asideRef, arrowRef, onClose]);
};
