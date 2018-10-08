<!--
    File Name: index.vue
    Description: Create project
    Folder: pages/create/index.vue 
-->
<template>
    <div class="_w-100pct">
        <div class="container _bgcl-neutral-100">
<!-- ******************************* start input project  ******************************* -->
            <div class="container _bgcl-neutral-200 _pd-16px" >
                <div class="row">
                    <div class="col-12 _pd-16px">
                        <v-text-field v-model="title_project" :counter="50" label="Title Project"></v-text-field>
                        <v-text-field v-model="des_project" label="Description"></v-text-field>
                    </div>
                </div>
            </div>
<!-- ******************************* end input project  ******************************* -->
            <br>
            <!-- start Save button -->
            <v-btn color="green" dark @click="saveData">Create Project</v-btn>
            <!-- end Save button -->
        </div>
    </div>
</template>
<script>
import { firestore as db, store } from '~/services/firebaseInit'
export default {
  data() {
    return {
      title_project: null,
      des_project: null,
      project_id: null
    }
  },
  methods: {
    //function save document collection project
    saveData() {
      db
        .collection('project')
        .add({
          title_project: this.title_project,
          des_project: this.des_project
        })
        .then(docRef => {
          return this.$router.push('/create/' + docRef.id)
        })
        .catch(error => console.log(err))
    }
  }
}
</script>


