<template>
    <form id="signin">
        <v-text-field label="Username/Email" v-model="userEmail"></v-text-field>
        <v-text-field type="password" label="Password" v-model="userPassword"></v-text-field>
        <v-container v-show="isLoggedIn === false">
        <v-row justify="end">        
            <v-btn dark color="red darken-2" @click="doSignUp">Sign Up</v-btn>
                <v-snackbar v-model="snackbar" :timeout="timeout">
                    {{ text }}
                    <v-btn color="red" text  @click="doSignUp; snackbar = false">
                    Close
                    </v-btn>
                </v-snackbar>
            <v-btn @click="doSignIn">Sign In</v-btn>
        </v-row>
        <br>
            <v-row justify ="end">
                <v-btn id="google" dark color="blue darken-2" @click="googleSignIn">
                        <p>Sign in with Google</p>
                    </v-btn>
            </v-row>

        </v-container>
    </form>
</template>
<script>
import { AppAUTH } from "../db-init.js";
import firebase from 'firebase';

    export default {
        data: function() {
            return {
                userEmail: "",
                userPassword: "",
                isLoggedIn: false,
                timeout: 2000,
                snackbar: false,
                text: 'Must be a valid email address.'
            }
        },
        methods: {
            doSignUp() {
                AppAUTH.createUserWithEmailAndPassword(this.userEmail, this.userPassword)
                .then(() => {
                this.$router.push({path:"/main"});
                })
                .catch(() => {
                //alert("Error " + err);
                this.snackbar=true;
                });
            },

            doSignIn() {
                AppAUTH.signInWithEmailAndPassword(this.userEmail, this.userPassword)
                .then(() => {
                this.$router.push({ path: "/main" });
                })
                .catch(() => {
                //alert("Error " + err);
                this.snackbar=true;
                this.text="Must have an active account to login."
                });
            },

            googleSignIn() {
                const provider = new firebase.auth.GoogleAuthProvider();

                firebase.auth().signInWithPopup(provider).then(() => {
                    this.$router.push({ path: "/main" });
                }).catch((err) => {
                    alert('Oops. ' + err.message)
                });
            },

        },
        mounted() {
            AppAUTH.onAuthStateChanged((u) => {
            this.isLoggedIn = u !== null;
            });
        }
    };
</script>

<style>
    #signin {
        width: 40vh;
    }

    .v-text-field label {
        font-size: 150%;
    }

    #google {
        text-align: center;
    }
</style>