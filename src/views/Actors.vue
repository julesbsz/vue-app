<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Card from '../components/Card.vue';

const actors = ref([])
onMounted(async () => {
    const responseActors = await fetch('http://127.0.0.1:8000/api/actors?page=1', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

    if (responseActors.ok) {
        const actorsData = await responseActors.json()
        actors.value = actorsData
        console.log('actors:', actors.value)

        searchActor()
    } else {
        throw ('Error while fetching actors')
    }
})

let search = ref("")
let filteredActors = ref([])

let searchActor = () => {
    filteredActors.value = actors.value
        .map((actor, index) => ({ actor, index }))
        .filter(({ actor }) => actor.lastName.toLowerCase().includes(search.value.toLowerCase()));
}
</script>

<template>
    <main v-if="actors">
        <h2>All Actors</h2>

        <div class="row searchbar">
            <input type="text" v-model="search" placeholder="Search a actor by name" @keyup.enter="searchActor"
                @input="searchActor">
            <button @click="searchActor">Search</button>
        </div>

        <div class="row">
            <Card v-for="item in filteredActors" :id="item.actor.id" :title="item.actor.lastName" type="actors"
                image="https://source.unsplash.com/random/150x200/?actor" />
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