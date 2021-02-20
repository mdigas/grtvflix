<template>
    <Page class="page">
        <ActionBar title="Πληροφορίες" class="action-bar" >
          <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
        </ActionBar>
        <ScrollView>
            <StackLayout orientation="vertical" class="info" >
               <HtmlView class="h5" :html="starthtml+$props.detail+endhtml" />	
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
