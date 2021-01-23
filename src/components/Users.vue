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
              :items="accountList"
              :search="search"
            >
              <template v-slot:[`item.view`]="{ item }">
                <v-icon small class="mr-2 info--text" @click="viewUser(item)"
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
import PermissionService from "@/services/PermissionService";

export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "No", value: "count", align: "center", width: "30%" },
        { text: "User", value: "email", align: "start", width: "40%" },
        { text: "View", value: "view", align: "center", width: "30%" }
      ],
      accountList: [
        {
          count: "",
          user: "",
          date: ""
        }
      ]
    };
  },
  methods: {
    retrieveAccounts() {
      PermissionService.getAccounts().then(res => {
        var count = 1;
        this.accountList = res.data;
        this.accountList.map(account => {
          account.count = count;
          count++;
        });
      });
    },
    viewUser(item) {
      this.$router.push("/users/" + item.id);
    }
  },
  mounted() {
    this.retrieveAccounts();
  }
};
</script>

<style></style>
