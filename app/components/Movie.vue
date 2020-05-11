<template>
    <Page class="page" >
        <ActionBar class="action-bar" title=" " android.icon="res://icon" android.iconVisibility="always">
                  <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        </ActionBar>  
        <ScrollView :style="bcpage"> 
        <StackLayout orientation="vertical">
        <GridLayout columns="50,250,auto" rows="auto" >
             <StackLayout row="0" col="0" colSpan="2" class="stdown">
                <Label class="h4" :text="mv.title" style="color: white;" />
                <Label class="diar" :text="'Διάρκεια: '+mv.dur" style="color: white;" />
                <HtmlView class="h4" :html="mv.short_desc" style="color: white;" />
                <Label class="dm" :text="'Διαθέσιμο μέχρι: '+mv.expiration_date"  />
                <GridLayout columns="auto,20,auto" rows="auto" class="keno" >
                    <Button row="0" col="0" class="lbl" text="" @tap="onItemTap" >    
                        <FormattedString><Span text="Προβολή" ></Span></FormattedString>
                    </Button>
                    <Button row="0" col="2" class="lbl" @tap="onmoreTap">
                            <FormattedString><Span text="Περισσότερα" ></Span></FormattedString>
                    </Button>
                </GridLayout>
            </StackLayout>
        </GridLayout>
        </StackLayout>      
        </ScrollView>
    </Page>
</template>

<script>
    var utilsModule = require("tns-core-modules/utils/utils");
    import * as application from 'application';
    export default {
        methods: {
            onItemTap: function(args) {
               // utilsModule.openUrl("http:\/\/hbbtv2.ert.gr\/video.php\/geo\/w\/vid\/6983c47bbb1a7c61f586ca7088d3b4b2.mp4");
            const i = new android.content.Intent(android.content.Intent.ACTION_VIEW);
            //i.setPackage("com.mxtech.videoplayer.ad");
            i.setDataAndType(android.net.Uri.parse(this.mv.mp4), "video/mp4");
            application.android.foregroundActivity.startActivity(i);
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

        props: ["movie"], 
        
        data() {
            return {
                mv: this.$props.movie, 
                bcpage: {
                    'backgroud-color': 'black',
                    'background-image': 'url("'+this.$props.movie.bg_img_url+'")',
                    'background-repeat': 'no-repeat',
                    'background-position': 'right top',
                    'background-size': 'auto',
                    },
            };
        },
        
    };
</script>