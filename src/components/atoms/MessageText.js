export default function MessageText({ message }) {
  if (!message) return null;
  return <p className="message">{message}</p>;
}
