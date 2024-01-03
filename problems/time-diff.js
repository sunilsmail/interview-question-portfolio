function timeDifference(startTimestamp, endTimestamp) {
  const timeDifference = Math.abs(endTimestamp - startTimestamp);

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} sec`;
  } else if (minutes < 60) {
    return `${minutes} min ago`;
  } else if (hours < 24) {
    return `${hours} hr ago`;
  } else {
    return `${days} days ago`;
  }
}

// Example usage:
const timeList = ["07:16:08", "07:16:25", "07:15:45", "07:14:00"];
const startTimestamp = new Date().getTime();
const time = timeList[0].split(':')
const endTimestamp = new Date(`2024-01-03T${time[0]}:${time[1]}:${time[2]}`).getTime();
console.log(startTimestamp)
const timeDifferenceMessage = timeDifference(startTimestamp, endTimestamp);
console.log(`Time difference: ${timeDifferenceMessage}`);


