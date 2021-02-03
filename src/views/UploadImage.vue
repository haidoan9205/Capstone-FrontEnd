<template>
   <div class="container">
    <div class="row" >
      <div class ="xs12 sm6 offset-sm3">
        <h4>Upload a new photo</h4>
      </div>
    </div>
    <div class="row">
      <div class="xs12">
        <form @submit.prevent="onUploadImage" method="post">
          <div class="row">
            <div xs12 sm6 offset-sm3>
              <base-input
                name="title"
                label="Title"
                id="title"
                v-model="photoName"
                required></base-input>
            </div>
          </div>
        <div class="row">
            <div class="xs12 sm6 offset-sm3">
                <base-input type="file" v-model="file" ref="fileInput"></base-input>
              
            </div>
           
        </div>
           <div class="row">
            <div xs12 sm6 offset-sm3>
              <base-input
                name="price"
                label="price"
                id="price"
                v-model="price"
                required></base-input>
            </div>
          </div>
          <div row>
            <div xs12 sm6 offset-sm3>
              <button
                :disabled="!formIsValid"
                type="submit">Create Meetup</button>
            </div>
          </div>
        </form>
      </div>
    </div>
 </div>
</template>

<script>
import BaseButton from '../components/BaseButton.vue'
import axios from 'axios';
import BaseInput from '../components/BaseInput.vue'
export default {
  components: { BaseInput },
    data () {
    BaseButton
    BaseButton
      return {
        photoName: '',
        file: '',
        price: '',
        typeId: 0,
        userId: 1,
      }
    },
     computed: {
      formIsValid () {
        return this.photoName !== '' &&
          this.file !== '' &&
          this.price !== '' 
      },
      methods: {
      onUploadImage : function(e) {
        console.warn(photoName);
        e.preventDefault();
        
      },
      onPickFile(){
          this.$refs.fileInput.click();
      },
      onFilePicked(event){
            const files = event.target.files;
            let fileName = files[0].photoName;
            if(photoName.lastIndexOf(',') <= 0){
                return alert('Please add a valid file!')
            }
            const fileReader = new FileReader();
            fileReader.addEventListener('load', () => {
                this.file = fileReader.result;
            })
            fileReader.readAsDataURL(files[0]); 
            this.image = files[0];
      }

    }
}}
</script>

<style>

</style>