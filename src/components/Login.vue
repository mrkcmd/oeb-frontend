<template>
  <div id="login">
    <v-container class="mt-16">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
            <v-row justify="center">
              <v-col cols="12" md="10">
                <v-card-text class="mt-8">
                  <div class="text-h5 text-center primary--text" v-if="isAdmin">
                    E-book Online
                  </div>
                  <div class="text-h5 text-center fourth--text" v-else>
                    E-book Online
                  </div>
                  <v-form ref="form" class="mx-12 mt-10" v-if="isAdmin">
                    <v-text-field
                      class="mb-4 primary--text"
                      label=""
                      type="text"
                      autocomplete="off"
                      v-model="user.email"
                      :rules="usernameRules"
                      ><v-icon slot="prepend" color="primary"
                        >mdi-account</v-icon
                      >
                      <template v-slot:label>
                        <div class="primary--text">Username</div>
                      </template>
                    </v-text-field>
                    <v-text-field
                      class="primary--text"
                      type="password"
                      autocomplete="off"
                      v-model="user.password"
                      :rules="passwordRules"
                      ><v-icon slot="prepend" color="primary">mdi-lock</v-icon
                      ><template v-slot:label>
                        <div class="primary--text">Password</div>
                      </template></v-text-field
                    >
                  </v-form>
                  <v-form ref="form" class="mx-12 mt-10" v-else>
                    <v-text-field
                      class="mb-4 fourth--text"
                      label=""
                      type="text"
                      autocomplete="off"
                      v-model="user.email"
                      :rules="usernameRules"
                      ><v-icon slot="prepend" color="fourth"
                        >mdi-account</v-icon
                      >
                      <template v-slot:label>
                        <div class="fourth--text">Username</div>
                      </template>
                    </v-text-field>
                    <v-text-field
                      class="fourth--text"
                      type="password"
                      autocomplete="off"
                      v-model="user.password"
                      :rules="passwordRules"
                      ><v-icon slot="prepend" color="fourth">mdi-lock</v-icon
                      ><template v-slot:label>
                        <div class="fourth--text">Password</div>
                      </template></v-text-field
                    >
                  </v-form>
                </v-card-text>
                <div class="text-center mt-3 mb-6">
                  <v-btn
                    color="primary"
                    :disabled="loading"
                    v-if="isAdmin"
                    @click="submit()"
                  >
                    Login</v-btn
                  >
                  <v-btn
                    color="fourth"
                    :disabled="loading"
                    dark
                    v-else
                    @click="submit()"
                  >
                    Login</v-btn
                  >
                </div>

                <div class="text-center">
                  <v-progress-circular
                    v-show="loading"
                    indeterminate
                    color="fourth"
                  ></v-progress-circular>
                  <v-alert v-if="message" dense outlined type="error">
                    {{ message }}
                  </v-alert>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      usernameRules: [
        v => !!v || "Please enter your username.",
        v => /.+@.+\..+/.test(v) || "Please enter a valid username."
      ],
      passwordRules: [
        v => !!v || "Please enter your password.",
        v => (v && v.length == 10) || "Please enter a valid password."
      ],
      message: "",
      loading: false
    };
  },
  methods: {
    submit() {
      this.message = null;
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store.dispatch("auth/signin", this.user).then(
          () => {
            this.loading = false;
            if (this.isAdmin) {
              this.$router.push("/users").catch(() => {});
            } else {
              this.$router.push("/my-ebook").catch(() => {});
            }
          },
          error => {
            this.loading = false;
            this.message =
              (error.response && error.response.data.message) ||
              error.message ||
              error.toString();
          }
        );
      }
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
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/my-ebook").catch(() => {});
    }
  }
};
</script>

<style></style>
