<template>
    <Page class="page" >
        <ActionBar title="ErtFLIX" class="action-bar" >
          <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        </ActionBar>   
        <ScrollView> 
        <StackLayout orientation="vertical">
        <GridLayout columns="50,250,auto" rows="auto" >
            <Image  v-if="mv.backgroundIcon" row="0" col="0" colSpan="3" :src="'http://hbbtv.ert.gr//pub//smarttv//ert/'+mv.backgroundIcon" stretch="aspectFill" />
            <Image  v-if="mv.bg_img_url" row="0" col="0" colSpan="3" :src="mv.bg_img_url" stretch="aspectFill" />
            <StackLayout row="0" col="0" colSpan="2" class="stdown">
                <Label class="h4" :text="mv.title" style="color: white;" />
                <Label class="desc" :text="'Διάρκεια: '+mv.dur"  />
                <Label class="desc" :text="mv.short_desc" row="0" col="0" colSpan="2" textWrap="True" />
                <Label class="dm" :text="'Διαθέσιμο μέχρι: '+mv.expiration_date"  />
                <GridLayout columns="auto,20,auto" rows="auto" >
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
                console.log(this.mv.desc);
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
                mv: this.$props.movie
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