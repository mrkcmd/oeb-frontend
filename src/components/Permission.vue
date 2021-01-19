<template>
  <div id="permission">
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
                  <v-form ref="form" class="mx-12 mt-10">
                    <v-autocomplete
                      :items="accountList"
                      item-text="email"
                      item-value="id"
                      v-model="ebooks.account"
                      return-object
                      outlined
                      label="User"
                      :rules="ebooksRules"
                    >
                      <template #selection="{ item }">
                        <div
                          light
                          color="secondary lighten-4 black--text text-h1"
                        >
                          {{ item.email }}
                        </div></template
                      >
                    </v-autocomplete>

                    <v-autocomplete
                      :items="ebookList"
                      v-model="ebooks.name"
                      outlined
                      label="E-book"
                      :rules="ebooksRules"
                    >
                    </v-autocomplete>
                  </v-form>
                </v-card-text>
                <div class="text-center mt-3 mb-6">
                  <v-btn color="primary" @click.stop="confirmDialog()">
                    Add permission
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-dialog v-model="dialog" max-width="480">
          <v-card>
            <v-card-title class="headline">
              Confirm
            </v-card-title>

            <v-card-text class="text-body-1 font-weight-medium">
              Do you want to add
              <span class="info--text">{{ ebooks.name }}</span>
              for
              <span class="info--text"> {{ ebooks.account.email }}</span>
              ?
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="grey darken-1" text @click="dialog = false">
                Cancel
              </v-btn>

              <v-btn color="green darken-1" text @click="addPermission()">
                Confirm
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PermissionService from "@/services/PermissionService";
export default {
  data() {
    return {
      dialog: "",
      ebooks: {
        account: "",
        name: ""
      },

      accountList: [],
      ebookList: [],
      ebooksRules: [v => !!v || "Required"]
    };
  },
  methods: {
    retrieveAccounts() {
      PermissionService.getAccounts()
        .then(res => {
          this.accountList = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    retrieveEbooks() {
      PermissionService.getEbooks()
        .then(res => {
          this.ebookList = res.data.listData;
        })
        .catch(error => {
          console.log(error);
        });
    },
    addPermission() {
      PermissionService.addEbook(this.ebooks).then(() => {
        this.dialog = false;
      });
    },
    confirmDialog() {
      if (this.$refs.form.validate()) {
        this.dialog = true;
      }
    }
  },

  mounted() {
    this.retrieveAccounts();
    this.retrieveEbooks();
  }
};
</script>

<style></style>
