function handleMessageDate(data) {
  return new Date(data).toLocaleTimeString("en-in", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default handleMessageDate;
