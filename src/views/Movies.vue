<script setup>
import { ref, onMounted, computed } from "vue";
import Card from "../components/Card.vue";
import Searchbar from "../components/Searchbar.vue";
import Drawer from "../components/Drawer.vue";

const movies = ref([]);
onMounted(async () => {
	const usertoken = localStorage.getItem("token");

	if (!usertoken) {
		return (window.location.href = "/login");
	} else {
		console.log("User token:", usertoken);
	}

	const responseMovies = await fetch("http://127.0.0.1:8000/api/movies?page=1", {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: "Bearer " + usertoken,
		},
	});

	if (responseMovies.ok) {
		const moviesData = await responseMovies.json();
		movies.value = moviesData;
		console.log("Movies:", moviesData);
	} else if (responseMovies.status === 401) {
		localStorage.removeItem("token");
		window.location.href = "/login";
	} else {
		throw "Error while fetching movies";
	}
});

const isDrawerOpen = ref(false);
const drawerData = ref({});
const drawerId = ref(null);
const handleEdit = (id) => {
	isDrawerOpen.value = true;
	drawerId.value = id;
	movies.value.forEach((movie) => {
		if (movie.id === id) {
			drawerData.value = movie;
		}
	});
};

const closeDrawer = () => {
	isDrawerOpen.value = false;
};
</script>

<template>
	<main v-if="movies">
		<h2>All Movies</h2>

		<Searchbar type="movies" />

		<div class="row">
			<router-link to="/movies/add">Add movie</router-link>
		</div>

		<div class="row">
			<div class="column" v-for="movie in movies">
				<Card :id="movie.id" :title="movie.title" type="movies" image="https://source.unsplash.com/random/150x200/?movie" />
				<a class="edit-movie" @click="() => handleEdit(movie.id)">Edit</a>
			</div>
		</div>
	</main>
	<main v-else>
		<h2>Loading...</h2>
	</main>

	<Drawer :isOpen="isDrawerOpen" @close-drawer="closeDrawer" :id="drawerId" :data="drawerData" />
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

.row img {
	border-radius: 5px;
	height: 200px;
	width: 150px;
}

.row p {
	text-align: center;
	margin-top: 10px;
}

.column {
	width: 150px;
	display: flex;
	flex-direction: column;
	gap: 5px;
	align-items: center;
	margin: 20px;
}

.edit-movie {
	color: hsla(160, 100%, 37%, 1);
	cursor: pointer;
}
</style>
