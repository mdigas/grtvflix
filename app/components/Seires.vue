<template>
    <Page class="page">
        <ActionBar class="action-bar" title=" " android.icon="res://icon" android.iconVisibility="always">
                  <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        </ActionBar>
        <ScrollView>   
             <GridLayout columns="50,400,*, *" rows="*, *, auto" >
             <Image row="0" col="0" colSpan="4" rowSpan="3" :src="'http://hbbtv.ert.gr'+this.$props.msitem.bg_img_url" loadMode="async" horizontalAlignment="right" verticalAlignment="top" stretch="aspectFit"  /> 
             <StackLayout row="1" col="1" colSpan="2" >
                <HtmlView class="h4" :html="mv.title" />
                <HtmlView class="h5" :html="mv.short_desc" />
            </StackLayout>        
            <ScrollView row="2" col="0" colSpan="4" orientation="horizontal" >
                <StackLayout orientation="horizontal" >
                     <GridLayout  v-for="(episode, index) in episodes" rows="156, auto" columns="277"  @tap="onTapPlay(index)" >
                            <Image row="0" col="0" :src="episode.image" class="card"  loadMode="async" stretch="aspectFill"  />
                            <StackLayout row="1" col="0" class="subcard" >
                                <HtmlView v-if="episode.title" :html="episode.title" class="eptitle" />
                                <Label v-if="episode.expiration_date" class="epsmalld" :text="'Διάρκεια: '+episode.dur+'    Διαθ.Μέχρι: '+episode.expiration_date" />
                                <Label v-if="episode.season_num || episode.episode_num" class="epsmall" >
                                    <FormattedString>
                                        <Span v-if="episode.season_num" :text="'Σ:'+episode.season_num+' - '" />
                                        <Span v-if="episode.episode_num" :text="'E:'+episode.episode_num" />
                                    </FormattedString>
                                </Label>
                            </StackLayout>
                     </GridLayout>
                </StackLayout>
            </ScrollView>   
            </GridLayout>  
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

        props: ["msitem"],

        created: function() {
            
            console.log(this.$props.msitem.idnam);
            var url="http://hbbtv.ert.gr/pub/smarttv/ert/getFeedContent.php?categoryIdnam="+this.$props.msitem.idnam;

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
                mv: this.$props.msitem,
                episodes: [],
            };                
        },
        
    };
</script>
