<script setup>
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()

</script>

<template>
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

