<!--
    File Name: _id.vue
    Description: Create page
    Folder: pages/create/_id.vue 
-->
<template>
    <div class="_w-100pct">
        <div class="container _bgcl-neutral-100">
<!-- ******************************* start output project  ******************************* -->
            <div class="container _bgcl-neutral-200 _pd-16px">
                <div class="row">
                    <div class="col-12 _pd-16px">
                        <v-input prepend-icon="description">
                            Project : {{title_project}}
                        </v-input>
                        <v-input>
                            Description : {{des_project}}
                        </v-input>
                        <!-- start add page button -->     
                        <v-btn color="blue" dark @click="addPage()">Add Page</v-btn>
                        <!-- end add page button -->  
                    </div>
                </div> 
            </div>
<!-- ******************************* start output project  ******************************* -->
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
<!-- ******************************* start output page (table)  ******************************* -->
<!-- ******************************* start form page  ******************************* -->
            <div v-for="(page, i) in pages" :key="i">
                <!-- start input title page -->
                <div class="col-12 _pd-16px">
                    <div class="bio-input _pd-16px">
                        <v-text-field v-model="title_page" :counter="50" label="Title Page"></v-text-field>
                    </div>
                </div>
                <!-- end input title page -->
                <!-- start input image and label -->
                <input type="file" @change="onFileChange" accept="image/*"><br>
                    <div id="preview" @click="addLabel">
                        <img :src="previewimage" id="picture" >
                            <div class="label-circle" v-for="(label, i) in labels"
                        :key="i" :style="'left: ' + label.x + 'px; top: ' + label.y + 'px'">
                        {{ i + 1 }}
                            </div>
                    </div>
                    <!-- end input image and label -->
                    <!-- start input textarea -->
                    <div class="container">
                        <div class="col-12">
                            <div class="row">
                                <div v-for="(item, i) in labels" :key="i">
                                    <h6>{{ i + 1 }}.Manual :</h6>
                                        <v-text-field name="input-1" label="Manual" textarea rows="8" cols="130" v-model="item.manual"></v-text-field>
                                    <h6>{{ i + 1 }}.Test :</h6>
                                        <v-text-field name="input-1" label="Test" textarea rows="8" cols="130" v-model="item.test"></v-text-field>
                                    <h6>{{ i + 1 }}.Result :</h6>
                                        <v-text-field name="input-1" label="Result" textarea rows="8" cols="130" v-model="item.test_result"></v-text-field>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <!-- end input textarea -->
            </div>
<!-- ******************************* end form page  ******************************* -->
            <!-- start Save button -->
            <v-btn color="green" dark @click="savePage">Save</v-btn>
            <!-- end Save button -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
#preview {
  position: relative;
  border: 2px solid rgb(148, 146, 146);
  display: inline-block;
}
#picture {
  width: 1020px;
  height: 600px;
}

.label-circle {
  width: 30px;
  height: 30px;
  background: red;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 50%;
  position: absolute;
}
</style>

<script>
import { firestore as db, store } from '~/services/firebaseInit'

export default {
  data: () => ({
    id: null,
    title_page: null,
    title_project: null,
    des_project: null,
    previewimage: '',
    img: '',
    labels: [],
    pages: [],
    pages_Object: [],
    downloadURL: null
  }),
  async created() {
    const id = this.$route.params.id
    //collection project
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
    //function addpage
    addPage() {
      this.pages.push({
        title_page: ' '
      })
    },
    //function choose file and save in storage
    onFileChange(e) {
      const file = e.target.files[0]
      const metadata = {
        contentType: file.type
      }
      const task = store
        .ref()
        .child(file.name)
        .put(file)
      task.then(snapshot => {
        snapshot.ref.getDownloadURL().then(url => {
          this.previewimage = url
        })
      })
      const reader = new FileReader()
      reader.onload = e => {
        this.previewimage = e.target.result
      }
      reader.readAsDataURL(file)
    },
    //function addlabel -> circle and textarea
    addLabel(e) {
      var x = e.offsetX
      var y = e.offsetY
      var labelLength = this.labels.length
      this.labels.push({
        x: x,
        y: y,
        manual: '',
        test: '',
        test_result: ''
      })
    },
    //function save document subcollection page
    savePage() {
      db
        .collection('project')
        .doc(this.id)
        .collection('page')
        .add({
          title_page: this.title_page,
          img: this.previewimage,
          label: this.labels
        })
      return location.reload()
    }
  }
}
</script>
