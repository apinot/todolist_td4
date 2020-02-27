<template>
    <GridLayout columns="100, *">
        <Label col="0" :text="statusText"></Label>
        <Label col="1" class="item-name" :text="groceryItem.name"></Label>
    </GridLayout>
</template>

<script>
export default {
    props: [
        'groceryItem',
    ],
    data: function() {
        return {
        };
    },
    computed: {
        statusText: function() {
            return this.groceryItem.done ? 'Done' : 'Not Done';
        }
    },
    methods: {
    }
}
</script>
