export const getDate = (date) => {
    let sentDate = new Date(date);
    let seconds = sentDate.getSeconds() < 10 ? `0${sentDate.getSeconds()}` : `${sentDate.getSeconds()}`;
    let minutes = sentDate.getMinutes() < 10 ? `0${sentDate.getMinutes()}` : `${sentDate.getMinutes()}`;
    let hours = sentDate.getHours();
    let day = sentDate.getDate();
    let month = sentDate.getMonth() < 9 ? `0${sentDate.getMonth() + 1}` : `${sentDate.getMonth() + 1}`;
    let year = sentDate.getFullYear();

   return `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;
}