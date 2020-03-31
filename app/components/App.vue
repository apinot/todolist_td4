<template>
    <Page>
        <ActionBar title="Groceries">
            <ActionItem text="Add" @tap="onAddTap"></ActionItem>   
            <ActionItem text="Sign out" @tap="signoutTap"></ActionItem>   
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
        },
        signoutTap: function() {
            confirm({
                title: 'Sign out',
                message: 'Do you really want to sign out ?',
                okButtonText: 'Sign out',
                cancelButtonText: 'Cancel'
            })
            .then((result) => {
                if(!result) return;
                this.$store.dispatch('auth', null);
            })
        }
    },
    computed: {
        items: function() {
            return this.$store.getters.todoItems;
        }
    }
};
</script>