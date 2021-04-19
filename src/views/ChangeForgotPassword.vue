<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="text-center text-muted mb-4">
                                <h4>Change Password</h4>
                            </div>
                            <form  role="form" @submit.prevent="onChangePassword" method="put">
                                <div class="form-group">
                                    <input v-model="newpassword" type="password" placeholder="New Password" class="form-control" required/>
                                </div>
                                <div class="form-group">
                                    <input v-model="confirmpassword" type="password" placeholder="Confirm Password" class="form-control" required/>
                                </div>
                                <!-- <div class="text-muted font-italic">
                                    <small>password strength:
                                        <span class="text-success font-weight-700">strong</span>
                                    </small>
                                </div>-->
                                <div class="text-center">
                                    <div class="form-group">
                                        <input type="submit" value="Change Password" class="btn btn-primary" />
                                    </div>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            newpassword: "",
            confirmpassword: "",
            userId: ""
        };
    },
    
    mounted: function() {
        var url_string = window.location.href;
        var url = new URL(url_string);
        //this.userId = url.searchParams.get("userId");
        this.userId = url.hash.substring(30);
        console.log(url.hash.substring(30));
    },
    methods: {
        onChangePassword() {
            //let userId = "eb4571fe-0bfb-4394-999b-c7c64bfb335a";
            let newpassword = this.newpassword;
            let confirmpassword = this.confirmpassword;
            const fd = new FormData();
            if (newpassword.length < 12 || newpassword.length > 30) {
                alert("Password must have 12 - 30 characters");
            } else {
                if (newpassword === confirmpassword) {
                    axios.put("https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Auth/RecoveryPasswordForUser", {
                        userId: this.userId,
                        newPassword: this.newpassword
                    })
                    .then((respone) => {
                        if (respone.status == 200) {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            this.$router.push("/login");
                            alert("Change password successfully");
                        } else {
                            alert("Change password error");
                        }
                        console.log(respone.status);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                } else {
                    alert("Confirm password not match");
                }
            }
        },
    },
};
</script>
<style>
</style>
