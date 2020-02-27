<template>
    <Page>
        <ActionBar title="Groceries">
            <ActionItem text="Add" @tap="onAddTap"></ActionItem>   
        </ActionBar>
        <StackLayout>
            <GroceryList :items="showItems"></GroceryList>
        </StackLayout>
    </Page>
</template>

<script>
import groceryData from '../grocery-data.json';
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
                items: groceryData.groceryItems.sort((a, b) => b.id - a.id),
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
            showItems: function() {
                if(! this.items) return []; 
                return this.items.filter(item => !item.deleted);
            }
        }
    };
</script>