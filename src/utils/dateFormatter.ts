function formatDate(date: Date): string {
  const now = new Date();
  const delta = now.getTime() - date.getTime();

  if (delta < 60000) {
    return "just now";
  } else if (delta < 3600000) {
    const minutes = Math.floor(delta / 60000);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (delta < 86400000) {
    const hours = Math.floor(delta / 3600000);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else {
    const days = Math.floor(delta / 86400000);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }
}

export default formatDate;
