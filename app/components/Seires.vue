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
                     <GridLayout  v-for="(episode, index) in episodes" rows="156, auto" columns="277" >
                            <Image row="0" col="0" :src="episode.image" class="card"  loadMode="async" stretch="aspectFill" @tap="onTapPlay(index)" />
                            <StackLayout row="1" col="0" class="subcard" >
                                <HtmlView v-if="episode.title" :html="episode.title" class="eptitle" />
                                <Label v-if="episode.expiration_date" class="epsmalld" :text="'Διάρκεια: '+episode.dur+'    Διαθ.Μέχρι: '+episode.expiration_date" />
                                <Label v-if="episode.season_num || episode.episode_num" class="epsmall" >
                                    <FormattedString>
                                        <Span v-if="episode.season_num" :text="'Σ:'+episode.season_num+' - '" />
                                        <Span v-if="episode.episode_num" :text="'E:'+episode.episode_num" />
                                    </FormattedString>
                                </Label>
                                <GridLayout columns="*,*,*" rows="auto" >
                                    <Button row="0" col="0" class="btnplay" @tap="onDownloadTap(index)">
                                        <FormattedString>
                                        <Span class="fas" text.decode="&#xf0ab;" fontAttributes="Bold"></Span>
                                        <Span v-if="display === index" :text="'  '+progress"  />
                                        </FormattedString>
                                    </Button>
                                    <Button row="0" col="1" class="btnplay" @tap="onDPlay(index)">
                                        <FormattedString>
                                            <Span class="fas" text.decode="&#xf144;" fontAttributes="Bold"></Span>
                                        </FormattedString>
                                    </Button>
                                    <Button row="0" col="2" class="btnplay" @tap="onDel(index)">
                                        <FormattedString>
                                            <Span class="fas" text.decode="&#xf2ed;" fontAttributes="Bold"></Span>
                                        </FormattedString>
                                    </Button>
                                </GridLayout>                                
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
    import * as fs from 'tns-core-modules/file-system';
    import * as application from 'application';
    const permissions = require( "nativescript-permissions" );
    export default {
        methods: {
            onTapPlay: function(args) {
                if (this.episodes[args].mp4 != "") {
                    const i = new android.content.Intent(android.content.Intent.ACTION_VIEW);
                    i.setDataAndType(android.net.Uri.parse(this.episodes[args].mp4), "video/mp4");
                    application.android.foregroundActivity.startActivity(i);
                };
            },
            onDPlay: function(args) {
                var url =this.episodes[args].mp4;
                var filename = url.substring(url.lastIndexOf('/')+1);
                if (fs.File.exists('/sdcard/Download/'+filename)){
                    let intent = new android.content.Intent(android.content.Intent.ACTION_VIEW);
                    let mimeType = "video/mp4";
                    let context = application.android.currentContext;
                    let nativeFile = new java.io.File('/sdcard/Download/'+filename);
                    let uri = androidx.core.content.FileProvider.getUriForFile(context, 'org.nativescript.ertflix.provider', nativeFile); // Here add ".provider" after your app package name
                    intent.setDataAndType(uri, mimeType);
                    intent.addFlags(android.content.Intent.FLAG_GRANT_READ_URI_PERMISSION);
                    application.android.foregroundActivity.startActivity(android.content.Intent.createChooser(intent, 'Open File...'));
                };
            },
            onDel: function(args) {
                var url =this.episodes[args].mp4;
                var filename = url.substring(url.lastIndexOf('/')+1);
                var file = fs.File.fromPath('/sdcard/Download/'+filename);
                file.remove();
            },            
            onDownloadTap: function(args) {
                permissions.requestPermission(android.Manifest.permission.READ_CONTACTS, "For Downloading");
                this.display = args;
                var url =this.episodes[args].mp4;
                var filename = url.substring(url.lastIndexOf('/')+1);
                var Downloader = require('nativescript-downloader').Downloader;
                var downloader = new Downloader();
                var imageDownloaderId = downloader.createDownload({
                url: this.episodes[args].mp4,
                path: '/sdcard/Download',
                fileName: filename
                });

                downloader
                .start(imageDownloaderId, progressData => {
                    this.progress = progressData.value+'%';
                    console.log(`Progress : ${progressData.value}%`);
                })
                .then(completed => {
                    this.progress[args] = 'downloaded';
                    console.log(`Image : ${completed.path}`);
                })
                .catch(error => {
                    console.log(error.message);
                });
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
                progress: '',
                display: '',
                episodes: [],
            };                
        },
        
    };
</script>
