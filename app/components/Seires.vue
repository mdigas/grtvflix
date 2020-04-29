<template>
    <Page class="page" >
        <ActionBar title="ErtFLIX" class="action-bar" >
          <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        </ActionBar>
        <ScrollView> 
            <StackLayout orientation="vertical">
                <GridLayout columns="50,250,auto" rows="auto,auto" >
                    <Image row="0" col="0" colSpan="3" :src="'http://hbbtv.ert.gr'+mv.bg_img_url" stretch="aspectFill" />
                    <StackLayout row="0" col="0" colSpan="2" class="stdown">
                        <HtmlView class="h4" :html="mv.title" style="color: white;" />
                        <HtmlView class="h4" :html="mv.short_desc" style="color: white;" />
                    </StackLayout>             
                </GridLayout>
                <ScrollView orientation="horizontal">
                    <StackLayout orientation="horizontal" >
                        <GridLayout  v-for="(episode, index) in episodes" rows="auto, auto" columns="auto"  @tap="onTapPlay(index)" >
                            <Image row="0" col="0" :src="episode.image" class="card"  loadMode="async" stretch="aspectFill"  />
                            <Label class="lbl" row="1" col="0" :text="'Σ'+episode.season_num+'E'+episode.episode_num+'   Διαθ.Μέχρι: '+episode.expiration_date" />
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
            };
        },
        
    };
</script>
<style>
.stdown{
    margin-top: 250px;
    margin-left: 50px;
    }

.lbl{
    color: #E99935;
    margin-top: 10px;
    margin-left: 10px;
    border-width: 4;
    border-color: #E99935;
    border-style: solid;
    }
.dm{
    margin-top: 10px;
    color: red;
}
.desc{
    margin-top: 10px;
    color: whitesmoke;
}

</style>