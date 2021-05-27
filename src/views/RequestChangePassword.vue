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
                            <form  role="form" @submit.prevent="onChangePassword" method="post">
                                <div class="form-group">
                                    <input v-model="email" type="text" placeholder="Enter your email" class="form-control" required/>
                                </div>
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
            email: ""
        };
    },
    methods: {
        onChangePassword() {
            const fd = new FormData();
            fd.append("email", this.email);
            axios.post("https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/Auth/RequestRecoveryPassword", fd)
            .then((respone) => {
            if (respone.status == 200) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                alert("We send you an email to confirm changing the password");
            } else {
                alert("Something has error, Please try again!!!");
            }
                (respone.status);
            })
            .catch((error) => {
            (error);
            });
        },
    },
};
</script>
<style>
</style>
