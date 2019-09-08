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
  ></v-data-table>
</template>

<script>
import axios from "axios";
import config from "../config/config";
import DataService from "../service/DataService";

const GET_URL = `${config.APP_URL}/device-statuses`;

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
        key: true
      },
      { text: "receivedAt", value: "receivedAtLocale" },
      { text: "devEui", value: "devEuiHex" },
      { text: "deviceName", value: "deviceName" },
      { text: "applicationId", value: "applicationId" },
      { text: "applicationName", value: "applicationName" },
      { text: "margin", value: "margin" },
      { text: "externalPowerSource", value: "externalPowerSource" },
      { text: "batteryLevelUnavailable", value: "batteryLevelUnavailable" },
      { text: "batteryLevel", value: "batteryLevel" }
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
          const receivedAt = new Date(item.receivedAt);
          item.receivedAtLocale = receivedAt.toLocaleDateString() + " " + receivedAt.toLocaleTimeString();
          item.devEuiHex = DataService.byteToHex(item.devEui.data);
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