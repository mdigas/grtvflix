<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
            <ActionItem icon="res://menu" 
                android:visibility="collapsed" 
                @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>
            <Label class="action-bar-title" text="Αρχείο"></Label>
        </ActionBar>
        <ScrollView  orientation="vertical">
            <WrapLayout>
                <GridLayout  v-for="(ekp, index) in archives" rows="156" columns="277"   @tap="onItemTap(index)" >
                    <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+ekp.menu_img_url" class="card" loadMode="async" stretch="aspectFill" />
                </GridLayout>
            </WrapLayout> 
        </ScrollView>  
    </Page>
</template>

<script>
    import * as utils from "~/shared/utils";
    import SelectedPageService from "../shared/selected-page-service";
    import * as http from "http";

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Archives");
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            },
            onItemTap: function(args) {
                console.log("Item with index: " + args + " tapped");
                this.$goto('Seires', {
                    animated: true,
                    transition: {
                        name: "slideLeft",
                        duration: 250,
                        curve: "easeIn"},
                    transitioniOS: {},
                    transitionAndroid: {},
                    props: {
                        msitem: this.archives[args]
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
                this.archives = response.content.toJSON().services.filter(function (chain) {
                        return chain.id === "24";})[0].items;
                }, error => {
                console.error(error);
                });
              
        },        
        data() {
            return {
                archives: [ ],
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
