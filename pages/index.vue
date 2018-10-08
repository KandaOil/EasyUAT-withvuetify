<!--
    File Name: index.vue
    Description: Show all projects
    Folder: pages/index.vue 
-->
<template>
    <div class="_w-100pct">
        <div class="container _bgcl-neutral-100 is-preload" >
<!-- ******************************* start CREATE button  ******************************* -->      
            <nuxt-link to="/create" class="white--text">
                <v-btn fab dark large color="purple">
                    <v-icon >add</v-icon>
                </v-btn>
            </nuxt-link>
<!-- ******************************* end CREATE button  ******************************* -->
            <br><br>
<!-- ******************************* start output project  ******************************* -->
            <div class="container _bgcl-neutral-300 _pd-16px">
                <div class="row">
                    <div class="col-4 _pd-16px" v-for="(projects, i) in projects_Object" :key="i">
                        <v-card>
                            <v-card-title>
                                <div>
                                <span class="grey--text"><v-chip>Number {{i+1}}</v-chip></span><br>
                                <span>{{projects.title_project}}</span><br>
                                <span>{{projects.des_project}}</span>
                                </div>
                            </v-card-title>
                            <v-card-actions>
                                <nuxt-link :to="{name:'view-id', params: {id: projects.id}}">
                                    <v-btn flat color="orange">View</v-btn>
                                </nuxt-link>
                            </v-card-actions>
                        </v-card> 
                    </div>
                </div>
            </div>
<!-- ******************************* start output project  ******************************* -->
        </div>
    </div>
</template>

<script>
import { firestore as db, store } from '~/services/firebaseInit'
export default {
  data() {
    return {
      projects_Object: [],
      id: null
    }
  },
  async created() {
    //collection project
    const snapshot = await db.collection('project').get()
    snapshot.forEach(doc => {
      this.id = doc.id
      const data = {
        id: doc.id,
        title_project: doc.data().title_project,
        des_project: doc.data().des_project
      }
      this.projects_Object.push(data)
    })
  }
}
</script>