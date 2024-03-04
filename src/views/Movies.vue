<script setup>
import { ref, onMounted, computed } from "vue";
import Card from "../components/Card.vue";
import Searchbar from "../components/Searchbar.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const page = ref(route.query.page || 1);
const filter = ref(route.query.title || null);

const isNextPageDisabled = ref(true);

const movies = ref([]);
onMounted(async () => {
	const usertoken = localStorage.getItem("token");

	if (!usertoken) {
		return (window.location.href = "/login");
	}

	const responseMovies = await fetch(`http://127.0.0.1:8000/api/movies?page=${page.value}${filter.value ? "&title=" + filter.value : ""}&nbItems=9`, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: "Bearer " + usertoken,
		},
	});

	if (responseMovies.ok) {
		const moviesData = await responseMovies.json();

		if (moviesData.length <= 0) {
			return (window.location.href = "/movies?page=1");
		}

		movies.value = moviesData;
		console.log("Movies:", moviesData);
	} else if (responseMovies.status === 401) {
		localStorage.removeItem("token");
		window.location.href = "/login";
	} else {
		throw "Error while fetching movies";
	}

	if (!filter.value) {
		const tempPage = page.value + 1;
		const responseNextMovies = await fetch(`http://127.0.0.1:8000/api/movies?page=${tempPage}`, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: "Bearer " + usertoken,
			},
		});

		if (responseNextMovies.status === 401) {
			localStorage.removeItem("token");
			window.location.href = "/login";
		}

		if (responseNextMovies.ok) {
			const nextMovies = await responseNextMovies.json();
			if (nextMovies.length > 0) {
				isNextPageDisabled.value = false;
			}
		}
	}
});

const previousPage = () => {
	page.value--;
	window.location.href = `/movies?page=${page.value}`;
};

const nextPage = async () => {
	if (isNextPageDisabled.value) {
		return;
	}

	page.value++;
	window.location.href = `/movies?page=${page.value}`;
};
</script>

<template>
	<main v-if="movies">
		<Searchbar type="movies" />

		<div class="row">
			<router-link class="add-movie" to="/movies/add">Create a movie</router-link>
		</div>

		<div class="row">
			<Card v-for="movie in movies" :show-actions="true" :id="movie.id" :data="movie" :title="movie.title" type="movies" image="https://source.unsplash.com/random/150x200/?movie" />
		</div>

		<div class="row" id="pagination">
			<button class="btn btn-primary" @click="previousPage" :disabled="page <= 1">Previous</button>
			<button class="btn btn-primary" @click="nextPage" :disabled="isNextPageDisabled">Next</button>
		</div>
	</main>
	<main class="loader-container" v-else>
		<span class="loader"></span>
	</main>
</template>

<style scoped>
.add-movie {
	background-color: var(--color-main);
	border: none;
	border-radius: 5px;
	transition: all 0.3s;
	cursor: pointer;
	color: white;
	font-weight: 600;
	padding: 8px 20px;
	margin: 0 auto;
	margin-top: 30px;
}

.add-movie:hover {
	filter: brightness(0.8);
}

#actors-title {
	margin-top: 50px;
}

.row {
	margin: 20px 0;
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	gap: 40px;
	margin-top: 50px;
}

.row#pagination {
	justify-content: center;
	gap: 10px;
}

button {
	background-color: var(--color-main);
	border: none;
	border-radius: 5px;
	transition: all 0.3s;
	cursor: pointer;
	color: white;
	font-weight: 600;
	padding: 10px 20px;
}

button:hover {
	filter: brightness(0.8);
}

button:disabled {
	background-color: #333333;
	cursor: not-allowed;
}

button:disabled:hover {
	filter: brightness(1);
}
</style>
