<template>
    <Page>
        <ActionBar title="Groceries">
            <ActionItem text="Add" @tap="onAddTap"></ActionItem>   
        </ActionBar>
        <StackLayout>
            <GroceryList :items="items"></GroceryList>
        </StackLayout>
    </Page>
</template>

<script>
import Login from './Login';
import GroceryList from './GroceryList';
import AddItem from './AddItem';

export default {
    components: {
        GroceryList,
        AddItem,
    },
    data() {
        return {
            selectedIndex: 0,
        };
    },
    methods: {
        onAddTap: function() {
            this.$showModal(AddItem).then((newItem) => {
                if(newItem) {
                    this.$store.dispatch('insert', newItem);
                }
            });
        }
    },
    computed: {
        items: function() {
            console.log('33333333333333333333333333333333333333');
            return this.$store.getters.todoItems;
        }
    }
};
</script>