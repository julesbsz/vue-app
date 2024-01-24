<script setup>
import { defineProps, ref, onMounted, watch } from "vue";

const usertoken = ref(null);
onMounted(() => {
	usertoken.value = localStorage.getItem("token");

	if (!usertoken) {
		return (window.location.href = "/login");
	}
});

const props = defineProps({
	isOpen: {
		type: Boolean,
		required: true,
	},
	id: {
		type: Number,
		required: false,
	},
	data: {
		type: Object,
		required: false,
	},
});

const userInput = ref(props.data.title);
const movieData = ref(props.data);
const movieId = ref(props.id);
const isDrawerOpen = ref(props.isOpen);

watch(props, () => {
	userInput.value = props.data.title;
	movieData.value = props.data;
	movieId.value = props.id;
	isDrawerOpen.value = props.isOpen;
});

const handleSave = async () => {
	if (!props.id) return;

	const response = await fetch(`http://127.0.0.1:8000/api/movies/${movieId.value}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/merge-patch+json",
			Accept: "application/json",
			Authorization: "Bearer " + usertoken.value,
		},
		body: JSON.stringify({
			title: userInput.value,
		}),
	});

	if (response.ok) {
		const movieData = await response.json();
		props.data.title = movieData.title;
		console.log("done, new title is", movieData.title, "closing...");
		isDrawerOpen.value = false;
	} else if (response.status === 401) {
		localStorage.removeItem("token");
		window.location.href = "/login";
	} else {
		throw "Error while fetching movies";
	}
};
</script>

<template>
	<div class="drawer" :class="{ active: isDrawerOpen }">
		<svg class="close-btn" @click="$emit('closeDrawer')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path></svg>

		<div class="column">
			<label for="title">Movie title</label>
			<input type="text" name="title" id="title-input" v-model="userInput" />
			<button @click="handleSave">Save</button>
		</div>
	</div>
</template>

<style scoped>
.drawer {
	position: fixed;
	top: 0;
	right: -500px;
	width: 400px;
	height: 100vh;
	background-color: #f5f5f5;
	transition: all 0.3s;
	box-shadow: -5px 0px 30px rgba(0, 0, 0, 0.1);
	z-index: 100;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 30px;
}

.drawer.active {
	right: 0;
}

.column {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 5px;
	align-items: flex-start;
	margin-bottom: 30px;
}

input {
	height: 30px;
	width: 500px;
	background-color: transparent;
	border: none;
	outline: none;
	border-bottom: 1px #ececec solid;
	color: black;
	font-size: 16px;
}

button {
	margin-top: 10px;
	height: 30px;
	width: 75px;
	background-color: hsla(160, 100%, 37%, 1);
	border: none;
	border-radius: 5px;
	transition: all 0.3s;
	cursor: pointer;
	color: white;
}

.close-btn {
	position: absolute;
	top: 30px;
	left: 30px;
	height: 35px;
	width: 35px;
	cursor: pointer;
	transition: all 0.3s;
}

.close-btn:hover {
	fill: hsla(160, 100%, 37%, 1);
	transform: rotate(-90deg);
}
</style>
