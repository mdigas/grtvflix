<template>
    <Page class="page">
        <ActionBar class="action-bar" title=" " android.icon="res://icon" android.iconVisibility="always"></ActionBar>
        <ScrollView  orientation="vertical">
        <StackLayout v-if="ok" orientation="vertical">
        <GridLayout columns="50,250,*" rows="auto" >
             <Image row="0" col="0" colSpan="3" :src="'http://hbbtv.ert.gr/pub/smarttv/ert/'+movies[idx].backgroundIcon" loadMode="async" horizontalAlignment="right" stretch="fill"  /> 
             <!-- <Image row="0" col="0" colSpan="3" :src="movies[0].org" loadMode="async" opacity="0.5" stretch="aspectFit"  /> -->
             <StackLayout row="0" col="0" colSpan="2" class="stdown">
                <Label class="h4" :text="movies[idx].title" style="color: white;" />
                <Label class="desc" :text="'Διάρκεια: '+movies[idx].dur" style="color: white;" />
                <Label class="desc" :text="movies[idx].short_desc" row="0" col="0" colSpan="2" textWrap="True" />
                <Label class="dm" :text="'Διαθέσιμο μέχρι: '+movies[idx].expiration_date"  />
            </StackLayout>
        </GridLayout>
            <Label text="Ταινίες" class="h2" />
            <ScrollView class="anim-images" orientation="horizontal">
                <StackLayout orientation="horizontal" class="">
                    <GridLayout v-for="(movie, index) in movies" rows="auto, auto" columns="auto" @tap="onItemTap1(index)" >
                        <Image row="0" col="0" :src="movie.image" class="card"  loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView>                  
            <Label text="Σείρες" class="h2" />
            <ScrollView class="anim-images" orientation="horizontal">
                <StackLayout orientation="horizontal" class="">
                    <GridLayout v-for="(seira, indexs) in seires" rows="auto, auto" columns="auto" @tap="onItemTap2(indexs)">
                        <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+seira.menu_img_url" class="card" loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView>
            <Label text="Ντοκιμαντέρ" class="h2" />
            <ScrollView class="anim-images" orientation="horizontal">
                <StackLayout orientation="horizontal" class="">
                    <GridLayout v-for="(doc, indexd) in documentaries" rows="auto, auto" columns="auto" @tap="onItemTap3(indexd)" >
                        <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+doc.menu_img_url" class="card" loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView>
            <Label text="Ενημέρωση" class="h2" />
            <ScrollView class="anim-images" orientation="horizontal">
                <StackLayout orientation="horizontal" class="">
                    <GridLayout v-for="(enim, indexe) in enimerosi" rows="auto, auto" columns="auto"  @tap="onItemTap5(indexe)">
                        <Image row="0" col="0" :src="enim.image" class="card" loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView> 
            <Label text="Παιδικά" class="h2" />                        
            <ScrollView class="anim-images" orientation="horizontal">
                <StackLayout orientation="horizontal" class="">
                    <GridLayout v-for="(paid, indexp) in paidika" rows="auto, auto" columns="auto" @tap="onItemTap4(indexp)" >
                        <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+paid.menu_img_url" class="card" loadMode="async" stretch="aspectFill"  />
                    </GridLayout>
                </StackLayout>
            </ScrollView>   
        </StackLayout>
        </ScrollView>
    </Page>
</template> 

<script>
    import * as http from "http";
    export default {
        methods: {
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
            var url="http://hbbtv.ert.gr/pub/smarttv/ert/feed_movies.php";

            http.request({
                url: url,
                method: "GET",
                }).then(response => {
                this.movies = response.content.toJSON().items;
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
                this.seires = response.content.toJSON().services[1].items;
                this.documentaries = response.content.toJSON().services[3].items;
                this.paidika = response.content.toJSON().services[4].items;
                }, error => {
                console.error(error);
                });
              
        },        
        data() {
            return {
                movies: [ ],
                seires: [ ],
                documentaries: [ ],
                enimerosi: [ ],
                paidika: [ ],
                idx: 0,
                ok: false,
            };
        }
    };
</script>

<style scoped>
    .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }

    .description-label {
        margin-bottom: 15;
    }
    .card {
        height: 169px; 
        width: 300px;
        background-color: #181616;
        color: #4d4d4d;
        padding: 5;
    }
    .card-layout {
        padding: 20;
    }
    .card-layout .h1 {
        margin-bottom: 15;
    }
    .page {
    background-color: #000000;
    }
    .action-bar {
    color: royalblue;
    background-color: #000000;
    }    

.dm{
    margin-top: 10px;
    color: red;
}
.desc{
    margin-top: 10px;
    color: whitesmoke;
}
    .h1 {
    font-size: 36;
    margin-top: 10px;
    color: #ffffff;
    }
    
    .h2 {
    font-size: 30;
    margin-top: 10px;
    color: #ffffff;    
    }
    
    .h3 {
    font-size: 24;
    }
    
    .h4 {
    font-size: 18;
    margin-top: 100px;
    color: #ffffff;
    }
    
    .h5 {
    font-size: 14;
    }
    
    .h6 {
    font-size: 12;
    }
</style>