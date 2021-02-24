<template>
    <div class="container">
        <div class="form" >
            <h4>Upload a new photo</h4>
            <form @submit.prevent="onUploadPhoto" method="post">
                <div class="form-group">
                    <label class="control-label">Title</label>
                    <input  type="text" class="form-control" v-model="photoName" required />
                </div>
                <br/>
                <div class="form-group">
                    <input type="file" class="form-control" @change="onFileSeleted" accept="image/*" required />
                </div>
                <div class="form-group">
                    <label class="control-label">Price</label>
                    <input type="text" class="form-control" v-model="price" required />
                </div>
                <div class="buttonHolder">
                    <button class="btn btn-primary" type="submit">Upload</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            photoName: '',
            file: null,
            price: '',
            typeId: 1,
            userId: 2
        }
    },
    methods: {
        onFileSeleted(event) {
            this.file = event.target.files[0]
        },
        onUploadPhoto() {
            const fd = new FormData();
            fd.append('photoName', this.photoName);
            fd.append('file', this.file, this.file.name);
            fd.append('price', this.price);
            fd.append('typeId', this.typeId);
            fd.append('userId', this.userId);
            let config = {
                headers: {
                "Content-Type": "multipart/form-data"
                }
            };

            axios.post("https://imago.azurewebsites.net/api/v1/Photo/CreatePhoto", fd, config)
                .then((respone) => {
                if (respone.status == 201) {
                    alert("Upload successfully");
                } else {
                    alert("Upload error");
                }
                console.log(respone.status);
                })
                .catch((error) => {
                console.log(error);
                });
        }
    }
}
</script>

<style>
div.form
{
    display: block;
    text-align: center;
}
form
{
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
	max-width: 300px;
}
.buttonHolder{ 
    text-align: center; 
}
h4 {
    padding-top: 5%
}
</style>