interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  return (
    <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded shadow-lg flex items-center gap-4 animate-fade-in">
      <span>{message}</span>
      <button
        onClick={onClose}
        className="font-bold hover:opacity-80"
      >
        ✕
      </button>
    </div>
  );
}
