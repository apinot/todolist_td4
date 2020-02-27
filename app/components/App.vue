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
                const newId = new Date().getTime();
                this.$showModal(AddItem, {props: {
                    id: newId,
                }}).then((newItem) => {
                    if(newItem) {
                        this.items.unshift(newItem);  
                    }
                });
            }
        },
        computed: {
            items: function() {
                return this.$store.getters.todoItems.filter(item => !item.deleted);
            }
        }
    };
</script>