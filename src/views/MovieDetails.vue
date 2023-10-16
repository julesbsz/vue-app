<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Card from '../components/Card.vue';

const router = useRoute()
const movie = ref(null)

onMounted(async () => {
    const usertoken = localStorage.getItem('token')

    if (!usertoken) {
        return window.location.href = '/login'
    } else {
        console.log('User token:', usertoken)
    }

    const response = await fetch('http://127.0.0.1:8000/api/movies/' + router.params.id, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + usertoken
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

        <template v-if="movie.actors">
            <h3>Actor(s)</h3>
            <div class="row">
                <Card v-for="actor in movie.actors" :title="actor.firstName"
                    image="https://source.unsplash.com/random/300x400/?human" type="actors" :id="actor.id" />
            </div>
        </template>


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
</style>