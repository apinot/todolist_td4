<template>
    <Page>
        <ActionBar title="Groceries">
            <ActionItem text="Login" @tap="goLogin"></ActionItem>   
        </ActionBar>
        <StackLayout>
            <Label marginTop="30" text="Sign Up" color="black" fontSize="25"  horizontalAlignment="center"></Label>
            <TextField v-model="email" hint="Email"/>
            <TextField v-model="firstName" hint="First Name"/>
            <TextField v-model="lastName" hint="Last Name"/>
            <Label text="Gender :" fontSize="17" color="DarkGray" marginTop="10"></Label>
            <SegmentedBar v-model="selectedIndex">
                <SegmentedBarItem title="Male" />
                <SegmentedBarItem title="Female" />
            </SegmentedBar>
            <Button @tap="onSignup" marginTop="30">Sign Up</Button>
        </StackLayout>
    </Page>
</template>

<script>
import axios from 'axios';
import Login from './Login';

export default {
    data() {
        return {
            email: '',
            firstName: '',
            lastName: '',
            selectedIndex: 0,
        };
    },
    computed: {
        gender(){
            return this.selectedIndex === 1 ? 'female' : 'male';
        }
    },
    methods: {
        onSignup() {
            const user = {
                email: this.email,
                firstname: this.firstName,
                lastname: this.lastName,
                gender: this.gender,
            }

            axios.post('https://api.todolist.sherpa.one/users/signup', user)
            .then((response) => {
                this.openDialog({title: 'Signed up !', message: `Your passwoed is :\n ${response.data.password}`}, () => {
                    this.goLogin();
                }); 
            })
            .catch((error) => {
                this.openDialog({title: 'Error', message: error.message}, () => {
                    console.log(error);
                    console.log(user);
                }); 
            });
            
        },
        openDialog(data, onClosed = () => {}) {
            alert({
                title: data.title,
                message: data.message,
                okButtonText: data.okButtonText || 'OK',
            }).then(() => {
                onClosed();
            });
        },
        goLogin(){
            this.$navigateTo(Login);
        }
    }
};
</script>