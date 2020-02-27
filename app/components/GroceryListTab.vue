<template>
    <ListView for="item in items" @itemTap="onItemTap">
        <v-template>
            <GroceryItem :groceryItem="item"></GroceryItem>
        </v-template>
    </ListView>
</template>

<script>
import GroceryItem from './GroceryItem';
import Detail from './Detail';

    export default {
        components: {
            GroceryItem,
            Detail
        },
        props: ['items'],
        methods: {
            onItemTap: function(args) {
                this.$navigateTo(Detail, {
                   props: {
                       groceryItem: args.item
                   }
                });
            }
        },
    };
</script>
