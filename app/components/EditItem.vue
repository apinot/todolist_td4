<template>
    <Page>
        <StackLayout>
            <Label text="Edit Item"></Label>
            <TextField v-model="name" hint="Enter name"></TextField>
            <Button text="Save" @tap="onSaveTap"></Button> 
        </StackLayout>
    </Page>
</template>

<script>
export default {
    props: [
        "name",
    ],
    data: function() {
        return {
        };
    },
    methods: {
        onSaveTap: function() {
            this.$modal.close(this.name);    
        }
    }
}
</script>