<template>
    <Page>
        <StackLayout>
            <Label text="Delete this item ?"></Label>
            <Button text="Cancel" @tap="onCancelTap"></Button> 
            <Button text="Delete" @tap="onDeleteTap"></Button> 
        </StackLayout>
    </Page>
</template>

<script>
export default {
    props: [
        "id",
    ],
    data: function() {
        return {
            name: ''
        };
    },
    methods: {
        onDeleteTap: function() {
            this.$modal.close(true);    
        },
        onCancelTap: function() {
            this.$modal.close(false);    
        }
    }
}
</script>