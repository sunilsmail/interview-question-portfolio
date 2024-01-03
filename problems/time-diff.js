function timeDifference(startTimestamp, endTimestamp) {
  const timeDifference = Math.abs(endTimestamp - startTimestamp);

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} sec`;
  } else if (minutes < 60) {
    return `${minutes} min`;
  } else if (hours < 24) {
    return `${hours} hr`;
  } else {
    return `${days} days`;
  }
}

// Example usage:
const startTimestamp = new Date("2024-01-03T10:00:00").getTime();
const endTimestamp = new Date("2024-01-03T15:30:00").getTime();

const timeDifferenceMessage = timeDifference(startTimestamp, endTimestamp);
console.log(`Time difference: ${timeDifferenceMessage}`);
