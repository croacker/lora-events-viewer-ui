<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i">
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text">
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
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center"></v-row>
      </v-container>
    </v-content>
    <v-btn bottom color="blue" dark fab fixed right @click="showDialog">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey darken-2">Данные Payload</v-card-title>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Payload" v-model="basePayload"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                label="Версия протокола"
                placeholder="Версия протокола"
                v-model="encodedPayload.protocolVersion"
              ></v-text-field>
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

// const FROM_BASE64 = "http://127.0.0.1:8085/device-up-payload/from-base64/";
// const FROM_HEX = "http://127.0.0.1:8085/device-up-payload/from-hex/";

const FROM_BASE64 = "/device-up-payload/from-base64/";
const FROM_HEX = "/device-up-payload/from-hex/";

export default {
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      { icon: "mdi-history", text: "Uplink" },
      { icon: "mdi-ticket-confirmation", text: "ACK" },
      { icon: "mdi-alert-circle", text: "Error" },
      { icon: "mdi-set-center-right", text: "Join" },
      { icon: "mdi-map-marker", text: "Location" },
      { icon: "mdi-information-outline", text: "Status" }
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

        console.log(response.data);
        this.showDialog();
      });
    },

    showDialog: function() {
      this.dialog = !this.dialog;
    },

    isBase64: function(str) {
      return (
        /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.exec(
          str
        ) !== null
      );
    }
  }
};
</script>