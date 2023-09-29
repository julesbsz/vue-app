<script setup>
import { ref, onMounted } from 'vue'
import Card from '../components/Card.vue';

const movies = ref([])
onMounted(async () => {
    // fetch movies
    const responseMovies = await fetch('http://127.0.0.1:8000/api/movies?page=1', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

    if (responseMovies.ok) {
        const moviesData = await responseMovies.json()
        movies.value = moviesData
        console.log('Movies:', moviesData)
    } else {
        throw ('Error while fetching movies')
    }
})
</script>

<template>
    <main v-if="movies">
        <h2>All Movies</h2>
        <div class="row">
            <Card v-for="movie in movies" :id="movie.id" :title="movie.title" type="movies"
                image="https://source.unsplash.com/random/150x200/?movie" />
        </div>
    </main>
    <main v-else>
        <h2>Loading...</h2>
    </main>
</template>


<style scoped>
#actors-title {
    margin-top: 50px;
}

.row {
    margin: 20px 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}

.column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border-radius: 7px;
    transition: all 0.3s;
    cursor: pointer;
}

.column:hover {
    background-color: #ECECEC;
}

.row img {
    border-radius: 5px;
    height: 200px;
    width: 150px;
}

.row p {
    text-align: center;
    margin-top: 10px;
}
</style>