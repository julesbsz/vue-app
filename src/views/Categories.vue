<script setup>
import { ref, onMounted } from "vue";
import Card from "../components/Card.vue";
import Searchbar from "../components/Searchbar.vue";

const categories = ref([]);
onMounted(async () => {
	const usertoken = localStorage.getItem("token");

	if (!usertoken) {
		return (window.location.href = "/login");
	}

	const responseCategories = await fetch("http://127.0.0.1:8000/api/categories?page=1", {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: "Bearer " + usertoken,
		},
	});

	if (responseCategories.ok) {
		const categoriesData = await responseCategories.json();
		categories.value = categoriesData;
	} else if (responseCategories.status === 401) {
		localStorage.removeItem("token");
		window.location.href = "/login";
	} else {
		throw "Error while fetching movies";
	}
});
</script>

<template>
	<main v-if="categories">
		<h2>All Categories</h2>

		<Searchbar type="categories" />

		<div class="row">
			<router-link to="/categories/add">Add Category</router-link>
		</div>

		<div class="row">
			<Card v-for="item in categories" :show-actions="true" :data="item" :id="item.id" :title="item.name" type="categories" image="https://source.unsplash.com/random/150x200/?film" />
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
