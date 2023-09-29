import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import MovieDetails from "../views/MovieDetails.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: Home,
		},
		{
			path: "/movies/:id",
			component: MovieDetails,
		},
	],
});

export default router;
