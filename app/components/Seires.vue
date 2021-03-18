<template>
    <Page class="page">
        <ActionBar class="action-bar" title=" " android.icon="res://icon" android.iconVisibility="always">
                  <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        </ActionBar>
        <ScrollView v-if="$orientation === 'portrait'" >
        <StackLayout>
            <Image :src="'http://hbbtv.ert.gr'+this.$props.msitem.menu_img_url" loadMode="async" horizontalAlignment="center" stretch="aspectFit" /> 
            <HtmlView class="title" :html="mv.title" />
            <HtmlView class="smalldesc" :html="mv.short_desc" />
            <Label  class="duration" text="Επεισόδια" />
            <GridLayout class="card" v-for="(episode, index) in episodes" rows="*, auto" columns="*" >
                <Image row="0" col="0" :src="episode.image" loadMode="async" stretch="aspectFill" @tap="onTapPlay(index)" />
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
                                    <Span :text="' '+progress[index]"  />
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
        <GridLayout v-if="$orientation === 'landscape'" columns="*,50,400" >    
            <GridLayout col="0" rows="*,*">
                <Image row="0" :src="'http://hbbtv.ert.gr'+this.$props.msitem.menu_img_url" loadMode="async" horizontalAlignment="center" stretch="aspectFit"  /> 
            <StackLayout row="1" >
                <HtmlView class="title" :html="mv.title" textWrap="true" />
                <HtmlView class="smalldesc" :html="mv.short_desc" textWrap="true" />
            </StackLayout> 
            </GridLayout>
            <StackLayout col="2" >
            <Label  class="duration" text="Επεισόδια" />
            <ScrollView orientation="vertical" >
                <StackLayout orientation="vertical" >
                        <GridLayout class="card" v-for="(episode, index) in episodes" rows="*, auto" columns="*" >
                            <Image row="0" col="0" :src="episode.image" loadMode="async" stretch="aspectFill" @tap="onTapPlay(index)" />
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
                                        <Span :text="' '+progress[index]"  />
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
            </StackLayout>
        </GridLayout>
    </Page>
</template>

<script>
    import * as http from "http";
    var utilsModule = require("tns-core-modules/utils/utils");
    import * as fs from 'tns-core-modules/file-system';
    import * as application from 'application';
    const fileSystem = require("tns-core-modules/file-system");
    export default {
        methods: {
            onTapPlay: function(args) {
                if (this.episodes[args].mp4 != "") {
                    const i = new android.content.Intent(android.content.Intent.ACTION_VIEW);
                    i.setDataAndType(android.net.Uri.parse(this.episodes[args].mp4), "video/mp4");
                    application.android.foregroundActivity.startActivity(android.content.Intent.createChooser(i, 'Open File...'));
                };
            },
            onDPlay: function(args) {
                var url =this.episodes[args].mp4;
                url=url.replace("\/r\/1", "");
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
                url=url.replace("\/r\/1", "");
                var filename = url.substring(url.lastIndexOf('/')+1);
                var file = fs.File.fromPath('/sdcard/Download/'+filename);
                file.remove();
                this.$set(this.progress, args, "");
            },            
            onDownloadTap: function(args) {
                var url =this.episodes[args].mp4;
                url=url.replace("\/r\/1", "");
                var filename = url.substring(url.lastIndexOf('/')+1);
                if (!fs.File.exists('/sdcard/Download/'+filename)){
                    var srDownloaderId = this.$Downloader.createDownload({
                        url: url,
                        path: '/sdcard/Download',
                        fileName: filename              
                    });

                this.$Downloader
                .start(srDownloaderId, progressData => {
                    this.$set(this.progress, args, progressData.value+'%');
                    console.log(`Progress : ${progressData.value}%`);
                })
                .then(completed => {
                    console.log(`Image : ${completed.path}`);
                })
                .catch(error => {
                    console.log(error.message);
                });
                    
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

                var temp = []; 
                var url="";
                var filename="";
                var filePath="";
                for (var i = 0; i < this.episodes.length; i++) {
                  url= this.episodes[i].mp4;
                  url=url.replace("\/r\/1", "");
                  filename = url.substring(url.lastIndexOf('/')+1);
                  filePath= fileSystem.path.join(android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).getAbsolutePath(), filename);
                  temp.push(fs.File.exists(filePath)? "100%":"");
                };
                this.progress = temp;

                }, error => {
                console.error(error);
                });
        
        },
        data() {
            return {
                mv: this.$props.msitem,
                progress: [],
                episodes: [],
            };                
        },
        
    };
</script>
