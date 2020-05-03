<template>
    <Page class="page">
        <ActionBar class="action-bar" title=" " android.icon="res://icon" android.iconVisibility="always">
                  <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        </ActionBar>
        <ScrollView>   
            <StackLayout orientation="vertical">
                <Image :src="imag[$props.no]" loadMode="async" /> 
                <GridLayout columns="auto,*" rows="auto"  v-for="(lesson, index) in lessons" >
                    <HtmlView row="0" col="1" class="h4 ":html="lesson.title+'<br>'+lesson.educator" verticalAlignment="top left" textWrap="true" style="color: white;" />
                    <Button row="0" col="0" class="lbl" text="" horizontalAlignment="right" @tap="onTapPlay(index)" >    
                        <FormattedString><Span text="Προβολή" ></Span></FormattedString>
                    </Button>
                </GridLayout>  
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
            if (this.lessons[args].mp4 != "") {
                const i = new android.content.Intent(android.content.Intent.ACTION_VIEW);
                i.setDataAndType(android.net.Uri.parse(this.lessons[args].mp4), "video/mp4");
                application.android.foregroundActivity.startActivity(i);
            };
            },
        },
        props: ["url", "no"],

        created: function() {
              var url="http://hbbtv.ert.gr/pub/smarttv/ert/getFeedContent.php?categoryIdnam="+this.$props.url;

            http.request({
                url: url,
                method: "GET",
                }).then(response => {
                this.lessons = response.content.toJSON().elems[0].items;
                }, error => {
                console.error(error);
                });
        },
        data() {
            return {
                lessons: [],
                imag: [
                    "~/img/amenoume.png",
                    "~/img/bmenoume.png",
                    "~/img/cmenoume.png",
                    "~/img/dmenoume.png",
                    "~/img/emenoume.png",
                    "~/img/stmenoume.png",
                    "~/img/imenoume.png",
                ],

            };                
        },
        
    };
</script>
