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
        <StackLayout v-for="(list, listindex) in xdoc">
            <HtmlView class="h2" :html="list.masterCategory" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(item, index) in list.items" rows="156" columns="277" @tap="onItemTap(listindex, index, 2)" >
                        <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+item.menu_img_url" class="card"  loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView>              
        </StackLayout> 
        <StackLayout v-for="(list, listindex) in documentaries">
            <HtmlView class="h2" :html="list.masterCategory" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(item, index) in list.items" rows="156" columns="277" @tap="onItemTap(listindex, index, 1)" >
                        <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+item.menu_img_url" class="card"  loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView>              
        </StackLayout>                        
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
            onItemTap: function(l,args,no) {
                var seira = "";
                switch(no) {
                    case 1:
                        seira = this.seires[l].items[args];
                        break; 
                    case 2:
                        seira = this.xdoc[l].items[args];
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
                        msitem: seira
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
                this.xdoc = response.content.toJSON().services.filter(function (chain) {
                        return chain.id === "42";});                    
                this.documentaries = response.content.toJSON().services.filter(function (chain) {
                        return chain.id === "26";});
                this.idx = Math.floor(Math.random() * this.documentaries[0].items.length);
                this.ok = true;
                }, error => {
                console.error(error);
                });
              
        },        
        data() {
            return {
                documentaries: [ ],
                xdoc: [ ],                
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
