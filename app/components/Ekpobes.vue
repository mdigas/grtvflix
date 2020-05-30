<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
            <ActionItem icon="res://menu" 
                android:visibility="collapsed" 
                @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>
            <Label class="action-bar-title" text="Εκπομπές"></Label>
        </ActionBar>
        <ScrollView  orientation="vertical">
        <StackLayout v-if="ok" orientation="vertical">
        <GridLayout columns="50,250,*" rows="auto" >
             <Image row="0" col="0" colSpan="3" :src="'http://hbbtv.ert.gr'+documentaries[idx].bg_img_url" loadMode="async" horizontalAlignment="right" stretch="fill"  /> 
             <StackLayout row="0" col="0" colSpan="2" class="stdown">
                <HtmlView class="h4" :html="documentaries[idx].title" style="color: white;" />
                <HtmlView class="h4" :html="documentaries[idx].short_desc" row="0" col="0" colSpan="2" textWrap="True" style="color: white;" />
            </StackLayout>
        </GridLayout>
            <Label text="Ντοκιμαντέρ" class="h2" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(doc, index) in documentaries" rows="156" columns="277" @tap="onItemTap(index, 1)" >
                        <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+doc.menu_img_url" class="card" loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView>
            <Label text="Ψυχαγωγία" class="h2" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(doc, index) in entertmns" rows="156" columns="277" @tap="onItemTap(index, 2)" >
                        <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+doc.menu_img_url" class="card" loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView>
            <Label text="Συνεντεύξεις" class="h2" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(doc, index) in interviews" rows="156" columns="277" @tap="onItemTap(index, 3)" >
                        <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+doc.menu_img_url" class="card" loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView>                        
        </StackLayout>
        </ScrollView>

    </Page>
</template>

<script>
    import * as utils from "~/shared/utils";
    import SelectedPageService from "../shared/selected-page-service";
    import * as http from "http";

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Ekpobes");
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            },
            onItemTap: function(args,no) {
                var seira = "";
                switch(no) {
                    case 1: 
                        seira = this.documentaries[args];
                        break;
                    case 2:
                        seira = this.entertmns[args];
                        break;
                    case 3:
                        seira = this.interviews[args];
                        break;
                    };
                this.$goto('Seires', {
                    animated: true,
                    transition: {
                        name: "slideLeft",
                        duration: 250,
                        curve: "easeIn"},
                    transitioniOS: {},
                    transitionAndroid: {},
                    props: {
                        seira: seira
                    }
                });
            }, 
        },
        created: function() {

            var url2="http://hbbtv.ert.gr/pub/smarttv/ert/feed_NewLayout.php";

            http.request({
                url: url2,
                method: "GET",
                }).then(response => {
                this.documentaries = response.content.toJSON().services.filter(function (chain) {
                        return chain.masterCategory === "&Xi;&#941;&nu;&alpha; &Nu;&tau;&omicron;&kappa;&iota;&mu;&alpha;&nu;&tau;&#941;&rho;";})[0].items;
                this.entertmns = response.content.toJSON().services.filter(function (chain) {
                        return chain.masterCategory === "&Psi;&upsilon;&chi;&alpha;&gamma;&omega;&gamma;&#943;&alpha;";})[0].items;
                this.interviews = response.content.toJSON().services.filter(function (chain) {
                        return chain.masterCategory === "&Sigma;&upsilon;&nu;&epsilon;&nu;&tau;&epsilon;&#973;&xi;&epsilon;&iota;&sigmaf;";})[0].items;                
                this.idx = Math.floor(Math.random() * this.documentaries.length);
                this.ok = true;
                }, error => {
                console.error(error);
                });
              
        },        
        data() {
            return {
                documentaries: [ ],
                entertmns: [ ],
                interviews: [ ],
                idx: 0,
                ok: false,
            };
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
</style>
