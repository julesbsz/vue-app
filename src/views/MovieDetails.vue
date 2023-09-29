<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const router = useRoute()
const movie = ref(null)

onMounted(async () => {
    const response = await fetch('http://127.0.0.1:8000/api/movies/' + router.params.id, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

    if (response.ok) {
        const movieData = await response.json()
        movie.value = movieData
        console.log('Movie:', movieData)
    } else {
        throw ('Error while fetching movie')
    }
})
</script>

<template>
    <main v-if="movie">
        <img src="https://source.unsplash.com/random/300x400/?movie" :alt="movie.title">
        <h2>{{ movie.title }}</h2>
        <p>Description: {{ movie.description }}</p>
        <p>Release Date: {{ movie.releaseDate }}</p>
        <p>Duration: {{ movie.duration }} minutes</p>

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