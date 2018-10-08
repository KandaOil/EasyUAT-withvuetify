<!--
    File Name: _viewpageid.vue
    Description: Show description page
    Folder: pages/view/_id/viewpage/_viewpageid.vue
-->
<template>
    <div class="_w-100pct">
        <div class="container _bgcl-neutral-100">
<!-- ******************************* start output page  ******************************* -->
            <div class="container">     
                <div class="row">
                    <div class="col-12 _pd-16px">
                        <v-input prepend-icon="description">
                            Project : {{title_page}}
                        </v-input>
                        <!-- start Delete Page button -->
                        <v-btn color="#FF0000" dark @click="deletePage">Delete Page</v-btn>
                        <!-- end Delete Page button -->
                    </div>
                </div> 
            </div>
<!-- ******************************* end output page  ******************************* -->
<!-- ******************************* start output image, label and textarea  ******************************* -->
            <div class="col-12 _pd-16px">
                <!-- start output image -->
                <div id="preview">
                    <img :src="previewimage" alt="" id="picture" >
                    <!-- start circlel  -->
                        <div  class="label-circle" v-for="(label, i) in labels_Object" :key="i" 
                        :style="'left: ' + label.x + 'px; top: ' + label.y + 'px'" >
                            {{i+1}}
                        </div>
                    <!-- end circlel  -->
                </div>
                <!-- end output image -->
                <!-- start output label  -->
                <div v-for="(label, i) in labels_Object" :key="i">
                    <!-- start textarea  -->
                        <p>{{ i + 1 }}.  Manual: {{labels_Object[i].manual}}</p>
                            <p>Test: {{labels_Object[i].test}}</p>
                            <p>Result: {{labels_Object[i].test_result}}</p>
                    <!-- end textarea  -->
                </div>
                <!-- end output label  -->
            </div>
<!-- ******************************* end output image, label and textarea  ******************************* -->
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
    des_page: null,
    previewimage: null,
    labels_Object: []
  }),
  async created() {
    const id = this.$route.params.id
    const pageid = this.$route.params.viewpageid
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
    //function deletepage
    async deletePage() {
      const id = this.$route.params.id
      const pageid = this.$route.params.viewpageid
      console.log(pageid)
      const snapshot = await db
        .collection('project')
        .doc(id)
        .collection('page')
        .doc(pageid)
        .delete()
        .then(function() {})
        .catch(function(error) {})
      return this.$router.push('/view/' + id)
    }
  }
}
</script>