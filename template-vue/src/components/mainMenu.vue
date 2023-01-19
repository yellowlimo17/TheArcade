<template>
<body>
  <v-row id="btns">
    <v-col>
      <v-btn dark color="success" id="pro" @click="proBtn">Profile</v-btn>
    </v-col>
    <v-col>
      <v-btn dark color="accent" id="lea" @click="leaBtn">Leaderboard</v-btn>
    </v-col>
    </v-row>

  <div id="games">
    <v-col>
      <v-row>
        <img src="../components/img/asteroids.jpg" height="90px" width="90px"/>
      </v-row>
      <br>
      <v-row>
        <img src="../components/img/snake.png" height="90px" width="90px"/>
      </v-row>
      <br>
      <v-row>
        <img src="../components/img/flappyBat.png" height="90px" width="90px"/>
      </v-row>
    </v-col>

    <v-col>
      <v-row>
        <v-btn id="ast" @click="astBtn">Asteroids</v-btn>
      </v-row>
      <br>
      <v-row>
        <v-btn id="sna" @click="snaBtn">Snake</v-btn>
      </v-row>
      <br>
      <v-row>
        <v-btn id="fla" @click="flaBtn">Flappy Bat</v-btn>
      </v-row>
    </v-col>

  </div>
</body>
</template>

<script>
import { AppAUTH } from "../db-init.js";
export default {
  data: function() {
        return {
            user: [],
            componentKey: 0,
        };
  },
  methods: {
    proBtn() {
      this.$router.push({ path: "/profile" });
    },
    leaBtn() {
      this.$router.push({ path: "/leaderboard" });
    },
    astBtn() {
      this.$router.push({ path: "/asteroid" });
    },
    snaBtn() {
      this.$router.push({ path: "/snake" });
    },
    flaBtn() {
      this.$router.push({ path: "/flappy" });
    }
  },
  mounted()
  {
    let userinfo = AppAUTH.currentUser;
        this.user = userinfo;
        if (this.user.displayName == null) {
            AppAUTH.currentUser
                .updateProfile({
                displayName: this.user.email.substring(0, this.user.email.indexOf('@')),
                photoURL:
                    "https://www.scirra.com/images/articles/windows-8-user-account.jpg"
                })
                .then(
                function() {},
                function(err) {
                    // An error happened.
                    alert("Error " + err);
                }
                );
        }
  }
};
</script>

<style scoped>
body {
  display: flex;
  min-height: 87vh;
  flex-direction: column;
  margin: 0;
}
#games {
  display: flex;
  flex: 1;
  margin: auto;
  flex-direction: row;
  justify-content: space-around;
}
#ast {
  float: center;
  font-size: 200%;
  padding-top: 5%;
  padding-bottom: 8%;
  width: 250px;
  height: 90px;
}
#sna {
  float: center;
  font-size: 200%;
  padding-top: 5%;
  padding-bottom: 8%;
  width: 250px;
  height: 90px;
}
#fla {
  float: center;
  font-size: 200%;
  padding-top: 5%;
  padding-bottom: 8%;
  width: 250px;
  height: 90px;
}
#pro {
  float: left;
  width: 225px;
  font-size: 125%;
}
#lea{ 
    float:right;
    width: 225px;
    font-size: 125%;
}

</style>