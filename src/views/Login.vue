<script setup>
import { ref, onMounted } from "vue";

const email = ref("jules@gmail.com");
const password = ref("test");

const message = ref("");
onMounted(() => {
	message.value = localStorage.getItem("message");

	if (message.value) {
		localStorage.removeItem("message");
	}
});

const loading = ref(false);
const handleLogin = () => {
	loading.value = true;

	const json = {
		username: email.value,
		password: password.value,
	};

	const request = fetch("http://127.0.0.1:8000/api/login_check", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(json),
	});

	request.then((response) => {
		if (response.status === 200) {
			response.json().then((data) => {
				console.log("login request data.token:", data);
				localStorage.setItem("token", data.token);
				window.location.href = "/";
			});
		} else if (response.status === 401) {
			message.value = "Wrong credentials";
		} else {
			response.json().then((data) => {
				throw new Error("An error occured when trying to connect user:", data.message);
			});
		}

		loading.value = false;
	});
};
</script>

<template>
	<main>
		<form @submit.prevent="">
			<h2>Welcome Back</h2>
			<span>Don't have an account? <a>Too bad</a></span>

			<div class="column">
				<label for="email">E-mail addess</label>

				<div class="input-container">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,1)"><path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path></svg>
					<input type="email" name="email" id="email" placeholder="Email is jules@gmail.com" v-model="email" />
				</div>
			</div>

			<div class="column">
				<label for="password">Password</label>

				<div class="input-container">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,255,255,1)"><path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM5 10V20H19V10H5ZM11 14H13V16H11V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z"></path></svg>
					<input type="password" name="password" id="password" placeholder="Password is test" v-model="password" />
				</div>
			</div>

			<button @click="handleLogin" :disabled="loading">
				<template v-if="loading">Loading...</template>
				<template v-else>Login</template>
			</button>

			<p v-if="message" class="message">{{ message }}</p>
		</form>
	</main>
</template>

<style scoped>
main {
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

form {
	background-color: #111114;
	padding: 50px;
	border-radius: 5px;
}

form label {
	margin-top: 20px;
}

h2 {
	margin-bottom: 30px;
}

.input-container {
	display: flex;
	align-items: center;
	gap: 10px;
}

.input-container svg {
	height: 20px;
	width: 20px;
}

.column {
	display: flex;
	flex-direction: column;
	gap: 5px;
	align-items: flex-start;
	margin-bottom: 30px;
}

h2 {
	text-align: center;
	font-size: 44px;
	font-weight: bold;
	margin-bottom: 10px;
}

form span {
	font-size: 14px;
	color: #cccccc;
	width: 100%;
	display: block;
	text-align: center;
}

form span a {
	color: white;
	text-decoration: none;
	font-weight: 500;
}

input {
	height: 30px;
	width: 400px;
	background-color: transparent;
	border: none;
	outline: none;
	border-bottom: 1px #ececec solid;
	color: white;
	font-size: 16px;
}

input::placeholder {
	color: #cccccc;
}

button {
	border: none;
	background-color: var(--color-main);
	color: white;
	align-self: flex-start;
	padding: 10px 30px;
	border-radius: 5px;
	text-decoration: none;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s;
	display: flex;
	align-items: center;
	gap: 10px;
	margin: 0 auto;
}

button svg {
	height: 24px;
	width: 24px;
}

button:hover {
	filter: brightness(0.8);
}

.message {
	color: coral;
	padding-top: 20px;
	text-align: center;
}
</style>
