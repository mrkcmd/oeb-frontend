<template>
  <div id="generate">
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
                <div class="text-center mt-3 mb-6">
                  <v-btn color="primary" @click="generate()">
                    Generate url</v-btn
                  >
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
    return {};
  },
  methods: {
    generate() {
      GenerateService.generateUrl().then(() => {
        let storageToken = JSON.parse(localStorage.getItem("token")).token;
        let generateUrlRegister = this.$router.resolve({
          name: "Register",
          params: { token: storageToken }
        });
        window.open(generateUrlRegister.href, "_blank");
      });
    }
  }
};
</script>

<style></style>
