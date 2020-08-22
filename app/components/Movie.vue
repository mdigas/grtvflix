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
            <GridLayout row="2" col="1" colSpan="2" columns="*, auto, *" rows="*" >
                <Button row="0" col="0" class="btnplay" @tap="onTapPlay" >    
                    <FormattedString><Span text="Προβολή  " ></Span>
                    <Span class="fas" text.decode="&#xf144;" fontAttributes="Bold"></Span></FormattedString>
                </Button>
                <Button row="0" col="2" class="btnplay" @tap="onmoreTap">
                    <FormattedString><Span text="Περισσότερα  " ></Span>
                    <Span class="fas" text.decode="&#xf05a;" fontAttributes="Bold"></Span></FormattedString>
                </Button>
            </GridLayout>                    
        </GridLayout>       
        </ScrollView>
    </Page>
</template>

<script>
    var utilsModule = require("tns-core-modules/utils/utils");
    import * as application from 'application';
    export default {
        methods: {
            onItemTap: function(args) {
            const i = new android.content.Intent(android.content.Intent.ACTION_VIEW);
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

        props: ["msitem"], 
        
        data() {
            return {
                mv: this.$props.msitem, 
            };
        },
        
    };
</script>