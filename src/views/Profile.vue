<template>
  <div class="profile-page">
    <section
      class="section-profile-cover section-shaped my-0 shape shape-style-1 shape-primary shape-skew alpha-4"
    >
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div class="row justify-content-center">
                  <div class="col-lg-12 order-lg-2">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img v-lazy="'img/theme/team-4-800x800.jpg'" class="rounded-circle">
                                    </a>
                                </div>
                            </div>
        </div>
      </div>
    </section>
    <section class="section section-skew">
      <div class="container">
        <card shadow class="card-profile mt--300" no-body>
          <div class="mt-5 py-5 px-4 text-center">
            <div class="row justify-content-center">
              <div class="row align-items-center">
                <div class="col-sm-4">
                  <small class="text-uppercase text-muted font-weight-bold"
                    >Name</small
                  >
                </div>
                <div class="col-sm-8">
                  <base-input placeholder="Doan Quang Hai" disabled>
                  </base-input>
                </div>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="row align-items-center">
                <div class="col-sm-4">
                  <small class="text-uppercase text-muted font-weight-bold"
                    >Birthday</small
                  >
                </div>
                <div class="col-sm-8">
                  <base-input placeholder="28/07/1999" disabled> </base-input>
                </div>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="row align-items-center">
                <div class="col-sm-4">
                  <small class="text-uppercase text-muted font-weight-bold"
                    >Phone</small
                  >
                </div>
                <div class="col-sm-8">
                  <base-input placeholder="(+84) 973.538.339" disabled>
                  </base-input>
                </div>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="row align-items-center">
                <div class="col-sm-4">
                  <small class="text-uppercase text-muted font-weight-bold"
                    >Password</small
                  >
                </div>
                <div class="col-sm-8">
                  <base-input placeholder="*******" type="password" disabled>
                  </base-input>
                </div>
              </div>
            </div>
            <base-button
              size="sm"
              type="primary"
              class="btn-tooltip"
              v-b-tooltip.hover.right
              title="Tooltip on right"
              >Change Password
            </base-button>
          </div>
        </card>
      </div>
    </section>
  </div>
</template>
<script>
export default {};
</script>
<style scpped></style>
