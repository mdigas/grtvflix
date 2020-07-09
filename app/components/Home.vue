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
                <Label text=" LiveTV " class="h4menu" @tap="onLiveTap()" />
                <Label text=" Μαθαίνουμε Σπίτι " class="h4menu" @tap="onMenoumeTap()" />
            </StackLayout>
        </ActionBar>
        <ScrollView  orientation="vertical">
        <StackLayout v-if="ok" orientation="vertical">
        <GridLayout columns="50,250,*" rows="auto" >
             <Image row="0" col="0" colSpan="3" :src="movies[idx].bg_img_url" loadMode="async" horizontalAlignment="right" stretch="fill"  /> 
             <!-- <Image row="0" col="0" colSpan="3" :src="movies[0].org" loadMode="async" opacity="0.5" stretch="aspectFit"  /> -->
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
                    <GridLayout v-for="(movie, index) in movies" rows="156" columns="277" @tap="onItemTap1(index)" >
                        <Image row="0" col="0" :src="movie.image" class="card"  loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView>                  
            <Label text="Σειρές" class="h2" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(seira, indexs) in seires" rows="156" columns="277" @tap="onItemTap2(indexs)">
                        <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+seira.menu_img_url" class="card" loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView>
            <Label text="Ξένα Ντοκιμαντέρ" class="h2" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(doc, indexd) in documentaries" rows="156" columns="277" @tap="onItemTap3(indexd)" >
                        <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+doc.menu_img_url" class="card" loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView>
            <Label text="Ελληνικά Ντοκιμαντέρ" class="h2" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(eldoc, indexd) in eldocumentaries" rows="156" columns="277" @tap="onItemTap6(indexd)" >
                        <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+eldoc.menu_img_url" class="card" loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView>            
            <Label text="Ενημέρωση" class="h2" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(enim, indexe) in enimerosi" rows="156" columns="277"  @tap="onItemTap5(indexe)">
                        <Image row="0" col="0" :src="enim.image" class="card" loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView> 
            <Label text="Παιδικά" class="h2" />                        
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(paid, indexp) in paidika" rows="156" columns="277" @tap="onItemTap4(indexp)" >
                        <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+paid.menu_img_url" class="card" loadMode="async" stretch="aspectFill"  />
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
            onItemTap1: function(args) {
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
            onItemTap2: function(args) {
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
                        seira: this.seires[args]
                    }
                });
            },
            onItemTap3: function(args) {
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
                        seira: this.documentaries[args]
                    }
                });
            }, 
            onItemTap6: function(args) {
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
                        seira: this.eldocumentaries[args]
                    }
                });
            },            
            onItemTap4: function(args) {
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
                        seira: this.paidika[args]
                    }
                });
            }, 
            onItemTap5: function(args) {
                console.log("Item with index: " + args + " tapped");
                this.$goto('News', {
                    animated: true,
                    transition: {
                        name: "slideLeft",
                        duration: 250,
                        curve: "easeIn"},
                    transitioniOS: {},
                    transitionAndroid: {},
                    props: {
                        movie: this.enimerosi[args]
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
                        return chain.idnam === "xenes-seires";})[0].items;
                this.documentaries = response.content.toJSON().services.filter(function (chain) {
                        return chain.masterCategory === "&Xi;&#941;&nu;&alpha; &Nu;&tau;&omicron;&kappa;&iota;&mu;&alpha;&nu;&tau;&#941;&rho;";})[0].items;
                this.eldocumentaries = response.content.toJSON().services.filter(function (chain) {
                        return chain.masterCategory === "&Epsilon;&lambda;&lambda;&eta;&nu;&iota;&kappa;&#940; &Nu;&tau;&omicron;&kappa;&iota;&mu;&alpha;&nu;&tau;&#941;&rho;";})[0].items;
                this.paidika = response.content.toJSON().services.filter(function (chain) {
                        return chain.masterCategory === "&Delta;&iota;&alpha;&sigma;&kappa;&#941;&delta;&alpha;&sigma;&eta;";})[0].items;
                }, error => {
                console.error(error);
                });
              
        },        
        data() {
            return {
                movies: [ ],
                seires: [ ],
                documentaries: [ ],
                eldocumentaries: [ ],                
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
