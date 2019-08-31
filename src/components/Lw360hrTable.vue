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

    const GET_URL = `${config.APP_URL}/device-locations`;

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
                { text: "protocolVersion", value: "protocolVersion" },
                { text: "commandId", value: "commandId" },
                { text: "longitude", value: "longitude" },
                { text: "latitude", value: "latitude" },
                { text: "gpsFixStatus", value: "gpsFixStatus" },
                { text: "reserve", value: "reserve" },
                { text: "calorie", value: "calorie" },
                { text: "batteryCapacity", value: "batteryCapacity" },
                { text: "dateTime", value: "dateTime" },
                { text: "beaconId", value: "beaconId" },
                { text: "beaconType", value: "beaconType" },
                { text: "rssi", value: "rssi" },
                { text: "txPower", value: "txPower" },
                { text: "heartRate", value: "heartRate" },
                { text: "temperature", value: "temperature" },
                { text: "step", value: "step" },
                { text: "distance", value: "distance" }
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
                    const byteToHex = this.byteToHex;
                    response.data.map(function(item) {
                        item.devEuiHex = byteToHex(item.devEui.data);
                        return item;
                    });
                    this.eventItems = response.data;
                });
            },
            byteToHex(arr) {
                return Array.from(arr, function(byte) {
                    return ("0" + (byte & 0xff).toString(16)).slice(-2);
                }).join("");
            },
            byteToBase64(arr) {
                let binary = "";
                let bytes = new Uint8Array(arr);
                // let len = bytes.byteLength;
                for (let i = 0; i < 10; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                return btoa(binary) + "...";
            }
        }
    };
</script>

<style>
    .full-width-data-table {
        width: 100%;
    }
</style>