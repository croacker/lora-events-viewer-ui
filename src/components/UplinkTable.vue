<template>
  <div>
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
    <v-col cols="12" sm="6" md="4">
      <v-text-field
              v-model="filter.deviceName"
              label="Фильтр deviceName"
              prepend-icon="mdi-filter"
              @input="filterChange"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="4">
      <v-text-field
              v-model="filter.applicationName"
              label="Фильтр applicationName"
              prepend-icon="mdi-filter"
              @input="filterChange"
      ></v-text-field>
    </v-col>
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
    <!-- <template v-slot:item.dataBase64="{ item }">
      <v-icon small class="mr-2" @click="showPayload(item)">edit</v-icon>
    </template>-->
  </v-data-table>
  </div>
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
     {
        text: "applicationName",
        value: "applicationName",
        width: "100px",
        fixed: true
      },
      { text: "frequency", value: "frequency" },
      { text: "dr", value: "dr" },
      { text: "fCnt", value: "fCnt" },
      { text: "data", value: "dataBase64", width: "400px", fixed: true },
      { text: "rxInfo", value: "rxInfoDescription" }
    ],
    eventItems: [],
    dateFrom: new Date().toISOString().substr(0, 10),
    menuDateFrom: false,
    dateTo: new Date().toISOString().substr(0, 10),
    menuDateTo: false,
    filterDeviceName: '',
    filterApplicationName:'',
    filter: new LoopbackFilter,
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
    filterDateFromChange(){
      this.menuDateFrom = false;
      this.filterChange()
    },
    filterDateToChange(){
      this.menuDateTo = false;
      this.filterChange()
    },
    filterChange(){
      this.getTotalCount();
      this.getItems();
    },
    on(){},
    getTotalCount() {
      const url = `${GET_URL}/count`;
      axios.get(url).then(response => {
        this.serverItemsLength = response.data.count;
      });
    },
    getItems() {
      const limit = this.options.itemsPerPage;
      const offset = limit * (this.options.page - 1);
      const url = `${GET_URL}?filter[limit]=${limit}&filter[offset]=${offset}&filter[order]=receivedAt%20DESC${this.filter.build()}`;
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

class LoopbackFilter{
  constructor(){
    this.deviceName = '';
    this.applicationName = '';
    this.dateFrom = new Date().toISOString().substr(0, 10);
    this.dateTo = new Date().toISOString().substr(0, 10);
  }

  build(){
    return `${this.getBetween()}${this.getDeviceName()}${this.getApplicationName()}`
  }

  getBetween(){
    const from = new Date(this.dateFrom).toISOString()
    const to = new Date(`${this.dateTo}T23:59:59.999Z`).toISOString()
    return `&filter[where][receivedAt][between][0]=${from}&filter[where][receivedAt][between][1]=${to}`
  }

  getDeviceName(){
    let filter = '';
    if(this.deviceName){
      filter = `&filter[where][deviceName][like]=%${this.deviceName}%`
    }
    return filter
  }

  getApplicationName(){
    let filter = '';
    if(this.applicationName){
      filter = `&filter[where][applicationName][like]=%${this.applicationName}%`
    }
    return filter
  }

}
</script>

<style>
.full-width-data-table {
  width: 100%;
}
</style>