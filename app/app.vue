<script setup>
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()
const { data: results, error } = await useFetch('/api/activities');
const totalDistance = computed(() => {
  return results.value.reduce((a,c) => a + c.distance, 0) || []
})

</script>

<template>
  <div v-if="results">
    {{ totalDistance }} meters or {{ totalDistance /1609.34 }} miles since {{results[results.length - 1].start_date_local }}
    <pre>{{ results }}</pre>
  </div>
  <div v-if="loggedIn">
    <h1>Welcome!</h1>
    <pre>{{ user }}</pre>
    <pre>{{ session }}</pre>
    <button @click="clear">Logout</button>
  </div>
  <div v-else>
    <h1>Not logged in</h1>
    <a href="/auth/strava">Login with Strava</a>
    <!-- or open the OAuth route in a popup -->
    <button @click="openInPopup('/auth/strava')">Login with Strava</button>
  </div>
</template>

