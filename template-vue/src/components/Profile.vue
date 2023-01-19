<template>
    <div>
        <header>
            <img :key="componentKey" v-if="renderComponent" id="profPic" v-bind:src="this.user.photoURL" height="120px" width="120px" ref="pic" />
            <span :key="componentKey" v-if="renderComponent" id="name">{{this.user.displayName}}</span>
        </header>
        <v-tabs color="primary">
            <v-tab>Asteroids</v-tab>
            <v-tab>Snake</v-tab>
            <v-tab>Flappy Bat</v-tab>
            <v-tab-item>
                <v-simple-table id="scoretable">
                    <thead>
                    <tr id="asteroids">
                        <th>Ranking</th>
                        <th>Score</th>
                        <th>Username</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(asteroidScores,pos) in asteroidScores" :key="pos">
                        <td v-bind:ref="pos">{{pos +1 }}</td>
                        <td>{{asteroidScores.Score}}</td>
                        <td>{{asteroidScores.User}}</td>
                    </tr>
                    </tbody>
                </v-simple-table>
            </v-tab-item>
            <v-tab-item>
                <v-simple-table id="scoretable">
                    <thead>
                    <tr id="snake">
                        <th>Ranking</th>
                        <th>Score</th>
                        <th>Username</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(snakeScores,pos) in snakeScores" :key="pos">
                        <td v-bind:ref="pos">{{pos +1 }}</td>
                        <td>{{snakeScores.Score}}</td>
                        <td>{{snakeScores.User}}</td>
                    </tr>
                    </tbody>
                </v-simple-table>
            </v-tab-item>
            <v-tab-item>
                <v-simple-table id="scoretable">
                    <thead>
                    <tr id="flap">
                        <th>Ranking</th>
                        <th>Score</th>
                        <th>Username</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(flapBatScores,pos) in flapBatScores" :key="pos">
                        <td v-bind:ref="pos">{{pos +1 }}</td>
                        <td>{{flapBatScores.Score}}</td>
                        <td>{{flapBatScores.User}}</td>
                    </tr>
                    </tbody>
                </v-simple-table>
            </v-tab-item>
        </v-tabs>
        <div></div>
        <v-bottom-sheet v-model="sheet" :inset="true" overlay-color="secondary" >
      <template v-slot:activator="{ on }">
        <v-btn color="accent" dark v-on="on" id="updateBtn" absolute=true bottom=true>Update Info</v-btn>
      </template>
        <v-list>
            <v-list-item>
                <v-list-item-content>
                    <v-text-field v-model="newName" :rules="nameRules" label="New User Name" counter=15></v-text-field>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-text-field v-model="newPhoto" :rules="photoRules" label="Profile Picture (URL)" counter=300></v-text-field>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-btn id="can" class="mt-6" flat color="red" @click=cancel>cancel</v-btn>
                </v-list-item-content>
                <v-list-item-content>
                    <v-btn class="mt-6" flat color="success" @click=update>submit</v-btn>
                </v-list-item-content>
            </v-list-item>
        </v-list>  
    </v-bottom-sheet>
    </div>
</template>

<script>
import { AppAUTH } from "../db-init.js";
import { AppDB } from "../db-init.js";

export default {
    data: function() {
        return {
            user: [],
            componentKey: 0,
            renderComponent: true,
            sheet: false,
            newName: "",
            newPhoto: "",
            nameRules: [v => v.length <= 15 || 'Max 15 characters'],
            photoRules: [v => v.length <= 300 || 'Max 300 characters'],
            allScores: [],
            snakeScores: [],
            asteroidScores: [],
            flapBatScores: [],
            fullLoad: false,
            refsman: [],
            testobj: []
        };
    },
    beforeMount(){
        let userinfo = AppAUTH.currentUser;
        this.user = userinfo;
    },
    mounted() {
        //this.user.push(AppAUTH.currentUser);
        
        AppDB.ref("Highscore").on("child_added", this.dataHandler);
        //this.pic = userinfo.photoURL;
    },
    methods:{
        update(){
            if(this.newName.length <= 15 && this.newPhoto.length <= 300)
            {
                this.sheet = !this.sheet;
                if(this.newName=="") this.newName=this.user.displayName;
                if(this.newPhoto=="") this.newPhoto=this.user.photoURL;
                AppAUTH.currentUser
                    .updateProfile({
                    displayName: this.newName,
                    photoURL: this.newPhoto
                    })
                    .then(
                    function() {
                        
                    },
                    function(err) {
                        // An error happened.
                        alert("Error " + err);
                    }
                    );
                    document.getElementById("profPic").src = this.newPhoto;
                    document.getElementById("name").innerHTML = this.newName;
                    this.newName = "";
                    this.newPhoto = "";
                
            }
        },
        cancel(){
            this.sheet = !this.sheet;
            this.newName = "";
            this.newPhoto = "";
        },
        dataHandler(snapshot) {
            const item = snapshot.val();
            this.allScores.push({ ...item });
            if (item.Game == "Snake") {
                if(item.Email == this.user.email)
                {    
                    this.snakeScores.push({ ...item });
                    this.snakeScores.sort((a, b) => (a.Score < b.Score ? 1 : -1));
                    this.snakeScores = this.snakeScores.slice(0, 3);
                }
            }
            if (item.Game == "Asteroids") {
                if(item.Email == this.user.email)
                {    
                    this.asteroidScores.push({ ...item });
                    this.asteroidScores.sort((a, b) => (a.Score < b.Score ? 1 : -1));
                    this.asteroidScores = this.asteroidScores.slice(0, 3);
                }
            }
            if (item.Game == "FlappyBat") {
                if(item.Email == this.user.email)
                {    
                    this.flapBatScores.push({ ...item });
                    this.flapBatScores.sort((a, b) => (a.Score < b.Score ? 1 : -1));
                    this.flapBatScores = this.flapBatScores.slice(0, 3);
                }
            }
        },
    }
    };
</script>

<style scoped>
    div{
        height: 100%;
    }
    header{
        display: flex;
        flex-direction: row;
        justify-content:center;
        padding-bottom: 5vh;
    }
    #name{
        font-size: 300%;
        padding-top: 2vh;
        float: right;
        margin-left:2vh;
    }
    #profPic{
        margin-right:2vh;
    }
    #uBtn{
        justify-self: baseline;
    }
    #text-center {
        display: grid;
        grid-template-columns: auto auto;
    }
    #updateBtn{
        margin-bottom: 7vh;
        /*
        padding-left:33vh;
        padding-right: 33vh;
        margin-left: .5vh;
        
        margin-right: auto;
        justify-self: center; */
    }

</style>