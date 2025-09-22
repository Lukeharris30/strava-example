import type { StravaActivity } from '../shared/stravaActivity'
import type { SimplifiedStravaActivity } from '../shared/simplifiedStravaActivity'

export  function simplifyActivities (rides: StravaActivity[]): SimplifiedStravaActivity[] { 
  return rides.map(r => {
    return {
      id: r.id,
      date: new Date(r.start_date_local).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day:'numeric'}),
      distance: r.distance
    }
  })
}
