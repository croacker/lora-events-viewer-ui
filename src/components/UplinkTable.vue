<template>
  <v-data-table
    dense
    :headers="headers"
    :items="eventItems"
    :options="options"
    :server-items-length="serverItemsLength"
    item-key="id"
    class="elevation-1 full-width-data-table"
    @update:page="pageChange"
    @update:items-per-page="itemsPerPageChange"
    fill-height
  >
    <!-- <template v-slot:item.dataBase64="{ item }">
      <v-icon small class="mr-2" @click="showPayload(item)">edit</v-icon>
    </template>-->
  </v-data-table>
</template>

<script>
import axios from "axios";
import config from "../config/config";
import DataService from "../service/DataService";

const GET_URL = `${config.APP_URL}/device-ups`;

export default {
  data: () => ({
    options: {
      page: 1,
      itemsPerPage: 10
    },
    serverItemsLength: 10,
    headers: [
      {
        text: "id",
        align: "left",
        sortable: false,
        value: "id",
        width: "100px",
        fixed: true
      },
      { text: "receivedAt", value: "receivedAt" },
      { text: "devEui", value: "devEuiHex" },
      { text: "deviceName", value: "deviceName" },
      //   { text: "applicationId", value: "applicationId" },
      {
        text: "applicationName",
        value: "applicationName",
        width: "100px",
        fixed: true
      },
      { text: "frequency", value: "frequency" },
      { text: "dr", value: "dr" },
      //   { text: "adr", value: "adr" },
      { text: "fCnt", value: "fCnt" },
      //   { text: "fPort", value: "fPort" },
      { text: "data", value: "dataBase64", width: "400px", fixed: true },
      { text: "rxInfo", value: "rxInfoDescription" }
    ],
    eventItems: []
  }),
  created: function() {
    this.getTotalCount();
  },
  methods: {
    pageChange: function(page) {
      this.options.page = page;
      this.getItems();
    },
    itemsPerPageChange: function(itemsPerPage) {
      this.options.itemsPerPage = itemsPerPage;
      this.getItems();
    },
    getTotalCount() {
      const url = `${GET_URL}/count`;
      axios.get(url).then(response => {
        this.serverItemsLength = response.data.count;
      });
    },
    getItems() {
      const limit = this.options.itemsPerPage;
      const offset = limit * (this.options.page - 1);
      const url = `${GET_URL}?filter[limit]=${limit}&filter[offset]=${offset}&filter[order]=receivedAt%20DESC`;
      axios.get(url).then(response => {
        response.data.map(function(item) {
          item.devEuiHex = DataService.byteToHex(item.devEui.data);
          item.dataBase64 = DataService.byteToBase64(item.data.data);
          item.rxInfoDescription = "JSON";
          return item;
        });
        this.eventItems = response.data;
      });
    }
  }
};
</script>

<style>
.full-width-data-table {
  width: 100%;
}
</style>