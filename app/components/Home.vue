<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
            <ActionItem icon="res://menu" 
                android:visibility="collapsed" 
                @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>
            <Label class="action-bar-title" text="Home"></Label>
            <StackLayout orientation="horizontal">
                <Label text=" LiveTV " class="h4" @tap="onLiveTap()" />
                <Label text=" Μαθαίνουμε Σπίτι " class="h4" @tap="onMenoumeTap()" />
            </StackLayout>
        </ActionBar>
        <ScrollView  orientation="vertical">
        <StackLayout v-if="ok" orientation="vertical">
        <GridLayout columns="10,450,*" rows="150, auto, *" >
             <Image row="0" col="0" colSpan="3" rowSpan="3" :src="movies[idx].org" opacity="0.8" loadMode="async" horizontalAlignment="center" stretch="aspectFit"  /> 
             <!-- <Image row="0" col="0" colSpan="3" rowSpan="2" :src="movies[idx].bg_img_url" loadMode="async" horizontalAlignment="right" stretch="fill"  /> 
                  <Image row="0" col="0" colSpan="3" :src="movies[0].org" loadMode="async" opacity="0.5" stretch="aspectFit"  /> -->
             <StackLayout row="1" col="1" class="box">
                <Label class="title" :text="movies[idx].title" textWrap="true" />
                <Label class="duration" :text="'Διάρκεια: '+movies[idx].dur" />
                <Label class="smalldesc" :text="movies[idx].short_desc" textWrap="true" />
            </StackLayout>
        </GridLayout>
            <Label text="Ταινίες" class="h2" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(movie, index) in movies" rows="156" columns="277" @tap="onItemTap(0, index, 1)" >
                        <Image row="0" col="0" :src="movie.image" class="card"  loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView>         
        <StackLayout v-for="(list, listindex) in seires">
            <HtmlView class="h2" :html="list.masterCategory" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(item, index) in list.items" rows="156" columns="277" @tap="onItemTap(listindex, index, 2)" >
                        <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+item.menu_img_url" class="card"  loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView>              
        </StackLayout>
        <StackLayout v-for="(list, listindex) in xdoc">
            <HtmlView class="h2" :html="list.masterCategory" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(item, index) in list.items" rows="156" columns="277" @tap="onItemTap(listindex, index, 6)" >
                        <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+item.menu_img_url" class="card"  loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView>              
        </StackLayout> 
        <StackLayout v-for="(list, listindex) in documentaries">
            <HtmlView class="h2" :html="list.masterCategory" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(item, index) in list.items" rows="156" columns="277" @tap="onItemTap(listindex, index, 3)" >
                        <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+item.menu_img_url" class="card"  loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView>              
        </StackLayout> 
            <Label text="Ενημέρωση" class="h2" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(enim, indexe) in enimerosi" rows="156" columns="277"  @tap="onItemTap(0,indexe,4)">
                        <Image row="0" col="0" :src="enim.image" class="card" loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView>         
        <StackLayout v-for="(list, listindex) in paidika">
            <HtmlView class="h2" :html="list.masterCategory" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(item, index) in list.items" rows="156" columns="277" @tap="onItemTap(listindex, index, 5)" >
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
    import * as permissions from 'nativescript-permissions';
    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Home");
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            },
            onLiveTap: function() {
                this.$goto('LiveTV', {
                    animated: true,
                    transition: {
                        name: "slideLeft",
                        duration: 250,
                        curve: "easeIn"},
                    transitioniOS: {},
                    transitionAndroid: {},
                });
            },  
            onMenoumeTap: function() {
                this.$goto('MenoumeSp', {
                    animated: true,
                    transition: {
                        name: "slideLeft",
                        duration: 250,
                        curve: "easeIn"},
                    transitioniOS: {},
                    transitionAndroid: {},
                });
            },
            onItemTap: function(l,args,no) {
                var seira = "";
                var NavNext = "Seires";
                switch(no) {
                    case 1: 
                        seira = this.movies[args];
                        NavNext = "Movie";
                        break;
                    case 2:
                        seira = this.seires[l].items[args];
                        break;
                    case 3:
                        seira = this.documentaries[l].items[args];
                        break;    
                    case 4:
                        seira = this.enimerosi[args];
                        NavNext = "Movie";
                        break;
                    case 5:
                        seira = this.paidika[l].items[args];
                        break;  
                    case 6:
                        seira = this.xdoc[l].items[args];
                        break;                                                
                    };
                this.$goto(NavNext, {
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
                            /* list of permissions needed */
                let permissionsNeeded = [
                    android.Manifest.permission.WRITE_EXTERNAL_STORAGE,
                    android.Manifest.permission.READ_EXTERNAL_STORAGE,
                ];
                /* showing up permissions dialog */
                permissions
                    .requestPermissions(permissionsNeeded, "For Downloading")
                    .then(() => this.allowExecution = true)
                    .catch(() => this.allowExecution = false);

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

            var url1="http://hbbtv.ert.gr/pub/smarttv/ert/getFeedContent.php?categoryIdnam=enimerosi";

            http.request({
                url: url1,
                method: "GET",
                }).then(response => {
                this.enimerosi = response.content.toJSON().elems[0].items;
                }, error => {
                console.error(error);
                });      

            var url2="http://hbbtv.ert.gr/pub/smarttv/ert/feed_NewLayout.php";

            http.request({
                url: url2,
                method: "GET",
                }).then(response => {
                this.seires = response.content.toJSON().services.filter(function (chain) {
                        return chain.id === "32";});
                this.xdoc = response.content.toJSON().services.filter(function (chain) {
                        return chain.id === "42";});
                this.documentaries = response.content.toJSON().services.filter(function (chain) {
                        return chain.id === "26";});
                this.paidika = response.content.toJSON().services.filter(function (chain) {
                        return chain.id === "29";});                    
                }, error => {
                console.error(error);
                });
              
        },        
        data() {
            return {
                movies: [ ],
                seires: [ ],
                xdoc: [ ],
                documentaries: [ ],              
                enimerosi: [ ],
                paidika: [ ],
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
