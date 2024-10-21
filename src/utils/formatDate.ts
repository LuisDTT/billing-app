export const getFormattedDate = (seconds: number) => {
    const localDate = new Date(seconds * 1000)
    console.log(localDate)
    const year = localDate.getFullYear().toString()
    const month = ('0' + (localDate.getMonth() + 1)).slice(-2)
    const day = ('0' + localDate.getDate()).slice(-2)

    let hours = localDate.getHours()
    const minutes = ('0' + localDate.getMinutes()).slice(-2)
    const period = hours >= 12 ? 'PM' : 'AM'

    hours = hours % 12
    hours = hours || 12

    const formattedDate = `${day}/${month}/${year}`
    const formattedTime = `${hours}:${minutes} ${period}`

    return `${formattedDate}, ${formattedTime}`
}
