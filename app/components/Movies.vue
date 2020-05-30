<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
            <ActionItem icon="res://menu" 
                android:visibility="collapsed" 
                @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>
            <Label class="action-bar-title" text="Ταινίες"></Label>
        </ActionBar>
        <ScrollView  orientation="vertical">
            <StackLayout v-if="ok" orientation="vertical">
                <GridLayout columns="50,250,*" rows="auto" >
                    <Image row="0" col="0" colSpan="3" :src="movies[idx].bg_img_url" loadMode="async" horizontalAlignment="right" stretch="fill"  /> 
                    <StackLayout row="0" col="0" colSpan="2" class="stdown">
                        <Label class="h4" :text="movies[idx].title" style="color: white;" />
                        <Label class="diar" :text="'Διάρκεια: '+movies[idx].dur" style="color: white;" />
                        <Label class="desc" :text="movies[idx].short_desc" row="0" col="0" colSpan="2" textWrap="True" />
                        <Label class="dm" :text="'Διαθέσιμο μέχρι: '+movies[idx].expiration_date"  />
                    </StackLayout>
                </GridLayout>
                <Label text="Ταινίες" class="h2" />
                <ScrollView orientation="horizontal">
                    <StackLayout orientation="horizontal" >
                        <GridLayout v-for="(movie, index) in movies" rows="156" columns="277" @tap="onItemTap(index)" >
                            <Image row="0" col="0" :src="movie.image" class="card"  loadMode="async" stretch="aspectFill"  />
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
            SelectedPageService.getInstance().updateSelectedPage("Movies");
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            },
            onItemTap: function(args) {
                console.log("Item with index: " + args + " tapped");
                this.$goto('Movie', {
                    animated: true,
                    transition: {
                        name: "slideLeft",
                        duration: 250,
                        curve: "easeIn"},
                    transitioniOS: {},
                    transitionAndroid: {},
                    props: {
                        movie: this.movies[args]
                    }
                });
            },
        },
        created: function() {
            var url="http://hbbtv.ert.gr/pub/smarttv/ert/getFeedContent.php?categoryIdnam=tainies";

            http.request({
                url: url,
                method: "GET",
                }).then(response => {
                this.movies = response.content.toJSON().elems[0].items;
                this.idx = Math.floor(Math.random() * this.movies.length);
                this.ok = true;
                }, error => {
                console.error(error);
                });              
        },        
        data() {
            return {
                movies: [ ],
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
