<template>
    <Page class="page">
        <ActionBar title="ErtFLIX" class="action-bar" />
        <ScrollView class="anim-images" orientation="vertical">
        <StackLayout orientation="vertical">
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
                this.$goto('Movie', {
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
</style>