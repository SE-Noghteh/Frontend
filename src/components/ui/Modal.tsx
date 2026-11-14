/**
 * SAMPLE FILE
 *
 * Generic reusable modal.
 */

import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ isOpen, children, onClose }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div role="dialog" aria-modal="true">
      <button type="button" onClick={onClose}>
        Close
      </button>

      {children}
    </div>
  );
}