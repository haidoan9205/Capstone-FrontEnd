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
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-center text-muted mb-4">
                <h4>Sign up</h4>
              </div>
              <form role="form">
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Name"
                  addon-left-icon="ni ni-hat-3"
                >
                </base-input>
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Email"
                  addon-left-icon="ni ni-email-83"
                >
                </base-input>
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Phone"
                  addon-left-icon="fa fa-phone"
                >
                </base-input>
                <base-input
                  alternative
                  type="password"
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                >
                </base-input>
                <base-input addon-left-icon="ni ni-calendar-grid-58">
                  <flat-picker
                    slot-scope="{ focus, blur }"
                    @on-open="focus"
                    @on-close="blur"
                    :config="{ allowInput: true }"
                    class="form-control datepicker"
                    v-model="dates.simple"
                  >
                  </flat-picker>
                </base-input>
                <base-checkbox>
                  <span
                    >I agree with the
                    <a href="#">Privacy Policy</a>
                  </span>
                </base-checkbox>
                <div class="text-center">
                  <base-button type="primary" class="my-4"
                    >Create account</base-button
                  >
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
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
export default {
  components: {
    flatPicker
  },
  data() {
    return {
      dates: {
        simple: "2018-07-17",
        range: "2018-07-17 to 2018-07-19"
      }
    };
  }
};
</script>
