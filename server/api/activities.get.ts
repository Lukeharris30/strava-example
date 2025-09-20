export default defineEventHandler( async(event) => {
   const session = await getUserSession(event);
   try {
       const results = await $fetch("https://www.strava.com/api/v3/athlete/activities",{
           headers: {
            Authorization: `Bearer ${session?.secure?.apiToken}`
        }
    })
    return results
   } catch(err) {
    console.error(err)
   }
   
})