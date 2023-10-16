import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Movies from "../views/Movies.vue";
import Actors from "../views/Actors.vue";
import MovieDetails from "../views/MovieDetails.vue";
import ActorDetails from "../views/ActorDetails.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: Home,
		},
		{
			path: "/movies",
			component: Movies,
		},
		{
			path: "/actors",
			component: Actors,
		},
		{
			path: "/movies/:id",
			component: MovieDetails,
		},
		{
			path: "/actors/:id",
			component: ActorDetails,
		},
	],
});

export default router;
