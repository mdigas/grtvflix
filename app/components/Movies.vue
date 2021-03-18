<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
            <ActionItem icon="res://menu" 
                android:visibility="collapsed" 
                @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>
            <Label class="action-bar-title" text=" Ταινίες"></Label>
        </ActionBar>
        <ScrollView  orientation="vertical">
        <StackLayout orientation="vertical">
            <StackLayout v-for="(list, listindex) in movies">
                <HtmlView class="h4" :html="list.masterCategory" />
                <ScrollView orientation="horizontal">
                    <StackLayout orientation="horizontal" >
                        <GridLayout v-for="(item, index) in list.items" rows="156" columns="277" @tap="onItemTap(listindex, index)" >
                            <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+item.menu_img_url" class="card" loadMode="async" stretch="aspectFill"  />
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
            SelectedPageService.getInstance().updateSelectedPage("Movies");
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            },
            onItemTap: function(l, args) {
                var mvidnam = "";
                mvidnam = this.movies[l].items[args].idnam;
                var url="http://hbbtv.ert.gr/pub/smarttv/ert/getFeedContent.php?categoryIdnam="+mvidnam;

                http.request({
                    url: url,
                    method: "GET",
                    }).then(response => {
                    this.mv = response.content.toJSON().elems[0].items[0];
                        this.$goto('Movie', {
                            animated: true,
                            transition: {
                                name: "slideLeft",
                                duration: 250,
                                curve: "easeIn"},
                            transitioniOS: {},
                            transitionAndroid: {},
                            props: {
                                msitem: this.mv
                            }
                        });
                    }, error => {
                    console.error(error);
                    });                

            },
        },
        created: function() {
            var url2="http://hbbtv.ert.gr/pub/smarttv/ert/feed_NewLayout.php";

            http.request({
                url: url2,
                method: "GET",
                }).then(response => {
                this.movies = response.content.toJSON().services.filter(function (chain) {
                        return chain.id === "31";});
                }, error => {
                console.error(error);
                });
              
        },        
        data() {
            return {
                movies: [],
                mv: '',
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
