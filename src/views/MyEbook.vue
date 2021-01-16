<template>
  <div id="ebook">
    <v-main>
      <v-container class="mt-12">
        <v-row>
          <v-col>
            <div class="text-center text-h4 primary--text mb-6">
              <strong>
                รายการ E-book ของฉัน
              </strong>
            </div>
            <v-card elevation="6">
              <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="desserts"
                :search="search"
              ></v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "No", value: "count", align: "start" },
        { text: "รายการ", value: "name", align: "start" },
        { text: "วันที่ซื้อ", value: "carbs", align: "start" },
        { text: "ดาวน์โหลด", value: "protein", align: "start" },
        { text: "จำนวนครั้งที่ดาวน์โหลด", value: "iron", align: "start" }
      ],
      desserts: [
        {
          count: 1,
          name: "Yogurt"
        },
        {
          count: 2,
          name: "Ice cream sandwich"
        },
        {
          count: 3,
          name: "Eclair"
        },
        {
          count: 4,
          name: "Cupcake"
        },
        {
          count: 5,
          name: "Gingerbread"
        }
      ],
      logoutTimer: ""
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }
      return false;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    if (this.currentUser && this.currentUser.roles && this.isAdmin === false) {
      this.setTimers();
    }
  },
  methods: {
    setTimers() {
      this.logoutTimer = setTimeout(() => {
        this.signout();
      }, 1000 * 60 * 60);
    },

    signout() {
      this.$store.dispatch("auth/autologout", this.currentUser).then(() => {
        this.$router.push("/login").catch(() => {});
      });
    },

    resetTimer() {
      clearTimeout(this.logoutTimer);

      this.setTimers();
    },

    downloadFile() {
      this.resetTimer();
    }
  },
  created() {
    window.addEventListener("unload", this.signout);
  }
};
</script>

<style></style>
