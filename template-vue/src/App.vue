<template>
<v-app>
  <v-content>
    <div id="base">
      <body id="borderT"><img id="left" height="27px" src="./assets/glasses.png"/>The Dundies Arcade<img id="right" height="27px" src="./assets/glasses.png"/></body>
      <body id="borderR"><img class="bl" id="bearr" src="./assets/battlestar.png"/></body>
      <v-layout row wrap align-center space-around>
        <v-flex>
          <transition name="component-fade" mode="out-in" appear>
            <router-view id="screen" />
          </transition>
        </v-flex>
      </v-layout>
      <body id="borderL"><img class="bl" id="bearl" src="./assets/battlestar.png"/></body>
      <body id="borderB">
        <v-btn
          id="sign"
          dark
          color="red darken-2"
          @click="signOutBtn"
          v-show="isLoggedIn === true"
        >Sign out</v-btn>
        <span id="cent">Bears. Beets. Battlestar Galactica.</span>
        <v-btn
          id="main"
          dark
          color="primary"
          @click="mainBtn"
          v-show="isLoggedIn === true"
        >Main Menu</v-btn>
      </body>
    </div>
  </v-content>
</v-app>
</template>

<script>
//import Login from './components/Login';
import { AppAUTH } from "./db-init.js";
export default {
  name: "App",
  data: function() {
    return {
      isLoggedIn: false,
      dialog: false,
    };
  },
  methods: {
    signOutBtn() {
      AppAUTH.signOut().then(() => {
        this.$router.push({ path: "/" });
      });
    },
    mainBtn() {
      this.$router.push({ path: "/main" });
    }
  },
  mounted() {
    AppAUTH.onAuthStateChanged(u => {
      this.isLoggedIn = u !== null;
    });
  }
};
</script>

<style scoped>
@font-face {
  font-family: "Astron";
  src: url("./assets/fonts/Pixellari.ttf");
  font-size: 50em;
}

#left{
  margin-right: 1vh;
}

#right{
  margin-left: 1vh;
}

#base {
  min-width: 100vw;
  min-height: 100vh;
  display: grid;
  grid-template-columns: auto 87vh auto;
  grid-template-rows: 8vh 87vh 5vh;

  font-family: "Astron";
}
#screen {
  grid-area: 2 / 2 / 2 / 2;
  padding: 5vh;
}
#borderT {
  grid-area: 1 / 1 / 1 / 4;
  font-size: 250%;
  text-align: center;
  background-color: rgb(22, 22, 22);
}
#borderR {
  grid-area: 2 / 3 / 2 / 3;
  background-color: rgb(22, 22, 22);
}
#borderL {
  grid-area: 2 / 1 / 2 / 1;
  background-color: rgb(22, 22, 22);
}
#borderB {
  grid-area: 3 / 1 / 3 / 4;
  background-color: rgb(22, 22, 22);
  text-align: center;
}
#main {
  float: left;
}
#sign {
  float: right;
}
#borderB {
  padding-left: 10vh;
  padding-right: 10vh;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}

.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
.bl{
  height: 65vh
}
#bearl{
  float:right;
}
#bearr{
  float:left;
}
#cent{
  margin-left: auto;
  margin-right: auto;
  font-size: 150%;
}
@media (max-width:1300px){
  .bl{
    display:none;
  }
  #cent{
    display:none;
  }
}
</style>
