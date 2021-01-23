<template>
  <div id="userEbook">
    <v-main>
      <v-container class="mt-12">
        <v-row>
          <v-col>
            <div class="text-center text-h4 primary--text mb-6">
              <strong> List e-book of {{ user.email }}</strong>
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
        { text: "User", value: "email", align: "center" },
        { text: "Ebook", value: "name", align: "center" },

        {
          text: "Number of downloads",
          value: "downloaded",
          align: "center"
        }
      ],
      ebookList: [{}],
      user: {}
    };
  },
  methods: {
    retrieveEbooks() {
      EbookService.getEbook(this.account)
        .then(res => {
          var count = 1;
          this.ebookList = res.data.ebook;
          this.user = res.data.account[0];
          this.ebookList.map(ebook => {
            ebook.count = count;
            ebook.email = this.user.email;
            count++;
          });
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
