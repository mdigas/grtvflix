<template>
    <Page class="page" >
        <ActionBar class="action-bar" title=" " android.icon="res://icon" android.iconVisibility="always">
                  <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        </ActionBar>
        <ScrollView>
        <WrapLayout>
            <Image class="livetv" src="~/img/ert1.png" @tap="onItemTap(0)" />
            <Image class="livetv" src="~/img/ert2.png" @tap="onItemTap(1)" />
            <Image class="livetv" src="~/img/ert3.png" @tap="onItemTap(2)"/>
            <Image class="livetv" src="~/img/ertsport.png" @tap="onItemTap(3)"/>
            <Image class="livetv" src="~/img/ertworld.png" @tap="onItemTap(4)" />
            <Image class="livetv" src="~/img/ertplay1.png" @tap="onItemTap(5)" />
            <Image class="livetv" src="~/img/ertplay2.png" @tap="onItemTap(6)" />
            <Image class="livetv" src="~/img/ertplay3.png" @tap="onItemTap(7)" />
            <Image class="livetv" src="~/img/ertplay4.png" @tap="onItemTap(8)" />
            <Image class="livetv" src="~/img/ertplay5.png" @tap="onItemTap(9)" />
         </WrapLayout>
        </ScrollView>  
    </Page>
</template>

<script>
    var utilsModule = require("tns-core-modules/utils/utils");
    import * as application from 'application';
    export default {
        methods: {
            onItemTap: function(args) {
                if (args == 10){
                    const i = new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse("vnd.youtube://" + this.videourl[args]));
                    application.android.foregroundActivity.startActivity(i);
                }else{
                    const i = new android.content.Intent(android.content.Intent.ACTION_VIEW);
                    //i.setDataAndType(android.net.Uri.parse(videourl[args]), "video/mp4");
                    i.setDataAndType(android.net.Uri.parse(this.videourl[args]), "video/mp4");
                    application.android.foregroundActivity.startActivity(i);
                }
            },     
        },
        
        data() {
            return {
                videourl:[
                    "https://ert-live-bcbs15228.siliconweb.com/media/ert_1/ert_1medium.m3u8",
                    "https://ert-live-bcbs15228.siliconweb.com/media/ert_2/ert_2medium.m3u8",
                    "https://ert-live-bcbs15228.siliconweb.com/media/ert_3/ert_3medium.m3u8",
                    "https://ert-live-bcbs15228.siliconweb.com/media/ert_sports/ert_sportshigh.m3u8",
                    "https://ert-live-bcbs15228.siliconweb.com/media/ert_world/ert_world.m3u8",
                    "https://ert-live-bcbs15228.siliconweb.com/media/ert_sports_1/ert_sports_1medium.m3u8",
                    "https://ert-live-bcbs15228.siliconweb.com/media/ert_sports_2/ert_sports_2medium.m3u8",
                    "https://ert-live-bcbs15228.siliconweb.com/media/ert_sports_3/ert_sports_3medium.m3u8",
                    "https://ert-live-bcbs15228.siliconweb.com/media/ert_sports_4/ert_sports_4medium.m3u8",
                    "https://ert-live-bcbs15228.siliconweb.com/media/ert_sports_5/ert_sports_5medium.m3u8",

                ]
          
            };
        },
        
    };
</script>