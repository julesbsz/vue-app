<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import moment from "moment";
import Card from "../components/Card.vue";

const router = useRoute();
const category = ref(null);

onMounted(async () => {
	if (!router.params.id) {
		return (window.location.href = "/categories");
	}

	const usertoken = localStorage.getItem("token");

	if (!usertoken) {
		return (window.location.href = "/login");
	}

	const response = await fetch("http://127.0.0.1:8000/api/categories/" + router.params.id, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: "Bearer " + usertoken,
		},
	});

	if (response.ok) {
		const categorieData = await response.json();
		category.value = categorieData;
		console.log("Category:", categorieData);
	} else if (response.status === 401) {
		localStorage.removeItem("token");
		window.location.href = "/login";
	} else {
		throw "Error while fetching movies";
	}
});
</script>

<template>
	<main v-if="category">
		<img src="https://source.unsplash.com/random/300x400/?movie" :alt="category.name" />
		<h2>{{ category.name }}</h2>

		<div class="row">
			<!-- <div class="column" v-for="movie in category.movies">
				<Card :id="movie.id" :data="movie" :title="movie.title" type="movies" image="https://source.unsplash.com/random/150x200/?movie" />
			</div> -->
		</div>

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
	border-radius: 10px;
}

h2 {
	margin-bottom: 20px;
}

p {
	margin-bottom: 10px;
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
</style>
