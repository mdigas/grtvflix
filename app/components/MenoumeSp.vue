<template>
    <Page class="page" >
        <ActionBar class="action-bar" title=" " android.icon="res://icon" android.iconVisibility="always">
                  <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        </ActionBar>  
        <ScrollView orientation="vertical">
        <StackLayout orientation="vertical">
            <Image src="~/img/menoume.png" loadMode="async" />
            <WrapLayout>
                <Image src="http://hbbtv.ert.gr/pub/smarttv/ert/img/a-class_focus.png" width="315" height="165" loadMode="async" @tap="onItemTap(0)" />
                <Image src="http://hbbtv.ert.gr/pub/smarttv/ert/img/b-class_focus.png" width="315" height="165" loadMode="async"  @tap="onItemTap(1)" />
                <Image src="http://hbbtv.ert.gr/pub/smarttv/ert/img/c-class_focus.png" width="315" height="165" loadMode="async"  @tap="onItemTap(2)" />
                <Image src="http://hbbtv.ert.gr/pub/smarttv/ert/img/d-class_focus.png" width="315" height="165" loadMode="async" @tap="onItemTap(3)" />
                <Image src="http://hbbtv.ert.gr/pub/smarttv/ert/img/e-class_focus.png" width="315" height="165" loadMode="async" @tap="onItemTap(4)" />
                <Image src="http://hbbtv.ert.gr/pub/smarttv/ert/img/st-class_focus.png" width="315" height="165" loadMode="async" @tap="onItemTap(5)" />
                <Image src="http://hbbtv.ert.gr/pub/smarttv/ert/img/istoriesON.png" width="315" height="165" loadMode="async" @tap="onItemTap(6)" />
            </WrapLayout>
        </StackLayout>   
        </ScrollView>           
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