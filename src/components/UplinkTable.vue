<template>
  <v-data-table dense :headers="headers" :items="uplinks" item-key="devEui" class="elevation-1">
    <thead>
      <tr>
        <th class="text-left">id</th>
        <th class="text-left">receivedAt</th>
        <th class="text-left">devEui</th>
        <th class="text-left">deviceName</th>
        <th class="text-left">applicationId</th>
        <th class="text-left">applicationName</th>
        <th class="text-left">frequency</th>
        <th class="text-left">dr</th>
        <th class="text-left">adr</th>
        <th class="text-left">fCnt</th>
        <th class="text-left">fPort</th>
        <th class="text-left">tags</th>
        <th class="text-left">data</th>
        <th class="text-left">rxInfo</th>
        <th class="text-left">object</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in desserts" :key="item.devId">
        <td>{{ item.name }}</td>
        <td>{{ item.devId }}</td>
      </tr>
    </tbody>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        text: "id",
        align: "left",
        sortable: false,
        value: "id"
      },
      { text: "receivedAt", value: "receivedAt" },
      { text: "devEui", value: "devEui" },
      { text: "deviceName", value: "deviceName" },
      { text: "applicationId", value: "applicationId" },
      { text: "applicationName", value: "applicationName" },
      { text: "frequency", value: "frequency" },
      { text: "dr", value: "dr" },
      { text: "adr", value: "adr" },
      { text: "fCnt", value: "fCnt" },
      { text: "fPort", value: "fPort" },
      { text: "tags", value: "tags" },
      { text: "data", value: "data" },
      { text: "rxInfo", value: "rxInfo" },
      { text: "object", value: "object" }
    ],
    uplinks: [
      {
        applicationName: "GlobalSat",
        devEui: 159
      },
      {
        applicationName: "GlobalSat",
        devEui: 237
      },
      {
        applicationName: "GlobalSat",
        devEui: 262
      },
      {
        applicationName: "GlobalSat",
        devEui: 305
      },
      {
        applicationName: "GlobalSat",
        devEui: 356
      },
      {
        applicationName: "GlobalSat",
        devEui: 375
      },
      {
        applicationName: "GlobalSat",
        devEui: 392
      },
      {
        applicationName: "GlobalSat",
        devEui: 408
      },
      {
        applicationName: "GlobalSat",
        devEui: 452
      },
      {
        applicationName: "GlobalSat",
        devEui: 518
      }
    ]
  })
};
</script>