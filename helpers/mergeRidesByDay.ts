import type {SimplifiedStravaActivity} from '../shared/simplifiedStravaActivity'

export function mergeRidesByDay(rides: SimplifiedStravaActivity[]) {
    return rides.reduce<SimplifiedStravaActivity[]>((a, c ) => {
    const existingRecord = a.find(i => i.date === c.date)
    if(existingRecord){
      existingRecord.distance += c.distance
    } else {
      a.push({ ...c}) 
    }
    return a
  }, [])
}