<template>
    <Page class="page">
        <ActionBar title="Πληροφορίες" class="action-bar" >
          <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        </ActionBar>
        <ScrollView>
            <StackLayout orientation="vertical">
               <WebView :src="starthtml+$props.detail+endhtml" style="background-color: black;" />	
            </StackLayout>  
        </ScrollView>
    </Page>         
</template>

<script>
   export default {
        props: ["detail"],
        data() {
            return {
                starthtml: '<div style="color: white;background-color: black;"',
                endhtml: '</div>',
            };
        },

    };
</script>
