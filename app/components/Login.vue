<template>
    <Page>
        <ActionBar title="Groceries">
            <ActionItem text="Sign Up" @tap="goSignup"></ActionItem>   
        </ActionBar>
        <StackLayout>
            <Label marginTop="30" text="Login" color="black" fontSize="25"  horizontalAlignment="center"></Label>
            <TextField v-model="email" hint="Email"/>
            <TextField v-model="password" hint="Password"/>
            <Label v-if="error" :text="error" color="red" horizontalAlignment="center"></Label>
            <Button @tap="onLogin" marginTop="30">
                Login
            </Button>
            <!-- <ActivityIndicator :busy="loading"/> -->
        </StackLayout>
    </Page>
</template>

<script>
import axios from 'axios';
import SignUp from './SignUp';
import HomePage from './App';
import {decode, encode} from "base-64";
import btoa from 'btoa';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: null,
            loading: false,
        };
    },
    methods: {
        goSignup() {
            this.$navigateTo(SignUp);
        },
        goHome() {
            this.$navigateTo(HomePage);
        },
        onLogin() {
            if(this.loading) return;
            this.loading = true;

            if(!global.btoa)
              global.btoa = encode;


            axios.post('https://api.todolist.sherpa.one/users/signin', {}, {
                headers: {
                    Authorization : `Basic ${btoa(this.email + ':' + this.password)}`
                }
            })
            .then((response) => {
                this.$store.dispatch('auth', response.data);
            })
            .catch((error) => {
                console.log(error);
                this.error = 'Email ou mot de passe incorrecte !'
            })
            .finally(() => {
                this.loading = false;
            })
        }
    }
}
</script>