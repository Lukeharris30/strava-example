<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import type { StravaActivity } from '~~/shared/stravaActivity'
import {simplifyActivities} from '../helpers/simplifyActivities'
import {mergeRidesByDay} from '../helpers/mergeRidesByDay'

ChartJS.register( Tooltip, BarElement, CategoryScale, LinearScale)

const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()

const { data: results, error } = loggedIn ? await useFetch<StravaActivity[]>('/api/activities') : { data: ref<StravaActivity[] | null>(null), error: ref(null) }

const totalDistance = computed(() => {
  return results.value?.reduce((a,c) => a + c.distance, 0) ?? 0
})

const totalElevation = computed(() => {
  return results.value?.reduce((a,c) => a + c.total_elevation_gain, 0) ?? 0
})

interface Datapoint {
  backgroundColor: string,
  data: number[]
}
interface ChartData {
  labels: string[]
  datasets: Datapoint[]
} 

const chartData = computed<ChartData>(() => {

  const ridesByDay = mergeRidesByDay(simplifyActivities(results.value ?? []))

  return {
    labels: ridesByDay.map(r => r.date),
    datasets: [
      {
        backgroundColor: 'pink',
        data: ridesByDay.map(r => Math.round((r.distance / 1609.34) * 10)/10)
      }
    ]
  }
})

</script>

<template>
  <main>
  <section v-if="loggedIn" class="container" >
      <div class="login-data">
        <p>Welcome {{ user?.firstname }}</p>
        <img :src="user?.profile" />
        <button @click="clear">Logout</button>
      </div>
     <div v-if="results" class="results">
        <h2>Check out your Miles Per Day</h2>
        <Bar :data="chartData" />
        <div>{{ totalDistance /1609.34 }} miles since {{results[results.length - 1]!.start_date_local }}</div>
      Total Elevation: {{ totalElevation }}
     </div>
  </section>
  <section v-else>
    <h1>Not logged in</h1>
    <a href="/auth/strava">Login with Strava</a>
    <!-- or open the OAuth route in a popup -->
    <button @click="openInPopup('/auth/strava')">Login with Strava</button>
  </section>
  </main>
</template>

<style >
  .container {
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 40px;
  }
  .login-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 20px;
    button {
      display: block;
    }
  }
  .results {
    flex: 7;
  }
  img {
    border-radius: 50%;
    width: 100%;
  }
  @media (min-width: 500px) { 
    .container {
      flex-direction: row;
    }
    .login-data {
      width: 30%;
    }
    
  }
</style>
