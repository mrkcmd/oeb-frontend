<template>
  <div id="userEbook">
    <v-main>
      <v-container class="mt-12">
        <v-row>
          <v-col>
            <div class="text-center text-h4 primary--text mb-6">
              <strong> E-book </strong>
            </div>
            <v-card elevation="6">
              <v-data-table
                :headers="headers"
                :items="ebookList"
              ></v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import EbookService from "@/services/EbookService";
export default {
  data() {
    return {
      account: {
        id: this.$route.params.id
      },
      headers: [
        { text: "No", value: "count", align: "center" },
        { text: "User", value: "user", align: "center" },
        { text: "Ebook", value: "name", align: "center" },

        {
          text: "Number of downloads",
          value: "numberOfDownloads",
          align: "center"
        }
      ],
      ebookList: [{}]
    };
  },
  methods: {
    retrieveEbooks() {
      EbookService.getEbook(this.account)
        .then(res => {
          var count = 1;
          this.ebookList = res.data;
          this.ebookList.map(ebook => {
            ebook.count = count;
            count++;
          });
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.retrieveEbooks();
    console.log(this.account);
  }
};
</script>

<style></style>
