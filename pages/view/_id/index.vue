<!--
    File Name: index.vue
    Description: Shoe description project
    Folder: pages/view/_id/index.vue
-->
<template>
    <div class="_w-100pct">
        <div class="container _bgcl-neutral-100">
<!-- ******************************* start output project  ******************************* -->
            <div class="container">     
                <div class="row">
                    <div class="col-12 _pd-16px">
                        <v-input prepend-icon="description">
                            Project : {{title_project}}
                        </v-input>
                        <v-input>
                            Description : {{des_project}}
                        </v-input>
                    </div>
                </div> 
            </div>
<!-- ******************************* end output project  ******************************* -->

<!-- ******************************* start output page (table)  ******************************* -->
            <div class="container">
                <v-data-table :items="pages_Object" class="elevation-1" hide-headers>
                    <template slot="items" slot-scope="pages">
                        <td class="text-xs-left">
                            {{ pages.item.title_page }}
                        </td>
                        <td class="justify-center layout px-0">
                            <nuxt-link :to="{name:'view-id-viewpage-viewpageid', params: { viewpageid: pages.item.id, id: $route.params.id}}">
                                <v-icon small class="mr-2">
                                    remove_red_eye
                                </v-icon>
                            </nuxt-link>
                            <nuxt-link :to="{name:'edit-id-editpage-editpageid', params: { editpageid: pages.item.id, id: $route.params.id}}">
                                <v-icon small>
                                    edit
                                </v-icon>
                            </nuxt-link>
                        </td>
                    </template>
                </v-data-table>
            </div>
<!-- ******************************* end output page (table)  ******************************* -->
            <br>
<!-- ******************************* start tool  ******************************* -->
            <div class=" col-12 _dp-f ">
                <!-- start Link to create/_id.vue -->
                <nuxt-link :to="{name: 'create-id', params: {id: $route.params.id}}">
                    <v-btn color="blue" dark>Add Page</v-btn>
                </nuxt-link> 
                <!-- end Link to create/_id.vue -->
                <!-- start Delete Project button -->
                <v-btn color="#FF0000" dark @click="deleteProject">Delete Project</v-btn>
                <!-- end Delete Project button -->
                <!-- start Link to print/manual/_manualid.vue -->
                <nuxt-link :to="{name:'print-manual-manualid', params: { manualid: $route.params.id}}">
                    <v-btn color="#A9A9A9" dark>Print Manual</v-btn>
                </nuxt-link>
                <!-- end Link to print-uat -->
                <!-- start Link to print/uat/_uatid.vue -->
                <nuxt-link :to="{name:'print-uat-uatid', params: { uatid: $route.params.id}}">
                    <v-btn color="#A9A9A9" dark>Print UAT</v-btn>
                </nuxt-link>  
                <!-- end Link to print-uat --> 
            </div>
<!-- ******************************* end tool  ******************************* -->
        </div>
    </div>
</template>

<script>
import { firestore as db, store } from '~/services/firebaseInit'
export default {
  data: () => ({
    project: null,
    title_project: null,
    des_project: null,
    pages_Object: []
  }),
  async created() {
    //collection project
    const id = this.$route.params.id
    const snapshot = await db.collection('project').get()
    snapshot.forEach(doc => {
      if (doc.id === id) {
        ;(this.id = doc.id),
          (this.title_project = doc.data().title_project),
          (this.des_project = doc.data().des_project)
      }
    })
    //collection page
    const snapshotpage = await db
      .collection('project')
      .doc(this.id)
      .collection('page')
      .get()
    snapshotpage.forEach(doc => {
      const data = {
        id: doc.id,
        title_page: doc.data().title_page
      }
      this.pages_Object.push(data)
    })
  },
  methods: {
    //function deleteproject
    async deleteProject() {
      const id = this.$route.params.id
      //console.log(id)
      // delete project
      const snapshotpage = await db
        .collection('project')
        .doc(id)
        .collection('page')
        .get()
      snapshotpage.forEach(doc => {
        if (doc.id !== id) {
          doc.ref.delete()
        }
      })
      // delete page
      const snapshot = await db.collection('project').get()
      snapshot.forEach(doc => {
        //console.log(doc.id, '=>', doc.data())
        if (doc.id === id) {
          doc.ref.delete()
          return this.$router.push('/')
        }
      })
    }
  }
}
</script>