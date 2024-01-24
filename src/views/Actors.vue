<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Card from "../components/Card.vue";
import Searchbar from "../components/Searchbar.vue";

const actors = ref([]);
onMounted(async () => {
	const usertoken = localStorage.getItem("token");

	if (!usertoken) {
		return (window.location.href = "/login");
	}

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
		console.log("actors:", actors.value);
	} else if (responseActors.status === 401) {
		localStorage.removeItem("token");
		window.location.href = "/login";
	} else {
		throw "Error while fetching movies";
	}
});
</script>

<template>
	<main v-if="actors">
		<h2>All Actors</h2>

		<Searchbar type="actors" />

		<div class="row">
			<Card v-for="item in actors" :show-actions="true" :data="item" :id="item.id" :title="item.lastname" type="actors" image="https://source.unsplash.com/random/150x200/?actor" />
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
