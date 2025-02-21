import { useEffect } from 'react';

interface CalculatorKeyboardProps {
  onClear?: () => void;
  onUndo?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onFocusNext?: () => void;
  onFocusPrev?: () => void;
}

export function useCalculatorKeyboard({
  onClear,
  onUndo,
  onIncrement,
  onDecrement,
  onFocusNext,
  onFocusPrev
}: CalculatorKeyboardProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't trigger shortcuts when typing in input fields
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Common calculator shortcuts
      switch (e.key.toLowerCase()) {
        case 'c':
          if (onClear) {
            e.preventDefault();
            onClear();
          }
          break;
        case 'z':
          if (e.ctrlKey && onUndo) {
            e.preventDefault();
            onUndo();
          }
          break;
        case 'arrowup':
          if (onIncrement) {
            e.preventDefault();
            onIncrement();
          }
          break;
        case 'arrowdown':
          if (onDecrement) {
            e.preventDefault();
            onDecrement();
          }
          break;
        case 'tab':
          if (e.shiftKey && onFocusPrev) {
            e.preventDefault();
            onFocusPrev();
          } else if (onFocusNext) {
            e.preventDefault();
            onFocusNext();
          }
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClear, onUndo, onIncrement, onDecrement, onFocusNext, onFocusPrev]);
}
