import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Movies from "../views/Movies.vue";
import Actors from "../views/Actors.vue";
import Categories from "../views/Categories.vue";
import MovieDetails from "../views/MovieDetails.vue";
import ActorDetails from "../views/ActorDetails.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Search from "../views/Search.vue";

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
			path: "/categories",
			component: Categories,
		},
		{
			path: "/movies/:id",
			component: MovieDetails,
		},
		{
			path: "/actors/:id",
			component: ActorDetails,
		},
		{
			path: "/login",
			component: Login,
		},
		{
			path: "/logout",
			component: Logout,
		},
		{
			path: "/search",
			component: Search,
		},
	],
});

export default router;
