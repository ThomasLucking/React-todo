interface ErrorManagementProps {
  message: string;
  onDismiss: () => void;
}
export default function ErrorManagementComponent({
  message,
  onDismiss,
}: ErrorManagementProps) {
  if (!message) return null;

  return (
    <div className="Error-management-div">
      <h4>Error</h4>
      <p>{message}</p>
      <button
        className="error-dismiss"
        onClick={onDismiss}
        aria-label="Dismiss error"
      >
        ×
      </button>
    </div>
  );
}
