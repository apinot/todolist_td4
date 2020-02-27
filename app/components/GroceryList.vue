<template>
    <TabView :selectedIndex="selectedIndex">
        <TabViewItem title="All">
            <GroceryListTab :items="all"></GroceryListTab>
        </TabViewItem>
        <TabViewItem title="Not done">
            <StackLayout>
                <GroceryListTab :items="notDoneItems"></GroceryListTab>
            </StackLayout>
        </TabViewItem>
        <TabViewItem title="Done">
            <StackLayout>
                <GroceryListTab :items="doneItems"></GroceryListTab>
            </StackLayout>
        </TabViewItem>
    </TabView>
</template>

<script>
import GroceryListTab from './GroceryListTab';

    export default {
        components: {
            GroceryListTab,
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
        computed: {
            all() {
                if(! this.items) return []; 
                return this.items;
            },
            notDoneItems(){
                if(! this.items) return []; 
                return this.items.filter(item => !item.done);
            },
            doneItems(){
                if(! this.items) return []; 
                return this.items.filter(item => item.done);
            }
        }
    };
</script>
