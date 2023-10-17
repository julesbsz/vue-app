<script setup>
import { ref, onMounted } from 'vue'
import Card from '../components/Card.vue';

const categories = ref([])
onMounted(async () => {
    const usertoken = localStorage.getItem('token')

    if (!usertoken) {
        return window.location.href = '/login'
    } else {
        console.log('User token:', usertoken)
    }

    const responseCategories = await fetch('http://127.0.0.1:8000/api/categories?page=1', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + usertoken
        }
    })

    if (responseCategories.ok) {
        const categoriesData = await responseCategories.json()
        categories.value = categoriesData
        console.log('categories:', categories.value)

        searchCategory()
    } else if (responseCategories.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
    } else {
        throw ('Error while fetching movies')
    }
})

let search = ref("")
let filteredCategories = ref([])

let searchCategory = () => {
    filteredCategories.value = categories.value
        .map((category, index) => ({ category, index }))
        .filter(({ category }) => category.name.toLowerCase().includes(search.value.toLowerCase()));
}
</script>

<template>
    <main v-if="categories">
        <h2>All Categories</h2>

        <div class="row searchbar">
            <input type="text" v-model="search" placeholder="Search a category by name" @keyup.enter="searchCategory"
                @input="searchCategory">
            <button @click="searchCategory">Search</button>
        </div>

        <div class="row">
            <Card v-for="item in filteredCategories" :id="item.category.id" :title="item.category.name" type="categories"
                image="https://source.unsplash.com/random/150x200/?film" />
        </div>
    </main>
    <main v-else>
        <h2>Loading...</h2>
    </main>
</template>


<style scoped>
#categories-title {
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