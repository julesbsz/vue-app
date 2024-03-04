<script setup>
import { defineProps, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
	type: {
		type: String,
		required: true,
	},
});

const search = ref("");

const handleSearch = () => {
	if (props.type === "movies") {
		return (window.location.href = `/movies?title=${search.value}`);
	}

	if (props.type === "actors") {
		return (window.location.href = `/actors?lastname=${search.value}`);
	}

	if (props.type === "categories") {
		return (window.location.href = `/categories?name=${search.value}`);
	}
};

onMounted(() => {
	search.value = router.currentRoute.value.query.lastname || router.currentRoute.value.query.name || router.currentRoute.value.query.title || "";
});
</script>

<template>
	<div class="row searchbar">
		<input id="search" type="search" v-model="search" :placeholder="'Search a ' + props.type.slice(0, -1) + ' by name'" autofocus required />
		<button @click="handleSearch" @keyup.enter="handleSearch" :disabled="search.length <= 0 || !search">Search</button>
	</div>
</template>

<style scoped>
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
	justify-content: center;
	gap: 15px;
}

.row.row.searchbar input {
	background-color: #111114;
	height: 30px;
	width: 500px;
	border: none;
	outline: none;
	font-size: 16px;
	padding: 20px;
	border: none;
	border-radius: 5px;
	color: white;
}

.row.row.searchbar button {
	height: 38px;
	width: 100px;
	background-color: var(--color-main);
	border: none;
	border-radius: 5px;
	transition: all 0.3s;
	cursor: pointer;
	color: white;
	font-weight: 600;
}

.row.row.searchbar button:hover {
	filter: brightness(0.8);
}

.row.row.searchbar button:disabled {
	background-color: #333333;
	cursor: not-allowed;
}

.row.row.searchbar button:disabled:hover {
	filter: brightness(1);
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
