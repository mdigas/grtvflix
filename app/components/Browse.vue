<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
            <ActionItem icon="res://menu" 
                android:visibility="collapsed" 
                @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>
            <Label class="action-bar-title" text="Μέρες πριν..."></Label>
        </ActionBar>
        <ScrollView>
            <StackLayout orientation="vertical">
                <DatePicker :date="someDate" v-model="someDate" class="date-picker" />
                <WrapLayout>
                    <Button :class="'titem' + (selper === 'Morning' ? '-selected': '')" text="ΠΡΩΙ" @tap="onperTap(0)" />
                    <Button :class="'titem' + (selper === 'Midday' ? '-selected': '')" text="ΜΕΣΗΜΕΡΙ" @tap="onperTap(1)" />
                    <Button :class="'titem' + (selper === 'Afternoon' ? '-selected': '')" text="ΑΠΟΓΕΥΜΑ" @tap="onperTap(2)" />
                    <Button :class="'titem' + (selper === 'Night' ? '-selected': '')" text="ΒΡΑΔΥ" @tap="onperTap(3)" />
                </WrapLayout>
                <ScrollView orientation="horizontal" class="keno" >
                    <StackLayout orientation="horizontal" >
                    <GridLayout  v-for="(ekp, index) in ekpompes" rows="156, auto" columns="277"  @tap="onTapPlay(index)" >
                        <Image row="0" col="0" :src="ekp.image" class="card"  loadMode="async" stretch="aspectFill"  />
                        <HtmlView row="1" col="0" class="title" :html="ekp.title" />
                    </GridLayout>
                    </StackLayout>
                </ScrollView>  
            </StackLayout>  
        </ScrollView>
    </Page>
</template>

<script>
    import * as http from "http";
    var utilsModule = require("tns-core-modules/utils/utils");
    import * as application from 'application'
    import * as utils from "~/shared/utils";
    import SelectedPageService from "../shared/selected-page-service";

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Browse");
            this.someDate = new Date();
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            },
            onTapPlay: function(args) {
            if (this.ekpompes[args].mp4 != "") {
                const i = new android.content.Intent(android.content.Intent.ACTION_VIEW);
                i.setDataAndType(android.net.Uri.parse(this.ekpompes[args].mp4), "video/mp4");
                application.android.foregroundActivity.startActivity(i);
            };
            },            
            onperTap: function(args) {
                var url="http://hbbtv.ert.gr/pub/smarttv/ert/feed_lost.php?country=GR&date=";
                if (args == 0){
                    this.selper = "Morning"; 
                    console.log(this.selper);                                             
                };       
                if (args == 1){
                    this.selper = "Midday"
                };
                if (args == 2){
                    this.selper = "Afternoon"
                };
                if (args == 3){
                    this.selper = "Night"
                }; 
                url = url+this.someDate.getFullYear()+'-'+(this.someDate.getMonth()+1)+"-"+this.someDate.getDate();
                console.log("*********************************************");
                console.log(url);
                http.request({
                    url: url,
                    method: "GET",
                    }).then(response => {
                    this.ekpompes = response.content.toJSON().elems[args].items;
                    console.log(this.ekpompes);
                    }, error => {
                    console.error(error);
                    });                                                           
                },
        },
        data() {
            return {
                someDate: "",
                selper: "",
                ekpompes: [],
            };
        },
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
    .date-picker {
        background-color: #000000;
        border-color: #181616;
        border-width: 2;
        border-radius: 10;
        color: #ffffff;
        vertical-align: middle;
    }
    .titem{
        color: #ffffff;
        background-color: #181616;
        font-size: 24;
        margin-top: 10px;
        margin-left: 10px;
    }    
    .titem-selected{
        color: #E99935;
        background-color: #181616;
        font-size: 24;
        margin-top: 10px;
        margin-left: 10px;
    }
</style>
