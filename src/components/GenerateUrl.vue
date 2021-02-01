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
                <div class="text-center mt-3 mb-3">
                  <v-row justify="center">
                    <v-col cols="10" md="12">
                      <v-form ref="form">
                        <v-autocomplete
                          multiple
                          :items="ebookList"
                          v-model="ebooks"
                          outlined
                          label="E-book"
                          :rules="ebooksRules"
                        >
                        </v-autocomplete>
                      </v-form>
                    </v-col>
                  </v-row>
                  <v-btn class="py-6 px-5" color="primary" @click="generate()">
                    Generate USER
                  </v-btn>
                </div>
                <div class="text-center mb-6 mt-6">
                  <v-btn
                    class="py-6"
                    color="primary"
                    @click="$router.push('/registerAdmin')"
                  >
                    Generate ADMIN
                  </v-btn>
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
import PermissionService from "@/services/PermissionService";

export default {
  data() {
    return {
      ebookList: [],
      ebooks: null,
      ebooksRules: [v => !!(v && v.length) || "Required"]
    };
  },
  methods: {
    generate() {
      if (this.$refs.form.validate()) {
        GenerateService.generateUrl().then(() => {
          let storageToken = JSON.parse(localStorage.getItem("token")).token;
          let generateUrlRegister = this.$router.resolve({
            name: "Register",
            params: { token: storageToken, ebooks: JSON.stringify(this.ebooks) }
          });
          window.open(generateUrlRegister.href, "_blank");
        });
      }
    },
    retrieveEbooks() {
      PermissionService.getEbooks()
        .then(res => {
          this.ebookList = res.data.listData;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.retrieveEbooks();
  }
};
</script>

<style></style>
