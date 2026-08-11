function Message({ message, sender }) {
  return (
    <div className={`message ${sender}`}>
      {message}
    </div>
  );
}

export default Message;