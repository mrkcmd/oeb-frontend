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
                :items="ebookList"
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
import EbookService from "@/services/EbookService";
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "No", value: "count", align: "center" },
        { text: "Name", value: "name", align: "start" },
        { text: "Purchased", value: "carbs", align: "start" },
        { text: "Download", value: "protein", align: "start" },
        { text: "Number of downloads", value: "iron", align: "start" }
      ],
      ebookList: [{}],
      logoutTimer: "",
      account: {}
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
      this.$router.push("/login").catch(() => {});
    }
    if (this.currentUser && this.currentUser.roles && this.isAdmin === false) {
      this.account = this.currentUser;
      console.log(this.account);
      this.setTimers();
    }
    this.retrieveEbooks();
  },
  methods: {
    retrieveEbooks() {
      EbookService.getEbook(this.account).then(res => {
        var count = 1;
        this.ebookList = res.data;
        this.ebookList.map(ebook => {
          ebook.count = count;
          count++;
        });
      });
    },
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
