
<template>
  <h1>My Amazing Application</h1>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/movies">Movies</router-link>
    <router-link to="/actors">Actors</router-link>
    <router-link to="/categories">Categories</router-link>
  </nav>

  <router-view></router-view>
</template>

<style scoped>
nav {
  display: flex;
  gap: 20px;
  margin-bottom: 50px;
  margin-top: 15px;
}
</style>