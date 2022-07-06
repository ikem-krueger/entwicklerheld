function minutesTo24Hours(minutes) {
  const hour = String(Math.floor(minutes / 60)).padStart(2, 0)
  const minute = String(minutes % 60).padStart(2, 0)
  
  return `${hour}:${minute}`
}

export function getSortedShows(shows, times) {
    const sortedTimes = times.slice().sort((current, next) => current.starttime - next.starttime)

    const sortedShows = sortedTimes.map((currentTime, i) => {
      const currentShow = shows.find(show => show.id === currentTime.id); // FIXME: this is slow...

      const nextTime = sortedTimes[i + 1]

      if(nextTime) {
        if((currentTime.starttime + currentShow.duration) > nextTime.starttime) {
          const nextShow = shows.find(show => show.id === nextTime.id); // FIXME: this is slow...

          throw new Error(`${currentShow.title}, ${nextShow.title}`)
        }
      }

      const title = `<p class="title">${currentShow.title}</p>`
      const starttime = minutesTo24Hours(currentTime.starttime)
      const url = currentShow.url
      
      return { title: title, starttime: starttime, url: url}
    })

    return sortedShows
}

export function getProgress(width, duration, current) {
    let progress = Math.round((current / duration) * width)

    if(isNaN(progress))
      progress = 0

    if(current > duration)
      progress = width

    return progress
}