<template>
    <b-list-group-item style="cursor:pointer" class="mr-2" @click="$emit(category.click, category)"
        :variant="category.variant"
    >
        <b-icon :icon="category.icon" font-scale="1" :animation="category.animation" ></b-icon>
        {{ category.name }}            
    </b-list-group-item>                    
</template>

<script>
    export default {
        props:{
            category: {
                type: Object,
                required: true
            }
        },
    }
</script>
