<template>
  <div id="ebook">
    <v-app>
      <v-main>
        <v-container class="mt-12">
          <v-row>
            <v-col>
              <div class="text-center text-h4 fourth--text mb-6">
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
        <v-card height="200px" elevation="0">
          <v-toolbar flat>
            <v-toolbar-title class="fourth--text headline"
              >Download history</v-toolbar-title
            >
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-data-table
              :headers="logHeaders"
              :items="logDownloadList"
              hide-default-footer
              hide-default-header
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
            >
            </v-data-table>
            <v-divider></v-divider>
          </v-card-text>
        </v-card>
      </v-snackbar>
      <v-bottom-navigation class="hidden-md-and-up" app color="fourth">
        <v-btn @click="dialog = true">
          <span class="fourth--text">History</span>

          <v-icon color="fourth">fa fa-history</v-icon>
        </v-btn>
      </v-bottom-navigation>
      <v-dialog v-model="dialog" max-width="480">
        <v-card height="300px" elevation="0">
          <v-toolbar flat>
            <v-toolbar-title class="fourth--text headline"
              >Download history</v-toolbar-title
            >
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-data-table
              :headers="logHeaders"
              :items="logDownloadList"
              hide-default-footer
              hide-default-header
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              mobile-breakpoint="0"
            >
            </v-data-table>
            <v-divider></v-divider>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="notifyDownload" max-width="480" persistent>
        <v-card>
          <v-card-title class="headline">
            <v-icon medium color="error darken-1" class="mr-2"
              >fa fa-exclamation-triangle</v-icon
            >
            ดาวน์โหลดสำเร็จ
          </v-card-title>

          <v-card-text class="text-h6 font-weight-black mt-2">
            คุณได้ทำการดาวน์โหลด
            <span class="error--text"> {{ this.ebook.name }} </span>
            เป็นครั้งที่
            <span class="error--text"> {{ this.ebook.downloaded }} </span>
            โดยอุปกรณ์
            <span class="error--text"> {{ this.ebook.ip }} </span>
            สงวนลิขสิทธิ์โดย TaksaOnline
            <span class="error--text">
              ห้ามมิให้ผู้ใดลอกเลียนแบบหรือทำซ้ำ
              หรือส่งต่อโดยมิได้รับอนุญาตทุกประการ ฝ่าฝืนมีโทษตามกฎหมาย
              หรือถ้านักกฎหมายไปไม่ถึงตัว คำสาปแช่งไปถึงก่อนแน่นอน!!</span
            >
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              class="error darken-1 text-body-1"
              text
              @click="notifyDownload = false"
            >
              รับทราบ
            </v-btn>
          </v-card-actions>
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
      ebookList: [],
      logoutTimer: "",
      account: {},
      isEbook: false,
      ebook: {
        id: "",
        name: "",
        accountId: "",
        ip: "",
        downloaded: ""
      },
      logDownloadList: [],
      isDownloading: false,
      clientIp: "",
      sortBy: "date",
      sortDesc: true,
      notifyDownload: false
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
    refreshList() {
      this.retrieveEbooks();
      this.retrieveLogDownload();
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
      this.ebook.downloaded = item.downloaded + 1;
      EbookService.getUrlDownload(this.ebook)
        .then(url => {
          setTimeout(() => {
            window.open("", "_blank").location.href = "" + url.data;
          }, 1000);

          setTimeout(() => {
            EbookService.deleteFile(this.ebook);
            this.resetTimer();
            this.isDownloading = false;
            this.refreshList();
            if (this.ebook.downloaded > 5) {
              this.notifyDownload = true;
            }
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
