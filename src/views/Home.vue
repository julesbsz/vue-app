<script setup>
import { ref, onMounted } from "vue";
import Card from "../components/Card.vue";
import moment from "moment";

const movies = ref([]);
const latestMovie = ref(null);
const actors = ref([]);
onMounted(async () => {
	const usertoken = localStorage.getItem("token");

	if (!usertoken) {
		return (window.location.href = "/login");
	}

	// fetch movies
	const responseMovies = await fetch("http://127.0.0.1:8000/api/movies?page=1&nbItems=6", {
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

	// fetch ators
	const responseActors = await fetch("http://127.0.0.1:8000/api/actors?page=1", {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: "Bearer " + usertoken,
		},
	});

	if (responseActors.ok) {
		const actorsData = await responseActors.json();
		actors.value = actorsData;
		console.log("Actors:", actorsData);
	} else {
		throw "Error while fetching actors";
	}

	// Getting latest movie and removing it from the list
	latestMovie.value = movies.value[0];
	movies.value.shift();
});
</script>

<template>
	<main v-if="movies && latestMovie">
		<header>
			<span>Released {{ moment(latestMovie.releaseDate).days() }} days ago.</span>
			<h2>{{ latestMovie.title }}</h2>

			<a :href="'/movies/' + latestMovie.id" class="watch" target="_blank">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,1)"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM10.6219 8.41459L15.5008 11.6672C15.6846 11.7897 15.7343 12.0381 15.6117 12.2219C15.5824 12.2658 15.5447 12.3035 15.5008 12.3328L10.6219 15.5854C10.4381 15.708 10.1897 15.6583 10.0672 15.4745C10.0234 15.4088 10 15.3316 10 15.2526V8.74741C10 8.52649 10.1791 8.34741 10.4 8.34741C10.479 8.34741 10.5562 8.37078 10.6219 8.41459Z"></path></svg>
				Play Trailer
			</a>
		</header>

		<h2>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,1)"><path d="M20 13C20 15.2091 19.1046 17.2091 17.6569 18.6569L19.0711 20.0711C20.8807 18.2614 22 15.7614 22 13 22 7.47715 17.5228 3 12 3 6.47715 3 2 7.47715 2 13 2 15.7614 3.11929 18.2614 4.92893 20.0711L6.34315 18.6569C4.89543 17.2091 4 15.2091 4 13 4 8.58172 7.58172 5 12 5 16.4183 5 20 8.58172 20 13ZM15.293 8.29297 10.793 12.793 12.2072 14.2072 16.7072 9.70718 15.293 8.29297Z"></path></svg>
			Trendy Movies
		</h2>
		<div class="row">
			<Card v-for="movie in movies.slice(0, 5)" :id="movie.id" :title="movie.title" type="movies" image="https://source.unsplash.com/random/150x200/?movie" />
		</div>

		<h2 id="actors-title">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,1)"><path d="M17 15.2454V22.1169C17 22.393 16.7761 22.617 16.5 22.617C16.4094 22.617 16.3205 22.5923 16.2428 22.5457L12 20L7.75725 22.5457C7.52046 22.6877 7.21333 22.6109 7.07125 22.3742C7.02463 22.2964 7 22.2075 7 22.1169V15.2454C5.17107 13.7793 4 11.5264 4 9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9C20 11.5264 18.8289 13.7793 17 15.2454ZM12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15ZM12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13Z"></path></svg>
			Best Actors
		</h2>
		<div class="row">
			<Card v-for="actor in actors.slice(0, 5)" :id="actor.id" :title="actor.firstname + ' ' + actor.lastname" type="actors" image="https://source.unsplash.com/random/150x200/?human" />
		</div>
	</main>
	<main v-else>
		<h2>Loading...</h2>
	</main>
</template>

<style scoped>
header {
	position: relative;
	height: 60vh;
	width: 100%;
	background-image: url("https://source.unsplash.com/random/1920x1080/?poster");
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	justify-content: center;
	padding: 0 6%;
	gap: 10px;
	border-radius: 5px;
	margin-bottom: 50px;
}

header::after {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.05);
	z-index: -1;
}

header span {
	font-size: 18px;
	color: #ccc;
}

header h2 {
	color: white;
	font-size: clamp(30px, 5vw, 80px);
	line-height: 1.2;
	font-weight: 900;
	margin-bottom: 10px;
}

h2 {
	display: flex;
	align-items: center;
	gap: 10px;
	font-weight: 600;
}

h2 svg {
	height: 24px;
	width: 24px;
}

.watch {
	background-color: var(--color-main);
	color: white;
	align-self: flex-start;
	padding: 10px 20px;
	border-radius: 5px;
	text-decoration: none;
	font-size: 18px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s;
	display: flex;
	align-items: center;
	gap: 10px;
}

.watch svg {
	height: 24px;
	width: 24px;
}

.watch:hover {
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
	justify-content: space-between;
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
	background-color: #ececec;
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
