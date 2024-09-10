import { Timestamp } from "firebase/firestore";

export const getFormattedDate = (seconds: number) => {
  const firebaseTimestamp = Timestamp.fromMillis(seconds * 1000);
  const date = firebaseTimestamp.toDate();

  const year = date.getFullYear().toString();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  let hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedDate = `${day}/${month}/${year}`;

  const formattedTime = `${hours}:${minutes} ${period}`;
  return `${formattedDate}, ${formattedTime}`;
};
