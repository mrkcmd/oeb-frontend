<template>
  <div id="ebook">
    <v-app>
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
                    <v-btn
                      small
                      text
                      color="info"
                      :disabled="isDownloading"
                      @click="downloadFile(item)"
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
      <v-snackbar
        class="hidden-sm-and-down"
        :timeout="-1"
        :value="true"
        bottom
        right
        light
      >
        <v-card height="300px" elevation="0">
          <v-toolbar flat>
            <v-toolbar-title class="primary--text headline"
              >Log Download</v-toolbar-title
            >
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-data-table
              :headers="logHeaders"
              :items="logDownloadList"
              hide-default-footer
              hide-default-header
              class="primary--text"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
            >
            </v-data-table>
            <v-divider></v-divider>
          </v-card-text>
        </v-card>
      </v-snackbar>
      <v-bottom-navigation class="hidden-md-and-up" app color="primary">
        <v-btn>
          <span class="primary--text">Notify</span>

          <v-icon color="primary">fas fa-bell</v-icon>
        </v-btn>
        <v-btn @click="dialog = true">
          <span class="primary--text">Logs</span>

          <v-icon color="primary">fa fa-history</v-icon>
        </v-btn>
      </v-bottom-navigation>
      <v-dialog v-model="dialog" max-width="480">
        <v-card height="300px" elevation="0">
          <v-toolbar flat>
            <v-toolbar-title class="primary--text headline"
              >Log Download</v-toolbar-title
            >
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-data-table
              :headers="logHeaders"
              :items="logDownloadList"
              hide-default-footer
              hide-default-header
              class="primary--text"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              mobile-breakpoint="0"
            >
            </v-data-table>
            <v-divider></v-divider>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>
import EbookService from "@/services/EbookService";

export default {
  data() {
    return {
      search: "",
      dialog: false,
      headers: [
        { text: "No", value: "count", align: "center" },
        { text: "Name", value: "name", align: "center" },
        { text: "Purchased", value: "purchased", align: "center" },
        { text: "Download", value: "download", align: "center" },
        {
          text: "Number of downloads",
          value: "downloaded",
          align: "center"
        }
      ],
      logHeaders: [
        { text: "List", value: "ebook", align: "center" },
        { text: "Date", value: "date", align: "center" },
        { text: "IP", value: "ip", align: "center" }
      ],
      ebookList: [{}],
      logoutTimer: "",
      account: {},
      isEbook: false,
      ebook: {
        id: "",
        name: "",
        accountId: "",
        ip: ""
      },
      logDownloadList: [{}],
      isDownloading: false,
      clientIp: "",
      sortBy: "date",
      sortDesc: false
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
    fetch("https://api.ipify.org?format=json")
      .then(response => response.json())
      .then(response => {
        this.clientIp = response.ip;
      });
    this.retrieveEbooks();
    this.retrieveLogDownload();
  },
  methods: {
    retrieveEbooks() {
      EbookService.getEbook(this.account)
        .then(res => {
          var count = 1;
          this.isEbook = true;
          this.ebookList = res.data.ebook;
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
    retrieveLogDownload() {
      EbookService.getLogDownload(this.account)
        .then(res => {
          this.logDownloadList = res.data;
        })
        .catch(error => {
          console.log(error);
          this.isEbook = false;
        });
    },
    setTimers() {
      this.logoutTimer = setTimeout(() => {
        this.autologout();
      }, 1000 * 60 * 60);
    },

    autologout() {
      this.$store.dispatch("auth/autologout", this.currentUser).then(() => {
        this.$router.push("/login").catch(() => {});
      });
    },
    signout() {
      this.$store.dispatch("auth/signout", this.currentUser).then(() => {
        this.$router.push("/login").catch(() => {});
      });
    },
    resetTimer() {
      clearTimeout(this.logoutTimer);

      this.setTimers();
    },

    downloadFile(item) {
      this.isDownloading = true;
      this.ebook.id = item.id;
      this.ebook.name = item.name;
      this.ebook.accountId = this.account.id;
      this.ebook.ip = this.clientIp;
      //   console.log(this.ebook);
      EbookService.getUrlDownload(this.ebook)
        .then(url => {
          window.open("", "_blank").location.href = "" + url.data;
          setTimeout(() => {
            EbookService.deleteFile(this.ebook);
            this.resetTimer();
            this.isDownloading = false;
          }, 1500);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    if (this.currentUser && this.currentUser.roles && this.isAdmin === false) {
      this.account = this.currentUser;
      this.setTimers();
    }
  }
};
</script>

<style scoped>
html {
  overflow: hidden !important;
}

.v-card {
  display: flex !important;
  flex-direction: column;
}

.v-card__text {
  flex-grow: 1;
  overflow: auto;
}
</style>
