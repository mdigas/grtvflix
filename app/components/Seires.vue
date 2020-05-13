<template>
    <Page class="page">
        <ActionBar class="action-bar" title=" " android.icon="res://icon" android.iconVisibility="always">
                  <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        </ActionBar>
        <ScrollView :style="bcpage">   
            <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
            <StackLayout orientation="vertical">
                <GridLayout columns="50,250,auto" rows="auto,auto" >
                    <Label row="0" col="0" colSpan="3" class="h4" style="color: white;" />
                    <StackLayout row="0" col="0" colSpan="2" class="stdown">
                        <HtmlView class="h4" :html="mv.title" style="color: white;" />
                        <HtmlView class="h4" :html="mv.short_desc" style="color: white;" />
                    </StackLayout>             
                </GridLayout>
                <ScrollView orientation="horizontal" class="keno" >
                    <StackLayout orientation="horizontal" >
                        <GridLayout  v-for="(episode, index) in episodes" rows="156, auto" columns="277"  @tap="onTapPlay(index)" >
                            <Image row="0" col="0" :src="episode.image" class="card"  loadMode="async" stretch="aspectFill"  />
                            <Label class="lbl" row="1" col="0" ><FormattedString>
                                <Span v-if="episode.season_num" :text="'Σ:'+episode.season_num" />
                                <Span :text="'E:'+episode.episode_num" />
                                <span :text="'   Διαθ.Μέχρι: '+episode.expiration_date" /></FormattedString>
                            </Label>
                        </GridLayout>
                    </StackLayout>
                </ScrollView>     
            </StackLayout>      
        </ScrollView>
    </Page>
</template>

<script>
    import * as http from "http";
    var utilsModule = require("tns-core-modules/utils/utils");
    import * as application from 'application';
    export default {
        methods: {
            onTapPlay: function(args) {
            if (this.episodes[args].mp4 != "") {
                const i = new android.content.Intent(android.content.Intent.ACTION_VIEW);
                i.setDataAndType(android.net.Uri.parse(this.episodes[args].mp4), "video/mp4");
                application.android.foregroundActivity.startActivity(i);
            };
            },
        },

        props: ["seira"],

        created: function() {
            
            console.log(this.$props.seira.idnam);
            var url="http://hbbtv.ert.gr/pub/smarttv/ert/getFeedContent.php?categoryIdnam="+this.$props.seira.idnam;

            http.request({
                url: url,
                method: "GET",
                }).then(response => {
                this.episodes = response.content.toJSON().elems[0].items;
                }, error => {
                console.error(error);
                });
        },

        data() {
            return {
                mv: this.$props.seira,
                episodes: [],
                bcpage: {
                    'backgroud-color': 'black',
                    'background-image': 'url("http://hbbtv.ert.gr'+this.$props.seira.bg_img_url+'")',
                    'background-repeat': 'no-repeat',
                    'background-position': 'right top',
                    'background-size': 'auto',
                    },
            };                
        },
        
    };
</script>
