<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
            <ActionItem icon="res://menu" 
                android:visibility="collapsed" 
                @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>
            <Label class="action-bar-title" text="Παιδικά"></Label>
        </ActionBar>
        <ScrollView  orientation="vertical">
        <StackLayout v-if="ok" orientation="vertical">
        <GridLayout columns="50,250,*" rows="auto" >
             <Image row="0" col="0" colSpan="3" :src="'http://hbbtv.ert.gr'+paidika[idx].bg_img_url" loadMode="async" horizontalAlignment="right" stretch="fill"  /> 
             <StackLayout row="0" col="0" colSpan="2" class="stdown">
                <HtmlView class="h4" :html="paidika[idx].title" style="color: white;" />
                <HtmlView class="h4" :html="paidika[idx].short_desc" row="0" col="0" colSpan="2" textWrap="True" style="color: white;" />
            </StackLayout>
        </GridLayout>
            <Label text="Παιδικά" class="h2" />                        
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(paid, index) in paidika" rows="156" columns="277" @tap="onItemTap(index, 1)" >
                        <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+paid.menu_img_url" class="card" loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView>   
            <Label text="Μένουμε σπίτι" class="h2" />                        
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(mn, index) in mensp" rows="156" columns="277" @tap="onItemTap(index, 2)" >
                        <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+mn.menu_img_url" class="card" loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView>   
            <Label text="Ιστορίες" class="h2" />                        
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(ist, index) in istories" rows="156" columns="277" @tap="onItemTap(index, 3)" >
                        <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+ist.menu_img_url" class="card" loadMode="async" stretch="aspectFill"  />
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
            SelectedPageService.getInstance().updateSelectedPage("Forchild");
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            }, 
            onItemTap: function(args, no) {
                var seira = "";
                switch(no) {
                    case 1: 
                        seira = this.paidika[args];
                        break;
                    case 2:
                        seira = this.mensp[args];
                        break;
                    case 3:
                        seira = this.istories[args];
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
                this.paidika = response.content.toJSON().services.filter(function (chain) {
                        return chain.masterCategory === "&Delta;&iota;&alpha;&sigma;&kappa;&#941;&delta;&alpha;&sigma;&eta;";})[0].items;
                this.mensp = response.content.toJSON().services.filter(function (chain) {
                        return chain.masterCategory === "&Mu;&alpha;&theta;&alpha;&#943;&nu;&omicron;&upsilon;&mu;&epsilon; &sigma;&tau;&omicron; &sigma;&pi;&#943;&tau;&iota;";})[0].items;
                this.istories = response.content.toJSON().services.filter(function (chain) {
                        return chain.masterCategory === "&Iota;&sigma;&tau;&omicron;&rho;&#943;&epsilon;&sigmaf; &gamma;&iota;&alpha; &pi;&alpha;&iota;&delta;&iota;&#940;";})[0].items;
                this.idx = Math.floor(Math.random() * this.paidika.length);
                this.ok = true;
                }, error => {
                console.error(error);
                });
              
        },        
        data() {
            return {
                paidika: [ ],
                mensp: [],
                istories: [],
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
