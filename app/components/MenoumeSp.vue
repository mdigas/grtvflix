<template>
    <Page class="page" >
        <ActionBar class="action-bar" title=" " android.icon="res://icon" android.iconVisibility="always">
                  <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        </ActionBar>  
        <StackLayout orientation="vertical">
            <Image src="~/img/menoume.png" loadMode="async" />
            <ScrollView orientation="horizontal" > 
            <GridLayout columns="auto,auto,auto" rows="auto,auto,auto" >
                <Image row="0" col="0" src="http://hbbtv.ert.gr/pub/smarttv/ert/img/a-class_focus.png" loadMode="async" stretch="aspectFill" @tap="onItemTap(0)" />
                <Image row="0" col="1" src="http://hbbtv.ert.gr/pub/smarttv/ert/img/b-class_focus.png" loadMode="async" stretch="aspectFill" @tap="onItemTap(1)" />
                <Image row="0" col="2" src="http://hbbtv.ert.gr/pub/smarttv/ert/img/c-class_focus.png" loadMode="async" stretch="aspectFill" @tap="onItemTap(2)"/>
                <Image row="1" col="0" src="http://hbbtv.ert.gr/pub/smarttv/ert/img/d-class_focus.png" loadMode="async" stretch="aspectFill" @tap="onItemTap(3)"/>
                <Image row="1" col="1" src="http://hbbtv.ert.gr/pub/smarttv/ert/img/e-class_focus.png" loadMode="async" stretch="aspectFill" @tap="onItemTap(4)" />
                <Image row="1" col="2" src="http://hbbtv.ert.gr/pub/smarttv/ert/img/st-class_focus.png" loadMode="async" stretch="aspectFill" @tap="onItemTap(5)" />
                <Image row="2" col="1" src="http://hbbtv.ert.gr/pub/smarttv/ert/img/istoriesON.png" loadMode="async" stretch="aspectFill" @tap="onItemTap(6)" />
            </GridLayout>
            </ScrollView>
        </StackLayout>      
    </Page>
</template>

<script>
    export default {
        methods: {
            onItemTap: function(args) {
                console.log("Item with index: " + args + " tapped");
                this.$goto('Menoume', {
                    animated: true,
                    transition: {
                        name: "slideLeft",
                        duration: 250,
                        curve: "easeIn"},
                    transitioniOS: {},
                    transitionAndroid: {},
                    props: {
                        url: this.videourl[args],
                        no: args
                    }
                });
            },                 
        },
        
        data() {
            return {
                videourl:[
                    "a-class-all",
                    "b-class-all",
                    "c-class-all",
                    "d-class-all",
                    "e-class-all",
                    "st-class-all",
                    "istories-gia-paidia",
                ]
          
            };
        },
        
    };
</script>