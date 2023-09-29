<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const router = useRoute()
const actor = ref(null)

onMounted(async () => {
    const response = await fetch('http://127.0.0.1:8000/api/actors/' + router.params.id, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

    if (response.ok) {
        const actorData = await response.json()
        actor.value = actorData
        console.log('Actor:', actorData)
    } else {
        throw ('Error while fetching movie')
    }
})
</script>

<template>
    <main v-if="actor">
        <img src="https://source.unsplash.com/random/300x400/?human" :alt="actor.firstname">
        <h2>{{ actor.firstName }} {{ actor.lastName }}</h2>
        <p>Nationality: {{ actor.nationality.pays }}</p>

        <router-link to="/">Back</router-link>
    </main>
    <main v-else>
        <h2>Loading...</h2>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
}

img {
    width: 300px;
    height: 400px;
    object-fit: cover;
    margin-bottom: 20px;
}

h2 {
    margin-bottom: 20px;
}

p {
    margin-bottom: 10px;
}

router-link {
    margin-top: 20px;
    width: auto;
    align-self: flex-start;
}
</style>