<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
            <ActionItem icon="res://menu" 
                android:visibility="collapsed" 
                @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>
            <Label class="action-bar-title" text="Αναζήτηση"></Label>
        </ActionBar>

        <ScrollView>
            <StackLayout>
                    <Label col="0" ><FormattedString><Span text.decode="&#xf002;" class="nt-icon fas"></Span>
                    <Span text="  Αναζήτηση" class="h2"></Span></FormattedString></Label> 
                <SearchBar v-model="searchQuery" class="search" @submit="onSearchSubmit" />
                    <WrapLayout>
                        <GridLayout  v-for="(ekp, index) in ekpompes" rows="156, auto" columns="277"  @tap="onTapPlay(index)" >
                            <Image row="0" col="0" :src="ekp.bild" class="card"  loadMode="async" stretch="aspectFill"  />
                            <HtmlView row="1" col="0" class="title" :html="ekp.title" />
                        </GridLayout>
                    </WrapLayout>   
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import * as http from "http";
    import * as utils from "~/shared/utils";
    var utilsModule = require("tns-core-modules/utils/utils");
    import * as application from 'application';
    import SelectedPageService from "~/shared/selected-page-service";    

    export default {
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Search");
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            },
            onSearchSubmit(args) {
                var url="http://hbbtv.ert.gr/pub/smarttv/ert/dyn/feed_search.php?type=full&keyword="+this.searchQuery;
              
                http.request({
                    url: url,
                    method: "GET",
                    }).then(response => {
                    this.ekpompes = response.content.toJSON();
                    utilsModule.ad.dismissSoftInput();
                    }, error => {
                    console.error(error);
                });

            },
            onTapPlay: function(args) {
            if (this.ekpompes[args].url != "") {
                const i = new android.content.Intent(android.content.Intent.ACTION_VIEW);
                i.setDataAndType(android.net.Uri.parse(this.ekpompes[args].url), "video/mp4");
                application.android.foregroundActivity.startActivity(i);
            };
            },
        },

        data() {
            return {
                searchQuery: null,
                ekpompes: []
            };
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '~@nativescript/theme/scss/variables/blue';
    // End custom common variables

    // Custom styles
    .search{
        background-color: #181616;
        color: #ffffff;
        font-size: 24;
    }
    .nt-icon{
        color: #ffffff;
        font-size: 24;
    }
</style>
