export const formatTime = (time) => {
    // const ms = Math.round(time / 100) % 10
    // const seconds = Math.floor(time / 1000) % 60
    const minutes = Math.floor(time / 1000 / 60) % 60
    const hours = Math.floor(time / 1000 / 1000 / 60) % 60
    const days = Math.floor(time / 1000 / 1000 / 60 / 24) % 24
    // return `${days}:${hours}:${minutes}:${seconds}.${ms}`;
    return `${days}d:${hours}h:${minutes}:m`;
}

export const isOpen = (nowDate,startHour, endHour) => {
    // const {startHour, endHour, open} = openHours.find( day => (nowDate.getDay() === day.day))

    const startTime = parseInt(startHour.split(':')[0]) * 60 + parseInt(startHour.split(':')[1]);
    const endTime = parseInt(endHour.split(':')[0] * 60) + parseInt(endHour.split(':')[1]);

    const nowDateMinutes = nowDate.getHours() * 60 + nowDate.getMinutes();

    return (nowDateMinutes > startTime && nowDateMinutes < endTime)

}