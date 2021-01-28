<template>
  <v-app>
    <v-card flat tile>
      <v-toolbar dark color="primary" v-if="isAdmin">
        <v-toolbar-title
          class="ml-6"
          style="cursor:pointer"
          @click="$router.push('/').catch(() => {})"
          ><strong>E-book Online</strong></v-toolbar-title
        >
        <v-spacer></v-spacer>
        <div class="hidden-sm-and-down">
          <v-row v-if="currentUser" class="mr-6">
            <div>
              <v-menu open-on-hover bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <div
                    class="text-subtitle2 mr-4  d-flex align-center"
                    align="center"
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    v-if="isAdmin"
                  >
                    Admin : {{ currentUser.email }}
                    <v-icon small class="ml-2">fa fa-caret-down</v-icon>
                  </div>
                  <div
                    class="text-subtitle2 mr-4  d-flex align-center"
                    align="center"
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    v-else
                  >
                    My Account : {{ currentUser.email }}
                    <v-icon small class="ml-2">fa fa-caret-down</v-icon>
                  </div>
                </template>

                <v-list>
                  <v-list-item v-if="isAdmin">
                    <v-btn
                      width="100%"
                      class="d-flex justify-start"
                      text
                      @click="$router.push('/users').catch(() => {})"
                      ><v-icon small class="mr-2">fa fa-users</v-icon>users
                    </v-btn>
                  </v-list-item>
                  <v-divider v-if="isAdmin" class="mx-2"></v-divider>

                  <v-list-item v-if="isAdmin">
                    <v-btn
                      width="100%"
                      class="d-flex justify-start"
                      text
                      @click="$router.push('/generate').catch(() => {})"
                      ><v-icon small class="mr-2">fa fa-user-plus</v-icon>add
                      new user</v-btn
                    >
                  </v-list-item>
                  <v-divider v-if="isAdmin" class="mx-2"></v-divider>
                  <v-list-item v-if="isAdmin">
                    <v-btn
                      width="100%"
                      class="d-flex justify-start"
                      text
                      @click="$router.push('/permission').catch(() => {})"
                      ><v-icon small class="mr-3">fas fa-book</v-icon>
                      Permission e-book
                    </v-btn>
                  </v-list-item>
                  <v-list-item v-if="!isAdmin">
                    <v-list-item-title
                      @click="$router.push('/my-ebook').catch(() => {})"
                      ><v-btn text width="100%" class="d-flex justify-start"
                        ><v-icon small class="mr-2">fas fa-book</v-icon> MY
                        E-book</v-btn
                      ></v-list-item-title
                    >
                  </v-list-item>
                  <v-divider class="mx-2"></v-divider>
                  <v-list-item>
                    <v-list-item-title @click="signout()"
                      ><v-btn text width="100%" class="d-flex justify-start"
                        ><v-icon small class="mr-2">fas fa-sign-out-alt</v-icon>
                        Sign out</v-btn
                      ></v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-row>

          <v-row v-else class="mr-6">
            <v-btn text @click="$router.push('/login').catch(() => {})"
              >Login</v-btn
            >
          </v-row>
        </div>
        <div class="hidden-md-and-up">
          <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        </div>
      </v-toolbar>
      <v-toolbar dark color="fourth" v-else>
        <v-toolbar-title
          class="ml-6 fourth"
          style="cursor:pointer"
          @click="$router.push('/').catch(() => {})"
          ><strong>E-book Online</strong></v-toolbar-title
        >
        <v-spacer></v-spacer>
        <div class="hidden-sm-and-down">
          <v-row v-if="currentUser" class="mr-6">
            <div>
              <v-menu open-on-hover bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <div
                    class="text-subtitle2 mr-4  d-flex align-center"
                    align="center"
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    v-if="isAdmin"
                  >
                    Admin : {{ currentUser.email }}
                    <v-icon small class="ml-2">fa fa-caret-down</v-icon>
                  </div>
                  <div
                    class="text-subtitle2 mr-4  d-flex align-center"
                    align="center"
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    v-else
                  >
                    My Account : {{ currentUser.email }}
                    <v-icon small class="ml-2">fa fa-caret-down</v-icon>
                  </div>
                </template>

                <v-list>
                  <v-list-item v-if="isAdmin">
                    <v-btn
                      width="100%"
                      class="d-flex justify-start"
                      text
                      @click="$router.push('/users').catch(() => {})"
                      ><v-icon small class="mr-2">fa fa-users</v-icon>users
                    </v-btn>
                  </v-list-item>
                  <v-divider v-if="isAdmin" class="mx-2"></v-divider>

                  <v-list-item v-if="isAdmin">
                    <v-btn
                      width="100%"
                      class="d-flex justify-start"
                      text
                      @click="$router.push('/generate').catch(() => {})"
                      ><v-icon small class="mr-2">fa fa-user-plus</v-icon>add
                      new user</v-btn
                    >
                  </v-list-item>
                  <v-divider v-if="isAdmin" class="mx-2"></v-divider>
                  <v-list-item v-if="isAdmin">
                    <v-btn
                      width="100%"
                      class="d-flex justify-start"
                      text
                      @click="$router.push('/permission').catch(() => {})"
                      ><v-icon small class="mr-3">fas fa-book</v-icon>
                      Permission e-book
                    </v-btn>
                  </v-list-item>
                  <v-list-item v-if="!isAdmin">
                    <v-list-item-title
                      @click="$router.push('/my-ebook').catch(() => {})"
                      ><v-btn text width="100%" class="d-flex justify-start"
                        ><v-icon small class="mr-2">fas fa-book</v-icon> MY
                        E-book</v-btn
                      ></v-list-item-title
                    >
                  </v-list-item>
                  <v-divider class="mx-2"></v-divider>
                  <v-list-item>
                    <v-list-item-title @click="signout()"
                      ><v-btn text width="100%" class="d-flex justify-start"
                        ><v-icon small class="mr-2">fas fa-sign-out-alt</v-icon>
                        Sign out</v-btn
                      ></v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-row>

          <v-row v-else class="mr-6">
            <v-btn text @click="$router.push('/login').catch(() => {})"
              >Login</v-btn
            >
          </v-row>
        </div>
        <div class="hidden-md-and-up">
          <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        </div>
      </v-toolbar>
    </v-card>
    <v-navigation-drawer
      v-model="drawer"
      bottom
      temporary
      app
      dark
      class="hidden-md-and-up primary"
    >
      <div v-if="currentUser">
        <v-list nav>
          <div
            class="text-h6 d-flex justify-start mt-3 ml-4"
            dark
            v-if="isAdmin"
          >
            Admin : {{ currentUser.email }}
          </div>

          <div class="text-h6 d-flex justify-start mt-3 ml-4" dark v-else>
            My Account : {{ currentUser.email }}
          </div>
          <v-divider class="mt-3"></v-divider>
          <v-list-item v-if="isAdmin" class="white">
            <v-btn
              width="100%"
              class="d-flex justify-start primary--text"
              text
              @click="$router.push('/users').catch(() => {})"
              ><v-icon small class="mr-2">fa fa-users</v-icon>Users
            </v-btn>
          </v-list-item>
          <v-divider v-if="isAdmin" class="mx-2"></v-divider>

          <v-list-item v-if="isAdmin" class="white">
            <v-btn
              width="100%"
              class="d-flex justify-start primary--text"
              text
              @click="$router.push('/generate').catch(() => {})"
              ><v-icon small class="mr-2">fa fa-user-plus</v-icon>add new
              user</v-btn
            >
          </v-list-item>
          <v-divider v-if="isAdmin" class="mx-2"></v-divider>
          <v-list-item v-if="isAdmin" class="white">
            <v-btn
              width="100%"
              class="d-flex justify-start primary--text"
              text
              @click="$router.push('/permission').catch(() => {})"
              ><v-icon small class="mr-3 ">fas fa-book</v-icon>
              Permission e-book
            </v-btn>
          </v-list-item>
          <v-list-item v-if="!isAdmin" class="white">
            <v-list-item-title
              @click="$router.push('/my-ebook').catch(() => {})"
              ><v-btn
                text
                width="100%"
                class="d-flex justify-start primary--text"
                ><v-icon small class="mr-2">fas fa-book</v-icon> MY
                E-book</v-btn
              ></v-list-item-title
            >
          </v-list-item>
          <v-divider class="mx-2"></v-divider>
          <v-list-item class="white">
            <v-list-item-title @click="signout()"
              ><v-btn
                text
                width="100%"
                class="d-flex justify-start primary--text"
                ><v-icon small class="mr-2">fas fa-sign-out-alt</v-icon> Sign
                out</v-btn
              ></v-list-item-title
            >
          </v-list-item>
          <v-divider></v-divider>
        </v-list>
      </div>
      <div v-else>
        <v-list nav>
          <v-list-item class="white">
            <v-btn
              text
              width="100%"
              class="primary--text"
              @click="$router.push('/login').catch(() => {})"
              >Login</v-btn
            >
          </v-list-item>
          <v-divider></v-divider>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      drawer: false
    };
  },
  methods: {
    signout() {
      this.$store.dispatch("auth/signout", this.currentUser).then(() => {
        this.$router.push("/login").catch(() => {});
      });
    }
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
  }
};
</script>
<style scoped>
.v-navigation-drawer {
  will-change: initial;
}
</style>
