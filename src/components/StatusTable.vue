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

    const GET_URL = "http://127.0.0.1:8085/device-statuses";
    // const GET_URL = "/device-statuses";

    export default {
        data: () => ({
            options: {
                page: 1,
                itemsPerPage: 15
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
                { text: "receivedAt", value: "receivedAt" },
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
                    console.log(response.data);
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
                    console.log(response.data);
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