<template>
    <Page>
         <ActionBar title="Groceries">
            <ActionItem text="Edit" @tap="onEditTap"></ActionItem>   
        </ActionBar>
        <StackLayout>
            <Button text="Go back" @tap="onBackTap"></Button>
            <Label :text="itemName"></Label>
            <Button :text="statusText" @tap="toggle"></Button> 
            <Button v-if="groceryItem.done" text="Delete" @tap="onDeleteTap"></Button> 
        </StackLayout>
    </Page>
</template>

<script>
import DeleteItem from './DeleteItem';
import EditItem from './EditItem';
export default {
    components: {
        DeleteItem,
        EditItem
    },
    props: [
        'groceryItem',
    ],
    data: function() {
        return {
        };
    },
    computed: {
        statusText: function() {
            return this.groceryItem.done ? 'Set as not Done' : 'Set as Done';
        },
        itemName() {
            return this.groceryItem.name;
        }
    },
    methods: {
        onBackTap: function() {
            this.$navigateBack();
        },
        toggle: function() {
            this.update({
                id: this.groceryItem.id,
                name: this.groceryItem.name,
                done: !this.groceryItem.done,
            });
        },
        remove: function() {
            this.groceryItem.deleted = true;
            this.$navigateBack();
        },
        onDeleteTap: function(args) {
            this.$showModal(DeleteItem).then((shouldDelete) => {
                if(shouldDelete) {
                    this.remove(); 
                }
            });
        },
        onEditTap: function() {
            this.$showModal(EditItem, {props: {name: this.groceryItem.name}}).then((newName) => {
                this.update({
                    id: this.groceryItem.id,
                    name: newName,
                    done: this.groceryItem.done,
                });
            });
        },
        update(newItem) {
            this.$store.dispatch('update', newItem);
            this.groceryItem = newItem;
        }
    }
}
</script>
