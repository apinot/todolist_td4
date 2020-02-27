<template>
    <Page>
        <ActionBar title="Groceries">
            <ActionItem text="Add" @tap="onAddTap"></ActionItem>   
        </ActionBar>
        <StackLayout>
            <TabView :selectedIndex="selectedIndex">
                <TabViewItem title="All">
                    <GroceryList :items="all"></GroceryList>
                </TabViewItem>
                <TabViewItem title="Not done">
                    <StackLayout>
                        <GroceryList :items="notDoneItems"></GroceryList>
                    </StackLayout>
                </TabViewItem>
                <TabViewItem title="Done">
                    <StackLayout>
                        <GroceryList :items="doneItems"></GroceryList>
                    </StackLayout>
                </TabViewItem>
            </TabView>
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
            all: function() {
                return this.items;
            },
            notDoneItems: function() {
                return this.items.filter(item => !item.done);
            },
            doneItems: function() {
                return this.items.filter(item => item.done);
            }
        }
    };
</script>