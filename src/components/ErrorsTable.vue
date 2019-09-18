<template>
<div class="full-width-data-table">
  <v-row>
      <v-col cols="12" sm="6" md="2">
        <v-menu
          ref="menuDateFrom"
          v-model="menuDateFrom"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="filter.dateFrom"
              label="Дата с"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="filter.dateFrom" @input="filterDateFromChange"></v-date-picker>
        </v-menu>
      </v-col>
      <div class="flex-grow-1"></div>
      <v-col cols="12" sm="6" md="2">
        <v-menu
          ref="menuDateFrom"
          v-model="menuDateTo"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="filter.dateTo"
              label="по"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="filter.dateTo" @input="filterDateToChange"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field
          v-model="filter.devEui"
          label="deviceEui"
          prepend-icon="mdi-filter"
          @input="filterChange"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field
          v-model="filter.deviceName"
          label="deviceName"
          prepend-icon="mdi-filter"
          @input="filterChange"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field
          v-model="filter.applicationName"
          label="applicationName"
          prepend-icon="mdi-filter"
          @input="filterChange"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2"></v-col>
      <div class="flex-grow-1"></div>
    </v-row>
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
</div>
</template>

<script>
import axios from "axios";
import config from "../config/config";
import ErrorFilter from "../service/filter/error-filter";
import ErrorMapper from "../service/mapper/error-mapper";

const GET_URL = `${config.APP_URL}/device-errors`;

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
      { text: "type", value: "type" },
      { text: "error", value: "error" },
      { text: "fCnt", value: "fCnt" }
    ],
    eventItems: [],
    menuDateFrom: false,
    menuDateTo: false,
    filter: new ErrorFilter()
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
    filterDateFromChange() {
      this.menuDateFrom = false;
      this.filterChange();
    },
    filterDateToChange() {
      this.menuDateTo = false;
      this.filterChange();
    },
    filterChange() {
      this.getTotalCount();
      this.getItems();
    },
    getTotalCount() {
      const url = `${GET_URL}/count?${this.filter.buildWhere()}`;
      axios.get(url).then(response => {
        this.serverItemsLength = response.data.count;
      });
    },
    getItems() {
      const limit = this.options.itemsPerPage;
      const offset = limit * (this.options.page - 1);
      const url = `${GET_URL}?filter[limit]=${limit}&filter[offset]=${offset}&filter[order]=receivedAt%20DESC&${this.filter.buildFilter()}`;
      axios.get(url).then(response => {
        const mapper = new ErrorMapper();
        this.eventItems = response.data.map(function(item) {
          return mapper.map(item);
        });
      });
    },
    byteToHex(arr) {
      return Array.from(arr, function(byte) {
        return ("0" + (byte & 0xff).toString(16)).slice(-2);
      }).join("");
    }
  }
};
</script>

<style>
.full-width-data-table {
  width: 100%;
}
</style>