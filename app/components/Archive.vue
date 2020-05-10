<template>
    <Page class="page">
        <ActionBar class="action-bar" title=" " android.icon="res://icon" android.iconVisibility="always">
                  <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        </ActionBar>
        <ScrollView>   
            <StackLayout v-if="ok" orientation="vertical">
                <GridLayout columns="50,250,*" rows="auto" >
                    <Image row="0" col="3" colSpan="3" :src="archives[idx].backgroundIcon" loadMode="async" horizontalAlignment="right" stretch="aspectFit"  /> 
                    <StackLayout row="0" col="0" colSpan="2" >
                        <HtmlView class="h3" :html="archives[idx].title" style="color: white;" />
                        <HtmlView class="h4" :html="archives[idx].short_desc" style="color: white;" />
                    </StackLayout> 
                </GridLayout>                
                <ScrollView orientation="horizontal" class="keno" >
                    <StackLayout orientation="horizontal" >
                        <GridLayout  v-for="(archive, index) in archives" rows="156, auto" columns="277"  @tap="onTapPlay(index)" >
                            <Image row="0" col="0" :src="archive.image" class="card"  loadMode="async" stretch="aspectFill"  />
                            <Label class="lbl" row="1" col="0" :text="archive.title+'  Διάρκεια: '+archive.dur" />
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
            if (this.archives[args].mp4 != "") {
                const i = new android.content.Intent(android.content.Intent.ACTION_VIEW);
                i.setDataAndType(android.net.Uri.parse(this.archives[args].mp4), "video/mp4");
                application.android.foregroundActivity.startActivity(i);
            };
            },
        },

        created: function() {
            var url="http://hbbtv.ert.gr/pub/smarttv/ert/feed_archive.php";

            http.request({
                url: url,
                method: "GET",
                }).then(response => {
                this.archives = response.content.toJSON().items;
                this.idx = Math.floor(Math.random() * this.archives.length);
                this.ok = true;
                }, error => {
                console.error(error);
                });
        },

        data() {
            return {
                ok: false,
                archives: [],
                idx: 0,
            };                
        },
        
    };
</script>
