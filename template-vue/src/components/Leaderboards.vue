<template>
  <div class="wrapper">
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
  </div>
</template>
<script>
import { AppDB } from "../db-init.js";
//import { AppAUTH } from "../db-init.js";
export default {
  data: function() {
    return {
      allScores: [],
      snakeScores: [],
      asteroidScores: [],
      flapBatScores: [],
      fullLoad: false,
      refsman: [],
      testobj: []
    };
  },
  methods: {
    dataHandler(snapshot) {
      const item = snapshot.val();
      this.allScores.push({ ...item });
      if (item.Game == "Snake") {
        this.snakeScores.push({ ...item });
        this.snakeScores.sort((a, b) => (a.Score < b.Score ? 1 : -1));
        this.snakeScores = this.snakeScores.slice(0, 8);
      }
      if (item.Game == "Asteroids") {
        this.asteroidScores.push({ ...item });
        this.asteroidScores.sort((a, b) => (a.Score < b.Score ? 1 : -1));
        this.asteroidScores = this.asteroidScores.slice(0, 8);
      }
      if (item.Game == "FlappyBat") {
        this.flapBatScores.push({ ...item });
        this.flapBatScores.sort((a, b) => (a.Score < b.Score ? 1 : -1));
        this.flapBatScores = this.flapBatScores.slice(0, 8);
      }
    }
    // getRank() {
    //   alert(this.$refs);
    // }
    //const result = words.filter(word => word.length > 6);
  },
  mounted() {
    AppDB.ref("Highscore").on("child_added", this.dataHandler);
    //setTimeout(
    //this.findPos();
    //this.getPos();
    //alert("triggered");
    //this.gameSplit(this.allScores);
    //AppDB.ref("budget").on("child_removed", this.removeExpenseItem);
  }
};
</script>
<style>
.wrapper {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  grid-auto-rows: auto;
}
.one {
  float: left;
  padding: 5px;
}
.two {
  padding: 5px;
}
.three {
  grid-column: 1/3;
  grid-row: 2;
}
#snake {
  background-image: url("../assets/img/ground.png");
  background-size: 100%;
}
#asteroids {
  background-image: url("../assets/img/galaxy.jpg");
  background-size: 100%;
}
#flap {
  background-image: url("../assets/FlappyBat/images/bgClose.png");
  background-size: 100%;
}
#scoretable tr:nth-child(1) td {
  background: rgb(194, 165, 2);
}
#scoretable tr:nth-child(2) td {
  background: rgb(153, 151, 151);
}
#scoretable tr:nth-child(3) td {
  background: #cd7f32;
}
</style>