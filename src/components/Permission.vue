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
                      v-model="user"
                      :items="users"
                      outlined
                      label="User"
                    >
                      <template #selection="{ item }">
                        <div
                          light
                          color="secondary lighten-4 black--text text-h1"
                        >
                          {{ item }}
                        </div></template
                      >
                    </v-autocomplete>

                    <v-autocomplete
                      v-model="values"
                      :items="items"
                      outlined
                      label="E-book"
                      multiple
                    >
                      <template #selection="{ item }">
                        <v-chip
                          light
                          color="secondary lighten-4 black--text text-subtitle-1"
                          >{{ item }}</v-chip
                        >
                      </template>
                    </v-autocomplete>
                  </v-form>
                </v-card-text>
                <div class="text-center mt-3 mb-6">
                  <v-btn color="primary" @click="generate()">
                    Add permission
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
export default {
  data() {
    return {
      users: ["Mark", "Frank", "Chin", "Tan", "Wan"],
      items: [
        "Yogurt",
        "Ice cream sandwich",
        "Eclair",
        "Cupcake",
        "Gingerbread"
      ],
      values: [],
      user: ""
    };
  }
};
</script>

<style></style>
