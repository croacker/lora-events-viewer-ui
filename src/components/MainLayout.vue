<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in items">
          <v-list-group
                  v-if="item.children"
                  :key="item.text"
                  v-model="item.model"
                  :prepend-icon="item.model ? item.icon : item['icon-alt']"
                  append-icon=""
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
                    v-for="child in item.children"
                    :key="child.text"
                    :to="child.routeto"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-divider
                  v-else-if="item.divider"
                  :key="item.text"
                  dark
                  class="my-4"
          ></v-divider>
          <v-list-item v-else :key="item.text" :to="item.routeto">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Lora Events</span>
      </v-toolbar-title>
      <v-text-field
        flat
        hide-details
        label="Расшифровать Payload в HEX либо BASE64 формате"
        class="hidden-sm-and-down"
        v-model="basePayload"
        v-on:keyup.enter="encodePayload"
      ></v-text-field>
      <v-btn icon>
        <v-icon @click="encodePayload">mdi-key</v-icon>
      </v-btn>
      <div class="flex-grow-1"></div>
    </v-app-bar>
    <v-content full-height fluid>
      <v-container>
        <v-layout>
          <router-view />
        </v-layout>
      </v-container>
    </v-content>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey darken-2">Данные Payload</v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Payload" v-model="basePayload"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field label="Версия протокола" v-model="encodedPayload.protocolVersion"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field label="commandId" v-model="encodedPayload.commandId"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field label="Долгота" v-model="encodedPayload.longitude"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field label="Широта" v-model="encodedPayload.latitude"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field label="gpsFixStatus" v-model="encodedPayload.gpsFixStatus"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field label="reserve" v-model="encodedPayload.reserve"></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-text-field label="Калории" v-model="encodedPayload.calorie"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Дата/время" v-model="encodedPayload.dateTime"></v-text-field>
            </v-col>
            <v-col cols="10">
              <v-text-field label="Идентификатор маяка" v-model="encodedPayload.beaconId"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field label="Тип маяка" v-model="encodedPayload.beaconType"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field label="rssi" v-model="encodedPayload.rssi"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field label="txPower" v-model="encodedPayload.txPower"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field label="Пульс" v-model="encodedPayload.heartRate"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field label="Температура" v-model="encodedPayload.temperature"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Шаг" v-model="encodedPayload.step"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Дистанция" v-model="encodedPayload.distance"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn text color="primary" @click="dialog = false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import axios from "axios";
import config from "../config/config";

const FROM_BASE64 = `${config.APP_URL}/device-up-payload/from-base64/`;
const FROM_HEX = `${config.APP_URL}/device-up-payload/from-hex/`;

export default {
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      {icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: "Uplink",
        children:[
          {
            icon: "mdi-history", text: "Uplink data", routeto: "/"
          },
          {
            icon: "mdi-delete-variant", text: "LW-360HR payload", routeto: "/lw360hr"
          }
        ]
      },
      { divider: true },
      { icon: "mdi-ticket-confirmation", text: "ACK", routeto: "/ack" },
      { icon: "mdi-alert-circle", text: "Error", routeto: "/errors" },
      { icon: "mdi-set-center-right", text: "Join", routeto: "/join" },
      { icon: "mdi-map-marker", text: "Location", routeto: "/location" },
      { icon: "mdi-information-outline", text: "Status", routeto: "/status" }
    ],
    basePayload: "",
    encodedPayload: {
      protocolVersion: "",
      commandId: "",
      longitude: "",
      latitude: "",
      gpsFixStatus: "",
      reserve: "",
      calorie: "",
      batteryCapacity: "",
      dateTime: "",
      beaconId: "",
      beaconType: "",
      rssi: "",
      txPower: "",
      heartRate: "",
      temperature: "",
      step: "",
      distance: ""
    }
  }),
  methods: {
    encodePayload: function() {
      const str = encodeURIComponent(this.basePayload.trim());
      let url;

      if (this.isBase64(this.basePayload.trim())) {
        url = FROM_BASE64 + str;
      } else {
        url = FROM_HEX + str;
      }

      axios.get(url).then(response => {
        this.encodedPayload.protocolVersion = response.data.protocolVersion;
        this.encodedPayload.commandId = response.data.commandId;
        this.encodedPayload.longitude = response.data.longitude;
        this.encodedPayload.latitude = response.data.latitude;
        this.encodedPayload.gpsFixStatus = response.data.gpsFixStatus;
        this.encodedPayload.reserve = response.data.reserve;
        this.encodedPayload.calorie = response.data.calorie;
        this.encodedPayload.batteryCapacity = response.data.batteryCapacity;
        this.encodedPayload.dateTime = new Date(response.data.dateTime);
        this.encodedPayload.beaconId = response.data.beaconId;
        this.encodedPayload.beaconType = response.data.beaconType;
        this.encodedPayload.rssi = response.data.rssi;
        this.encodedPayload.txPower = response.data.txPower;
        this.encodedPayload.heartRate = response.data.heartRate;
        this.encodedPayload.temperature = response.data.temperature;
        this.encodedPayload.step = response.data.step;
        this.encodedPayload.distance = response.data.distance;

        this.showDialog();
      });
    },

    showDialog: function() {
      this.dialog = !this.dialog;
    },

    isBase64: function(str) {
      return str.length !== 100;
    }
  }
};
</script>