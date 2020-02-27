<template>
    <Page>
        <StackLayout>
            <Label text="Add new Item"></Label>
            <TextField v-model="name" hint="Enter name"></TextField>
            <Button text="Save" @tap="onSaveTap"></Button> 
        </StackLayout>
    </Page>
</template>

<script>
export default {
    data: function() {
        return {
            name: ''
        };
    },
    methods: {
        onSaveTap: function() {
            const newItem = {
                id: -1,
                name: this.name,
                done: false,
                deleted: false
            }
            this.$modal.close(this.name ? newItem : null);    
        }
    }
}
</script>