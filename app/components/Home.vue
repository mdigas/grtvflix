<template>
    <Page class="page">
        <ActionBar class="action-bar" title=" " android.icon="res://icon" android.iconVisibility="always">
        <StackLayout orientation="horizontal">
            <Label text=" LiveTV " class="h4menu" @tap="onLiveTap()" />
            <Label text=" Αρχείο " class="h4menu" @tap="onArchiveTap()" />
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
            <Label text="Ντοκιμαντέρ" class="h2" />
            <ScrollView orientation="horizontal">
                <StackLayout orientation="horizontal" >
                    <GridLayout v-for="(doc, indexd) in documentaries" rows="156" columns="277" @tap="onItemTap3(indexd)" >
                        <Image row="0" col="0" :src="'http://hbbtv.ert.gr'+doc.menu_img_url" class="card" loadMode="async" stretch="aspectFill"  />
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
    import * as http from "http";
    export default {
        methods: {
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
            onArchiveTap: function() {
                this.$goto('Archive', {
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
