<template>
    <v-dialog v-model="rxInfoDialog" width="500">
        <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
                rxInfo
            </v-card-title>
            <v-textarea
                    class="mx-2"
                    rows="20"
                    prepend-icon="mdi-json"
                    :value="rxInfoCurrent"
            ></v-textarea>
            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary" text @click="rxInfoDialog = false">Закрыть</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'rx-info-dialog',
    props:[
        'rxInfoDialog',
        'rxInfoCurrent'
    ]
}
</script>