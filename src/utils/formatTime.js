export const formatTime = (time) => {
    // const ms = Math.round(time / 100) % 10
    // const seconds = Math.floor(time / 1000) % 60
    const minutes = Math.floor(time / 1000 / 60) % 60
    const hours = Math.floor(time / 1000 / 1000 / 60) % 60
    const days = Math.floor(time / 1000 / 1000 / 60 / 24) % 24
    // return `${days}:${hours}:${minutes}:${seconds}.${ms}`;
    return `${days}d:${hours}h:${minutes}:m`;
}