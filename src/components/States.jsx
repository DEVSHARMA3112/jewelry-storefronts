// Error box (with Retry button) and empty state used by every data view.

export const ErrorBox = ({ error, retry }) => (
  <div className="state" role="alert">
    <h2>We couldn't load this</h2>
    <p>
      {error?.message || 'Something went wrong.'} Check your connection and try again.
    </p>
    <button className="btn" onClick={retry}>
      Retry
    </button>
  </div>
);

export const Empty = ({ title, text, action, onAction }) => (
  <div className="state">
    <h2>{title}</h2>
    <p>{text}</p>
    {action && (
      <button className="btn" onClick={onAction}>
        {action}
      </button>
    )}
  </div>
);
