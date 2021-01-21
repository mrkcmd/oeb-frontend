<template>
  <div id="userdownload">
    <v-container class="mt-12">
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" md="8">
          <div class="text-center text-h4 primary--text mb-6">
            <strong>
              Users
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
              :items="myEbookList"
              :search="search"
            >
              <template v-slot:[`item.status`]="{ item }">
                <div v-if="item.status" class="text-body-2 success--text">
                  Online
                </div>
                <div v-else class="text-body-2 error--text">Offline</div>
              </template>
              <template v-slot:[`item.view`]="{ item }">
                <v-icon small class="mr-2 info--text" @click="item"
                  >fa fa-search</v-icon
                >
              </template></v-data-table
            >
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "No", value: "count", align: "center", width: "20%" },
        { text: "User", value: "user", align: "start", width: "30%" },
        { text: "Status", value: "status", align: "center", width: "30%" },
        { text: "View", value: "view", align: "center", width: "20%" }
      ],
      myEbookList: [
        {
          count: 1,
          user: "user@u.com",
          date: "21/12/2021",
          status: true
        },
        {
          count: 2,
          user: "mark@gmail.com",
          date: "24/12/2021",
          status: false
        }
      ]
    };
  },
  methods: {
    signout() {
      this.$store.dispatch("auth/autologout", this.currentUser).then(() => {
        this.$router.push("/login").catch(() => {});
      });
    }
  },
  created() {
    window.addEventListener("unload", this.signout);
  }
};
</script>

<style></style>
