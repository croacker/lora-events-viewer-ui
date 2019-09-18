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
    >
      <template v-slot:item.rxInfo="{ item }">
        <v-icon small class="mr-2" @click="showRxInfo(item)">mdi-json</v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="rxInfoDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>rxInfo</v-card-title>
        <v-textarea class="mx-2" rows="20" prepend-icon="mdi-json" :value="rxInfoCurrent"></v-textarea>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" text @click="rxInfoDialog = false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config/config";
import UplinkFilter from "../service/filter/uplink-filter";
import UplinkMapper from "../service/mapper/uplink-mapper";

const GET_URL = `${config.APP_URL}/device-up-vs`;

export default {
  data: () => ({
    rxInfoDialog: false,
    rxInfoCurrent: [],
    options: {
      page: 1,
      itemsPerPage: 15
    },
    serverItemsLength: 15,
    headers: [
      {
        text: "id",
        align: "left",
        sortable: false,
        value: "id",
        width: "200px",
        fixed: true
      },
      { text: "receivedAt", value: "receivedAt" },
      { text: "devEui", value: "devEui" },
      { text: "deviceName", value: "deviceName" },
      {
        text: "applicationName",
        value: "applicationName",
        width: "100px",
        fixed: true
      },
      { text: "frequency", value: "frequency" },
      { text: "fCnt", value: "fCnt" },
      { text: "data", value: "data", width: "400px", fixed: true },
      { text: "rxInfo", value: "rxInfo" }
    ],
    eventItems: [],
    // dateFrom: new Date().toISOString().substr(0, 10),
    menuDateFrom: false,
    // dateTo: new Date().toISOString().substr(0, 10),
    menuDateTo: false,
    filter: new UplinkFilter()
  }),
  created: function() {
    this.getTotalCount();
  },
  methods: {
    pageChange(page) {
      this.options.page = page;
      this.getItems();
    },
    itemsPerPageChange(itemsPerPage) {
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
    on() {},
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
        const mapper = new UplinkMapper();
        this.eventItems = response.data.map(function(item) {
          return mapper.map(item);
        });
      });
    },

    showRxInfo(item) {
      this.$store.dispatch("showRxInfoDialog");
      this.rxInfoCurrent = JSON.stringify(item.rxInfo, null, 4);
      this.rxInfoDialog = true;
    }
  }
};
</script>

<style>
.full-width-data-table {
  width: 100%;
}
</style>