<template>
  <div id="ebook">
    <v-main>
      <v-container class="mt-12">
        <v-row>
          <v-col>
            <div class="text-center text-h4 primary--text mb-6">
              <strong>
                My E-book
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
                :items="ebookList"
                :search="search"
                ><template v-if="isEbook" v-slot:[`item.download`]="{ item }">
                  <v-btn small text color="info" @click="downloadFile(item)"
                    ><v-icon small class="mr-2">fa fa-download</v-icon
                    >Download</v-btn
                  >
                </template></v-data-table
              >
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
      search: "",
      headers: [
        { text: "No", value: "count", align: "center" },
        { text: "Name", value: "name", align: "center" },
        { text: "Purchased", value: "purchased", align: "center" },
        { text: "Download", value: "download", align: "center" },
        {
          text: "Number of downloads",
          value: "numberOfDownloads",
          align: "center"
        }
      ],
      ebookList: [{}],
      logoutTimer: "",
      account: {},
      isEbook: false,
      ebook: {
        name: ""
      }
    };
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
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login").catch(() => {});
    }
    if (this.currentUser && this.currentUser.roles && this.isAdmin === false) {
      this.account = this.currentUser;
      this.setTimers();
    }
    this.retrieveEbooks();
  },
  methods: {
    retrieveEbooks() {
      EbookService.getEbook(this.account)
        .then(res => {
          var count = 1;
          this.isEbook = true;
          this.ebookList = res.data;
          this.ebookList.map(ebook => {
            ebook.count = count;
            count++;
          });
        })
        .catch(error => {
          console.log(error);
          this.isEbook = false;
        });
    },
    setTimers() {
      this.logoutTimer = setTimeout(() => {
        this.signout();
      }, 1000 * 60 * 60);
    },

    signout() {
      this.$store.dispatch("auth/autologout", this.currentUser).then(() => {
        this.$router.push("/login").catch(() => {});
      });
    },

    resetTimer() {
      clearTimeout(this.logoutTimer);

      this.setTimers();
    },

    downloadFile(item) {
      this.ebook.name = item.name;
      EbookService.getUrlDownload(this.ebook).then(url => {
        console.log(url);
        window.open(url, "_blank");
      });
      this.resetTimer();
    }
  },
  created() {
    window.addEventListener("unload", this.signout);
  }
};
</script>

<style></style>
