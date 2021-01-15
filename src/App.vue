<template>
  <v-app>
    <v-card flat tile>
      <v-toolbar dark color="primary">
        <v-toolbar-title
          class="ml-6"
          style="cursor:pointer"
          @click="$router.push('/')"
          ><strong>E-book Online</strong></v-toolbar-title
        >

        <div class="hidden-sm-and-down">
          <!-- <v-btn elevation="0" color="secondary" class="">
            <v-icon>fas fa-user</v-icon>
          </v-btn> -->
        </div>
        <v-spacer></v-spacer>
        <div class="hidden-sm-and-down">
          <v-row v-if="loggedIn" class="mr-6">
            <div>
              <v-menu open-on-hover bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <div
                    class="text-subtitle2 mr-4  d-flex align-center mt-3"
                    align="center"
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    บัญชีของ {{ currentUser.email }}
                    <v-icon small class="ml-2">fa fa-caret-down</v-icon>
                  </div>
                </template>

                <v-list>
                  <v-list-item v-if="isAdmin">
                    <v-btn width="100%" text @click="$router.push('/generate')"
                      ><v-icon small class="mr-2">fa fa-user-plus</v-icon> new
                      user</v-btn
                    >
                  </v-list-item>
                  <v-divider v-if="isAdmin" class="mx-2"></v-divider>
                  <v-list-item>
                    <v-list-item-title @click="signout()"
                      ><v-btn text width="100%"
                        ><v-icon small class="mr-2">fas fa-sign-out-alt</v-icon>
                        Sign out</v-btn
                      ></v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <v-divider vertical class="mr-4"></v-divider>
            <v-btn icon elevation="0" color="secondary lighten-4">
              <v-badge color="error" content="1">
                <v-icon>fas fa-bell</v-icon>
              </v-badge>
            </v-btn>
          </v-row>

          <v-row v-else class="mr-6">
            <v-btn text @click="$router.push('/login')">เข้าสู่ระบบ</v-btn>
          </v-row>
        </div>
        <div class="hidden-md-and-up">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </div>
      </v-toolbar>
    </v-card>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {};
  },
  methods: {
    signout() {
      this.$store.dispatch("auth/signout").then(() => {
        this.$router.push("/login");
      });
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    isAdmin() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }
      return false;
    }
  }
};
</script>
