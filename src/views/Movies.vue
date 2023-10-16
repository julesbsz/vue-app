<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Card from '../components/Card.vue';

const movies = ref([])
onMounted(async () => {
    const responseMovies = await fetch('http://127.0.0.1:8000/api/movies?page=1', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

    if (responseMovies.ok) {
        const moviesData = await responseMovies.json()
        movies.value = moviesData
        console.log('Movies:', movies.value)

        searchMovie()
    } else {
        throw ('Error while fetching movies')
    }
})

let search = ref("")
let filteredMovies = ref([])

let searchMovie = () => {
    filteredMovies.value = movies.value
        .map((movie, index) => ({ movie, index }))
        .filter(({ movie }) => movie.title.toLowerCase().includes(search.value.toLowerCase()));
}
</script>

<template>
    <main v-if="movies">
        <h2>All Movies</h2>

        <div class="row searchbar">
            <input type="text" v-model="search" placeholder="Search a movie by name" @keyup.enter="searchMovie"
                @input="searchMovie">
            <button @click="searchMovie">Search</button>
        </div>

        <div class="row">
            <Card v-for="item in filteredMovies" :id="item.movie.id" :title="item.movie.title" type="movies"
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

.row.searchbar {
    justify-content: flex-start;
    gap: 15px;
}

.row.row.searchbar input {
    height: 30px;
    width: 500px;
    background-color: transparent;
    border: none;
    outline: none;
    border-bottom: 1px #ECECEC solid;
    color: black;
    font-size: 16px;
}

.row.row.searchbar button {
    height: 30px;
    width: 75px;
    background-color: hsla(160, 100%, 37%, 1);
    border: none;
    border-radius: 5px;
    transition: all 0.3s;
    cursor: pointer;
    color: white;
}

.row.row.searchbar button:hover {
    background-color: hsla(160, 100%, 37%, 0.5);
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