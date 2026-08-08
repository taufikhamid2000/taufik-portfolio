'use client';

import { useFormStatus } from 'react-dom';
import { Spinner } from './spinner';

// Every form-submitting button shows a spinner + swaps its label while
// pending, so submits never look frozen — see DESIGN.md's pending-state
// rule.
export function SubmitButton({
  children,
  pendingText,
  className,
}: {
  children: React.ReactNode;
  pendingText?: string;
  className: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={`${className} inline-flex items-center justify-center gap-1.5 transition-colors disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {pending && <Spinner />}
      {pending && pendingText ? pendingText : children}
    </button>
  );
}
