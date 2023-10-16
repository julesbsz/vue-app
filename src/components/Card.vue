<script setup>
import { defineProps } from 'vue'

defineProps({
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
})

</script>

<template>
    <router-link :to="{ path: '/' + type + '/' + id }">
        <div class="column">
            <img :src="image" :alt="title">
            <p>{{ title }}</p>
        </div>
    </router-link>
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
    background-color: #ECECEC;
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