<script setup>
import { defineProps, ref, computed } from "vue";
import Modal from "../components/Modal.vue";
import Drawer from "../components/Drawer.vue";

const isModalVisible = ref(false);

const showModal = () => {
	isModalVisible.value = true;
};

const closeModal = () => {
	isModalVisible.value = false;
};

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	id: {
		type: Number,
		required: true,
	},
	data: {
		type: Object,
		required: false,
	},
	showActions: {
		type: Boolean,
		required: false,
		default: false,
	},
});

const imageLoaded = ref(false);
const image = new Image();
image.src = props.image;

image.onload = () => {
	imageLoaded.value = true;
};

const handleModal = () => {
	showModal();
};

const handleDelete = async () => {
	const usertoken = localStorage.getItem("token");

	if (!usertoken) {
		return (window.location.href = "/login");
	}

	const response = await fetch(`http://127.0.0.1:8000/api/${props.type}/${props.id}`, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: "Bearer " + usertoken,
		},
		method: "DELETE",
	});

	if (response.ok) {
		closeModal();
		window.location.reload();
	} else if (response.status === 401) {
		localStorage.removeItem("token");
		window.location.href = "/login";
	} else {
		throw "Error while deleting";
	}
};

const isDrawerOpen = ref(false);
const drawerData = ref({});
const drawerId = ref(null);
const handleEdit = (id) => {
	isDrawerOpen.value = true;
	drawerId.value = id;
	drawerData.value = props.data;
};

const closeDrawer = () => {
	isDrawerOpen.value = false;
};
</script>

<template>
	<Modal v-show="isModalVisible" @close="closeModal" @handleDelete="handleDelete">
		<template v-slot:body>
			<p>Do you really want to delete {{ title }}?</p>
		</template>
	</Modal>

	<div class="skeleton-card" v-if="!imageLoaded">
		<div class="column">
			<div class="skeleton-image"></div>
			<div class="skeleton-text"></div>

			<div class="row" v-if="props.showActions">
				<div class="skeleton-text"></div>
				<div class="skeleton-text"></div>
			</div>
		</div>
	</div>
	<router-link :to="{ path: '/' + type + '/' + id }" v-else>
		<div class="column">
			<img :src="image.src" alt="Movie Image" />

			<div class="title-row">
				<p>{{ title }}</p>
				<div v-if="props.type === 'movies'">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(245,31,82,1)"><path d="M12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502V15.968ZM12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path></svg>
					<span>{{ props.data.note }}</span>
				</div>
			</div>

			<div class="row" v-if="props.showActions">
				<a v-if="props.data" @click.prevent="() => handleEdit(props.id)">Edit</a>
				<a @click.prevent="handleModal">Delete</a>
			</div>
		</div>
	</router-link>

	<Drawer :type="props.type" :isOpen="isDrawerOpen" @close-drawer="closeDrawer" :id="drawerId" :data="drawerData" />
</template>

<style scoped>
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
	background-color: #111114;
}

.row {
	margin-top: 10px;
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	flex-wrap: wrap;
	gap: 15px;
	justify-content: center;
}

.row img {
	border-radius: 5px;
	height: 400px;
	width: 300px;
}

.row p {
	text-align: left;
	margin-top: 10px;
	color: white;
	text-transform: uppercase;
	font-size: 18px;
	font-weight: 600;
	align-self: flex-start;
}

.title-row {
	margin-top: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.title-row p {
	margin: 0;
}

.title-row div {
	display: flex;
	align-items: center;
	gap: 5px;
}

.title-row div span {
	color: #ccc;
	font-size: 18px;
	font-weight: 600;
}

.title-row div svg {
	height: 24px;
	width: 24px;
}

.skeleton-card {
	width: 150px;
	height: 300px;
	margin: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 10px;
}

.skeleton-image {
	width: 150px;
	height: 200px;
	background-color: #111114;
	border-radius: 5px;
}

.skeleton-text {
	width: 100px;
	height: 20px;
	background-color: #111114;
	border-radius: 5px;
	margin-top: 10px;
}
</style>
