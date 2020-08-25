<template>
    <Page class="page" >
        <ActionBar class="action-bar" title=" " android.icon="res://icon" android.iconVisibility="always">
                  <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        </ActionBar>  
        <ScrollView>
            <GridLayout columns="50,*,*,*" rows="150,*,*" >
            <Image row="0" col="0" colSpan="4" rowSpan="3" :src="this.$props.msitem.bg_img_url" loadMode="async" horizontalAlignment="right" stretch="fill"  /> 
             <StackLayout row="1" col="1" colSpan="2" >
                <Label class="h4" :text="mv.title" />
                <Label class="h5" :text="'Διάρκεια: '+mv.dur" />
                <HtmlView class="h5" :html="mv.short_desc" />
                <Label  v-if="mv.expiration_date" class="h5" :text="'Διαθέσιμο μέχρι: '+mv.expiration_date"  />
             </StackLayout>
            <GridLayout row="2" col="1" colSpan="2" columns="*,*,*" rows="*,*" >
                <Button row="0" col="0" colSpan="2" class="btnplay" @tap="onTapPlay" >    
                    <FormattedString><Span text="Προβολή  " ></Span>
                    <Span class="fas" text.decode="&#xf144;" fontAttributes="Bold"></Span></FormattedString>
                </Button>
                <Button row="0" col="2" class="btnplay" @tap="onmoreTap">
                    <FormattedString>
                    <Span class="fas" text.decode="&#xf05a;" fontAttributes="Bold"></Span></FormattedString>
                </Button>
               <Button row="1" col="0" class="btnplay" @tap="onDownloadTap">
                    <FormattedString>
                    <Span class="fas" text.decode="&#xf0ab;" fontAttributes="Bold"></Span>
                    <Span v-if="display === index" :text="'  '+progress"  />
                    </FormattedString>
                </Button>
                <Button row="1" col="1" class="btnplay" @tap="onDPlay">
                    <FormattedString>
                        <Span class="fas" text.decode="&#xf144;" fontAttributes="Bold"></Span>
                    </FormattedString>
                </Button>
                <Button row="1" col="2" class="btnplay" @tap="onDel">
                    <FormattedString>
                       <Span class="fas" text.decode="&#xf2ed;" fontAttributes="Bold"></Span>
                    </FormattedString>
                </Button>
            </GridLayout>                    
        </GridLayout>       
        </ScrollView>
    </Page>
</template>

<script>
    var utilsModule = require("tns-core-modules/utils/utils");
    import * as application from 'application';
    import * as fs from 'tns-core-modules/file-system';
    import * as permissions from 'nativescript-permissions'
    export default {
        methods: {
            onItemTap: function(args) {
                const i = new android.content.Intent(android.content.Intent.ACTION_VIEW);
                i.setDataAndType(android.net.Uri.parse(this.mv.mp4), "video/mp4");
                application.android.foregroundActivity.startActivity(android.content.Intent.createChooser(i, 'Open File...'));
            },
            onDownloadTap: function(args) {
                /* list of permissions needed */
                let permissionsNeeded = [
                    android.Manifest.permission.WRITE_EXTERNAL_STORAGE,
                    android.Manifest.permission.READ_EXTERNAL_STORAGE
                ];
                /* showing up permissions dialog */
                permissions
                    .requestPermissions(permissionsNeeded, "For Downloading")
                    .then(() => this.allowExecution = true)
                    .catch(() => this.allowExecution = false);

                var url =this.mv.mp4;
                var filename = url.substring(url.lastIndexOf('/')+1);
                var Downloader = require('nativescript-downloader').Downloader;
                var downloader = new Downloader();
                var imageDownloaderId = downloader.createDownload({
                url: this.mv.mp4,
                path: '/sdcard/Download',
                fileName: filename              
                });

                downloader
                .start(imageDownloaderId, progressData => {
                    this.progress = progressData.value+'%';
                    console.log(`Progress : ${progressData.value}%`);
                })
                .then(completed => {
                    console.log(`Image : ${completed.path}`);
                })
                .catch(error => {
                    console.log(error.message);
                });
            },
            onDPlay: function(args) {
                var url =this.mv.mp4;
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
                var url =this.mv.mp4;
                var filename = url.substring(url.lastIndexOf('/')+1);
                var file = fs.File.fromPath('/sdcard/Download/'+filename);
                file.remove();
            },             
            onmoreTap: function(args) {
                console.log("Item with index: " + args + " tapped");
                this.$goto('MovieDetail', {
                    animated: true,
                    transition: {
                        name: "slideLeft",
                        duration: 250,
                        curve: "easeIn"},
                    transitioniOS: {},
                    transitionAndroid: {},
                    props: {
                        detail: this.mv.desc
                    }
                });
            },      
        },

        props: ["msitem"], 
        
        data() {
            return {
                mv: this.$props.msitem, 
                progress: '',
            };
        },
        
    };
</script>