<template>
    <Page>
        <ActionBar title="Groceries">
            <ActionItem text="Sign Up" @tap="goSignup"></ActionItem>   
        </ActionBar>
        <StackLayout>
            <Label marginTop="30" text="Login" color="black" fontSize="25"  horizontalAlignment="center"></Label>
            <TextField v-model="email" hint="Email"/>
            <TextField v-model="email" hint="Password"/>
        </StackLayout>
    </Page>
</template>

<script>
import SignUp from './SignUp';

export default {
    methods: {
        goSignup() {
            this.$navigateTo(SignUp);
        }
    }
}
</script>