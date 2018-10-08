<!--
    File Name: _editpageid.vue
    Description: Edit page
    Folder: pages/edit/_id/editpage/_editpageid.vue 
-->
<template>
    <div class="_w-100pct">
        <div class="container _bgcl-neutral-100">
<!-- ******************************* start input page  ******************************* -->
             <div class="container">     
                <div class="row">
                    <div class="col-12 _pd-16px">
                        <v-input prepend-icon="description">
                            Project : {{title_page}}
                        </v-input>
                    </div>
                </div> 
            </div>
<!-- ******************************* end input page  ******************************* -->
<!-- ******************************* start input image, label and textarea  ******************************* -->        
            <!-- start input image and label -->
            <div class="col-12 _pd-16px">
                <input type="file" @change="onFileChange" accept="image/*"> <br>
                <div id="preview" @click="addLabel">
                    <img :src="previewimage" alt="" id="picture">
                        <div class="label-circle" v-for="(labels, i) in labels_Object"
                            :key="i" :style="'left: ' + labels.x + 'px; top: ' + labels.y + 'px'">
                            {{ i + 1 }}
                        </div>
                </div>
            </div>
            <!-- end input image and label -->
            <!-- start input textarea -->
            <div class="bio-textarea _pd-16px" v-for="(labels, i) in labels_Object" :key="i">
                <h6>{{ i + 1 }}.Manual :</h6>
                    <v-flex xs6>
                        <v-textarea outline name="input-7-4" v-model="labels_Object[i].manual"></v-textarea>
                    </v-flex>
                <h6>{{ i + 1 }}.Test :</h6>
                    <v-flex xs6>
                        <v-textarea outline name="input-7-4" v-model="labels_Object[i].test"></v-textarea>
                    </v-flex>
                <h6>{{ i + 1 }}.Result :</h6>
                    <v-flex xs6>
                        <v-textarea outline name="input-7-4" v-model="labels_Object[i].test_result"></v-textarea>
                    </v-flex>
            </div>
            <!-- end input textarea -->
<!-- ******************************* start input image, label and textarea  ******************************* -->
            <!-- start Save button -->
            <v-btn color="green" dark @click="savePage">Save</v-btn>
            <!-- end Save button -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
#preview {
  position: relative;
  border: 2px solid rgb(148, 146, 146);
  display: inline-block;
}
#picture {
  width: 1020px;
  height: 500px;
}
</style>

<script>
import { firestore as db, store } from '~/services/firebaseInit'
export default {
  data: () => ({
    id: null,
    title_page: null,
    previewimage: null,
    labels_Object: [],
    downloadURL: null,
    img: null
  }),
  async created() {
    const id = this.$route.params.id
    const pageid = this.$route.params.editpageid
    //collection page
    const snapshotpage = await db
      .collection('project')
      .doc(id)
      .collection('page')
      .get()
    snapshotpage.forEach(doc => {
      if (doc.id === pageid) {
        ;(this.id = doc.id),
          (this.title_page = doc.data().title_page),
          (this.previewimage = doc.data().img),
          (this.labels_Object = doc.data().label)
      }
    })
  },
  methods: {
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
      const id = this.$route.params.id
      const pageid = this.$route.params.editpageid
      db
        .collection('project')
        .doc(id)
        .collection('page')
        .doc(pageid)
        .update({
          title_page: this.title_page,
          img: this.previewimage,
          label: this.labels
        })
      return this.$router.push('/view/' + id)
    }
  }
}
</script>