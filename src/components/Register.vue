<template>
  <div id="register">
    <v-container class="mt-16">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
            <v-row justify="center">
              <v-col cols="12" md="10">
                <v-card-text class="mt-8">
                  <div class="text-h5 text-center primary--text">
                    E-book Online
                  </div>
                </v-card-text>
                <v-form ref="form" class="mx-12 mt-10">
                  <v-text-field
                    label="First Name"
                    autocomplete="off"
                    outlined
                    :rules="firstnameRules"
                    v-model="register.firstname"
                    class="mb-2"
                  ></v-text-field>
                  <v-text-field
                    label="Last Name"
                    autocomplete="off"
                    outlined
                    :rules="lastnameRules"
                    v-model="register.lastname"
                    class="mb-2"
                  ></v-text-field>

                  <v-text-field
                    label="E-mail"
                    autocomplete="off"
                    outlined
                    hint="*Your e-mail will be used as username."
                    persistent-hint
                    :rules="emailRules"
                    v-model="register.email"
                    class="mb-2"
                  >
                  </v-text-field>

                  <v-text-field
                    label="Phone"
                    autocomplete="off"
                    outlined
                    hint="*Your phone will be used as password."
                    persistent-hint
                    :rules="phoneRules"
                    v-model="register.password"
                    class="mb-2"
                  >
                  </v-text-field>
                </v-form>
                <div class="text-center mt-10 mb-6">
                  <v-btn color="primary" :disabled="loading" @click="submit()"
                    >Register</v-btn
                  >
                </div>
                <div class="text-center">
                  <v-progress-circular
                    v-show="loading"
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                  <v-alert v-if="failed" dense outlined type="error">
                    {{ message }}
                  </v-alert>
                  <v-dialog v-model="dialog" persistent max-width="290">
                    <v-card>
                      <v-card-title class="text-subtitle-1">
                        E-book Online
                      </v-card-title>
                      <v-card-text class="text-subtitle-2">
                        {{ message }}
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="sendLogin()">
                          Close
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
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
import GenerateService from "@/services/GenerateService.js";

export default {
  data() {
    return {
      register: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        token: ""
      },
      firstnameRules: [v => !!v || "Please enter your firstname."],
      lastnameRules: [v => !!v || "Please enter your lastname."],
      emailRules: [
        v => !!v || "Please enter your email address.",
        v => /.+@.+\..+/.test(v) || "Please enter a valid email address."
      ],
      phoneRules: [
        v => !!v || "Please enter your phone number.",
        v => (v && v.length == 10) || "Please enter a valid phone number.",
        v => Number.isInteger(Number(v)) || "Please enter a valid phone number."
      ],
      message: "",
      loading: false,
      failed: false,
      dialog: false
    };
  },
  methods: {
    submit() {
      this.message = null;
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store.dispatch("auth/signup", this.register).then(
          data => {
            this.dialog = true;
            this.message = data.message;
            this.loading = false;
            this.failed = false;
            GenerateService.deleteToken(this.register);
          },
          error => {
            this.message =
              (error.response && error.response.data.message) ||
              error.message ||
              error.toString();
            this.loading = false;
            this.failed = true;
          }
        );
      }
    },
    sendLogin() {
      this.dialog = false;
      this.$router.push("/login");
    }
  },
  mounted() {
    this.register.token = this.$route.params.token;
  }
};
</script>

<style></style>
