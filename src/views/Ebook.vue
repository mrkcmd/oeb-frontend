<template>
  <div id="ebook">
    <v-main>
      <v-container class="mt-12">
        <v-row>
          <v-col>
            <div class="text-center text-h4 primary--text mb-6">
              <strong>
                รายการ E-book
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
                :items="desserts"
                :search="search"
              ></v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "No", value: "count", align: "start" },
        { text: "รายการ", value: "name" },
        { text: "วันที่ซื้อ", value: "carbs" },
        { text: "ดาวน์โหลด", value: "protein" },
        { text: "จำนวนครั้งที่ดาวน์โหลด", value: "iron" }
      ],
      desserts: [
        {
          count: 1,
          name: "หนังสือ Yogurt"
        },
        {
          count: 2,
          name: "หนังสือ Ice cream sandwich"
        },
        {
          count: 3,
          name: "Eclair"
        },
        {
          count: 4,
          name: "Cupcake"
        },
        {
          count: 5,
          name: "Gingerbread"
        },
        {
          count: 6,
          name: "Jelly bean"
        },
        {
          count: 7,
          name: "Lollipop"
        },
        {
          count: 8,
          name: "Honeycomb"
        },
        {
          count: 9,
          name: "Donut"
        },
        {
          count: 10,
          name: "KitKat"
        }
      ]
    };
  }
};
</script>

<style></style>
