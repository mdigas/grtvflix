<template lang="html">
<GridLayout rows="auto, *" class="nt-drawer__content">
            <StackLayout row="0" class="nt-drawer__header">
                <Image src="res://icon" width="72" height="72"></Image>
                <Label class="h5" text="GRTVFLIX"></Label>
                <Label class="h6" text=" "></Label>
            </StackLayout>
        
            <ScrollView row="1" class="nt-drawer__body">
                <StackLayout>
                    <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (selectedPage === 'Home' ? '-selected': '')" @tap="onNavigationItemTap(Home)">
                        <Label col="0" text.decode="&#xf015;" class="nt-icon fas"></Label>
                        <Label col="1" text="Αρχική" class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (selectedPage === 'Movies' ? '-selected': '')" @tap="onNavigationItemTap(Movies)">
                        <Label col="0" text.decode="&#xf008;" class="nt-icon fas"></Label>
                        <Label col="1" text="Ταινίες" class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (selectedPage === 'Serials' ? '-selected': '')" @tap="onNavigationItemTap(Serials)">
                        <Label col="0" text.decode="&#xf26c;" class="nt-icon fas"></Label>
                        <Label col="1" text="Σειρές" class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (selectedPage === 'Enimerosi' ? '-selected': '')" @tap="onNavigationItemTap(Enimerosi)">
                        <Label col="0" text.decode="&#xf7a2;" class="nt-icon fas"></Label>
                        <Label col="1" text="Ενημέρωση" class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (selectedPage === 'Ekpobes' ? '-selected': '')" @tap="onNavigationItemTap(Ekpobes)">
                        <Label col="0" text.decode="&#xf03d;" class="nt-icon fas"></Label>
                        <Label col="1" text="Εκπομπές" class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (selectedPage === 'Sports' ? '-selected': '')" @tap="onNavigationItemTap(Sports)">
                        <Label col="0" text.decode="&#xf434;" class="nt-icon fas"></Label>
                        <Label col="1" text="Αθλητικά" class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (selectedPage === 'Forchild' ? '-selected': '')" @tap="onNavigationItemTap(Forchild)">
                        <Label col="0" text.decode="&#xf1ae;" class="nt-icon fas"></Label>
                        <Label col="1" text="Παιδικά" class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (selectedPage === 'Archives' ? '-selected': '')" @tap="onNavigationItemTap(Archives)">
                        <Label col="0" text.decode="&#xf187;" class="nt-icon fas"></Label>
                        <Label col="1" text="Αρχείο" class="p-r-10"></Label>
                    </GridLayout>

                    <StackLayout class="hr"></StackLayout>

                    <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (selectedPage === 'Browse' ? '-selected': '')" @tap="onNavigationItemTap(Browse)">
                        <Label col="0" text.decode="&#xf073;" class="nt-icon far"></Label>
                        <Label col="1" text="Μέρες πριν.." class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'nt-drawer__list-item' + (selectedPage === 'Search' ? '-selected': '')" @tap="onNavigationItemTap(Search)">
                        <Label col="0" text.decode="&#xf002;" class="nt-icon fas"></Label>
                        <Label col="1" text="Αναζήτηση" class="p-r-10"></Label>
                    </GridLayout>

                </StackLayout>
            </ScrollView>
        </GridLayout>
</template>

<script>
    import Home from "./Home";
    import Movies from "./Movies";
    import Serials from "./Serials";
    import Enimerosi from "./Enimerosi";    
    import Ekpobes from "./Ekpobes";   
    import Sports from "./Sports";        
    import Forchild from "./Forchild";
    import Archives from "./Archives";    
    import Browse from "./Browse";
    import Search from "./Search";
    import * as utils from "~/shared/utils";
    import SelectedPageService from "~/shared/selected-page-service";    
    
    export default {
        mounted() {
            SelectedPageService.getInstance().selectedPage$
                .subscribe((selectedPage) => this.selectedPage = selectedPage);
        },
        data () {
            return {
                Home: Home,
                Movies: Movies,
                Serials: Serials,
                Enimerosi: Enimerosi,
                Ekpobes: Ekpobes,
                Sports: Sports,
                Forchild: Forchild,
                Archives: Archives,
                Browse: Browse,
                Search: Search,
                selectedPage: ""
            };
        },
        components: {
            Home,
            Movies,
            Serials,
            Enimerosi,
            Ekpobes,
            Sports,
            Forchild,
            Archives,
            Browse,
            Search
        },
        methods: {
            onNavigationItemTap(component) {
                this.$navigateTo(component, {
                    clearHistory: true
                });
                utils.closeDrawer();
            }
        }
    };
</script>
