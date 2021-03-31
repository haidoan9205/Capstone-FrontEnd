<template>
  <div class="mb-3" style="background-color:#F2F2F2">
    <div class="row ml-2 imageInfo">
      <!-- <div class="imageInfo"> -->
      <div class="col-md-5 col-sm-5 col-xs-12">
        <img :src="image.wmlink" />
      </div>
      <div class="col-md-6 mb-5 mb-md-0 mt-3">
        <h3>{{ image.photoName }}</h3>

        <h5 class="heading">${{ image.price }}</h5>
        <p class="lead">
          {{ image.description }}
        </p>
        <badge
          type="info"
          class="text-uppercase"
          v-for="(badge, index) in image.category"
          :key="index"
        >
          <span
            @click="
              modals.modalTag = true;
              openingBadgeModal = badge.categoryName;
              getPhotosByCategory(badge);
            "
          >
            {{ badge.categoryName }}
          </span>
        </badge>
        <modal :show.sync="modals.modalTag">
          <div class="container">
            <div class="modalStyle">
              <badge type="info" class="text-uppercase badgeTagModal">
                {{ openingBadgeModal }}
              </badge>
              <i
                class="fa fa-times closeModal"
                @click="
                  modals.modalTag = false;
                  openingBadgeModal = '';
                "
                aria-hidden="true"
              ></i>
            </div>
            <div class="ct-example-row">
              <div class="row">
                <div
                  class="col-6 col-md-4"
                  v-for="item in testPicture"
                  :key="item.photoId"
                >
                  <router-link
                    :to="{ name: 'photo', params: { photoId: item.photoId } }"
                  >
                    <img v-lazy="item.wmlink" class="img-fit" />
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </modal>

        <blockquote class="blockquote mt-2">
          <p class="mb-0">
            Upload By:
          </p>
          <router-link :to="{ name: 'Profile', params: { userId: image.userId } }">
          <footer class="blockquote-footer">
            <cite title="Source Title">{{ image.userName }}</cite>
          </footer>
          </router-link>
        </blockquote>
        <div class="mb-3 mt-2">
          <base-button class="btn-1" type="primary" @click="addToCart()" v-show="alreadyBought == false"
            >Add to cart</base-button
          >
          <base-button
            class="btn-2"
            outline
            type="primary"
            @click="followUser"
            icon="fa fa-heart-o"
            >Follow</base-button
          >
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
  <!-- <div> image {{ photoId }}</div> -->
</template>

<script>
import Modal from "@/components/Modal.vue";
import axios from "axios";
export default {
  components: { Modal },
  props: ["follows"],

  data() {
    return {
      photoId: 0,
      status: this.follows,
      alreadyBought: false,
      userId: "",
      followUserId: "",
      user: JSON.stringify(window.localStorage.getItem("user")),
      modals: {
        modalTag: false,
      },
      openingBadgeModal: "",
      testPicture: [
        // {
        //   photoId: 77,
        //   photoName: "Man working machine",

        //   link:
        //     "3F4ufJwjswayR16SsIiGq9/EU/1oYr9j3Pm4N0oUeT2HpuLt4EgJfwf4tF0vgch/RMiwHNNSwNDQ4mDdqmxYcs7gaDiY+jwTk/B8JIjeY7HPNF+RCv1DADNRRssXYtvWH8FYUpCbSvdWy4fwiRmmZQa9bz+MZ83sxz7Er/wgmURx+NNK/ZqaQvcllK5MUH/rnlB9zBgfEnYpahn3agn6Ow3YR59hqnTuaR83/C3S2x6KeMCbyKswA+5gHW4WTiDmO8gmFBP13i4p3O8IxF5ynIVwBzk7nCEHz37EzQU1SIeB6JI2wx0X110kS2n1TBKZ68+OQAvWf4/anG0fHW8+duTMJ5hQFe5ABGeYvDYqML+gOq6CySQ8FUxpVILa+tX2xOozTmcSEUbkvOwusEa2ZcpXufNBAt6/oc62wQXcso1Kd4OCEgwEyP57KVcYMMNsfbUkvXOGjKU5XxAnLzTaaA==",
        //   wmlink:
        //     "https://firebasestorage.googleapis.com/v0/b/image-cd56a.appspot.com/o/vmimages%2FWM3172021%2053451%20AMman-5809873_1920.jpg?alt=media&token=6c0a4d05-18b9-46b9-b0b9-28e1be61a1fd",
        // },
        // {
        //   photoId: 94,
        //   photoName: "Flower in the garden",
        //   link:
        //     "UBCuozAJtZNqNP5Og96/3uQ0tHm8m2jpgKnsbTESx3ev9dZU0aOJwXDoKl0xcVqzcK7fI2Csw7qTC5CYjwwLdMF84QrUQWcaoVHjEbyozK+/xVF9n9IQvumukr3XwTtknBDZfbCnrf6Z9kDU/QXf1CtsNPbkAbgzIN8rnVp361n6GLD4yQSTVSrm83iAel7WiREukmnMXgEGj1YFWXi3JtcioY/FYOICdhWwPR1tVwT2WW/BeLkpxRZ9KHt7yfWvnKXSEIPuuP1G5Y1BCGKb/xPqGgWn9nU70qaJKInYd2Xz/2G+Z+7Mg6fFLzmudVbZ6NDusPmUrqlAW3hTMakd38QNx/6V/tvP7nJRAU06fKHYUOB9pDUg18Sb/6MB+HpevEtapKeniIpV6/wDTJ7YmOKbjWPx0PVt7zWcIvytpFBRrx8NFOH71O5iyYrxVl3nsLMmU+oDOwH0wJ1u+2Eqfw==",
        //   wmlink:
        //     "https://firebasestorage.googleapis.com/v0/b/image-cd56a.appspot.com/o/vmimages%2FWM3172021%2064124%20AMgarden-19830_1920.jpg?alt=media&token=ad38cbd7-9602-4670-9965-03395cf74914",
        // },
        // {
        //   photoId: 111,
        //   photoName: "Quang Hai",
        //   link:
        //     "QnAziIC4h1ZLY3U59d8KCWTRei6c7FhVmNDleKFB6pXpiEWRoXM9TGzwbALWsN5Out73coXAQgf5VW7mrB5I3GnZLE4j3jIGvUUDjcX7HjpAls9PkEpHaM7avgFoaa0ctorpgdjgUZcZw4+TN4EdUZImw1SVB0VQTpT/r6ljhjk1LcdLpLXhb+gqPaZScyM2YZcmiHxHijeQnczg4KZEpdr38k73TWp4+oYRr4Va076lyKMxkTLd1+FjQHYzcB1PCe1d/lM+13HfFS0wreZXM1ejHemWAtMvtsMuagoXPcs6HXRxZDxcFzm4/TfLsQfmmXD/CB6nl0h463eKGOeFl9GHGaRoa+UB3EOAReK1zxf19RnruMrLce3FIx33Mh0p+Gpfyuv9e973RY681kU1RzNE8VlkFcHxZWU5+HbeCZqE/ByzW/mXwQHYrG/WdTra",
        //   wmlink:
        //     "https://firebasestorage.googleapis.com/v0/b/image-cd56a.appspot.com/o/vmimages%2FWM3182021%2033330%20PMIMG_4844-1.jpg?alt=media&token=254ecb9a-f3ae-4db0-acc8-13752e749550",
        // },
        // {
        //   photoId: 74,
        //   photoName: "Man hand working",
        //   link:
        //     "3F4ufJwjswayR16SsIiGq9/EU/1oYr9j3Pm4N0oUeT2HpuLt4EgJfwf4tF0vgch/RMiwHNNSwNDQ4mDdqmxYcs7gaDiY+jwTk/B8JIjeY7HPNF+RCv1DADNRRssXYtvWH8FYUpCbSvdWy4fwiRmmZQa9bz+MZ83sxz7Er/wgmURx+NNK/ZqaQvcllK5MUH/rnlB9zBgfEnYpahn3agn6Ow3YR59hqnTuaR83/C3S2x7taPbFnBg1gafgAiTzuSfX6OBym8h/+98alEd0vP7bw9JxnFYN/QxFPOdHPC/aBczl564ipOxAR2zlPB3ghWOgToZigu1/6eyDiod/FtnHcKReJQ8/fk39j1FqHiE5U0hgiGN2uWGK28oqHEhBa6y0P6l89WI/ZLfT3LXKaDXZF1ETNUNR21uBC0iTA/XNJTy6+llYusq+5h5DwqoFREq37XeDftlxyg3a6fcyCgWSiw==",
        //   wmlink:
        //     "https://firebasestorage.googleapis.com/v0/b/image-cd56a.appspot.com/o/vmimages%2FWM3172021%2053249%20AMman-5763048_1920.jpg?alt=media&token=3268d949-5ff5-40ee-84d0-ccfe2dde2c43",
        // },
        // {
        //   photoId: 96,
        //   photoName: "Butterfly",
        //   link:
        //     "UBCuozAJtZNqNP5Og96/3uQ0tHm8m2jpgKnsbTESx3ev9dZU0aOJwXDoKl0xcVqzcK7fI2Csw7qTC5CYjwwLdMF84QrUQWcaoVHjEbyozK+/xVF9n9IQvumukr3XwTtknBDZfbCnrf6Z9kDU/QXf1CtsNPbkAbgzIN8rnVp361n6GLD4yQSTVSrm83iAel7WiREukmnMXgEGj1YFWXi3JtcioY/FYOICdhWwPR1tVwT2ettD78/zHhTYbBC7MnsLhsh8115Zf7scpylWzRQTr50+sKIt+2sdAMtXL7latJ8L1a88h1q+Y2iriK6s15M5KVFWQOnPNLpIEfjGJGquwdnR2e7l42lEu7M8fBmVG4y69IaNA62El2nw/L0mvDM6qAlsGM2SF++ODs3GcEetFyjrSuLE5FbryNZBJqYGsVbMPhP0Xp1+6jhST8AEuu8Ep4k4zsp13FhFJmYZY9NcD7ZpWZildqn8CGBsXQKrtJc=",
        //   wmlink:
        //     "https://firebasestorage.googleapis.com/v0/b/image-cd56a.appspot.com/o/vmimages%2FWM3172021%2064524%20AMbutterfly-2049567_1920.jpg?alt=media&token=2bb375a9-41cb-46d6-b4e6-d51779ee9be1",
        // },
        // {
        //   photoId: 105,
        //   photoName: "Pasta la Vista",
        //   link:
        //     "Im59joCx7cqEYXtXA32bIkx2sIeB/veK90LRjacecK0g4HcvF6ZFgpSD6DlQF7oCMMVi8Uu1hqWpMLpHproXOX5Lbo+gAsEry14Hm+iSFLtPdeJLgFjplqSbM9rIVs8prT71GBrFMfW68/ujDvkyb08TLqLZm+4XRmxjADyCplM7deXsHT7pd6aZ7jEvCSg80vacvrqd094/bcDYvwgai5xuGb5VggfbThGFTiVws89PEQujQc4QrKKhgsxf3L1f/+wtzauA0gNbWL0X9+kmhf8zWL07SRllqBviDWfKpVgOFsJXOgUFpNxQGK6vFnWxeqtcHv6/LC0zs9jg9NN96nrEpH0+oOE//NfNrTtJxY/CJPugj9g0gr3BJMHi7S/FLKLL1gj98Dh+Hg50geczXsXDWue1OLthQPal2I4CvgnavCyiHl3YnFv0johT9l5u6IDc7k/htGSzkMiy4DKNIittbRQLn6PV5VkmcuUtnxA=",
        //   wmlink:
        //     "https://firebasestorage.googleapis.com/v0/b/image-cd56a.appspot.com/o/vmimages%2FWM3172021%2072101%20AMitalian-1082230_1920.jpg?alt=media&token=b4e33ff9-50fe-4dc5-b568-eb3fba35ddc1",
        // },
        // {
        //   photoId: 85,
        //   photoName: "Nature",
        //   link:
        //     "3F4ufJwjswayR16SsIiGq9/EU/1oYr9j3Pm4N0oUeT2HpuLt4EgJfwf4tF0vgch/RMiwHNNSwNDQ4mDdqmxYcs7gaDiY+jwTk/B8JIjeY7HPNF+RCv1DADNRRssXYtvWH8FYUpCbSvdWy4fwiRmmZQa9bz+MZ83sxz7Er/wgmURx+NNK/ZqaQvcllK5MUH/rnlB9zBgfEnYpahn3agn6Ow3YR59hqnTuaR83/C3S2x6Cic8UzID4i+5x7vT8rU434OP5ppv9zB9Sxb1oWXcUdRCl9cWA+2s9A0mbtvkclTM6lnQ2C3+TlBGsOqp/QweNck2LjMV4GdiHds/NEvh2LNa7rLnYqtWqp2rymqUSQ80NvQFikyzfspP3sQODf1fmhp6qfc91WIeq7fXrIlaYtIBnezxvID2WNA/9vaUeG9A0PR+129Y8zm/dFl+WFFFfPF1Fw70Z3xk6rgQP+ltCgw==",
        //   wmlink:
        //     "https://firebasestorage.googleapis.com/v0/b/image-cd56a.appspot.com/o/vmimages%2FWM3172021%2054604%20AMsunset-5809870_1920.jpg?alt=media&token=d26162dc-e40b-48c8-b915-2c61ba34f77b",
        // },
        // {
        //   photoId: 108,
        //   photoName: "Ice Cream",
        //   link:
        //     "Im59joCx7cqEYXtXA32bIkx2sIeB/veK90LRjacecK0g4HcvF6ZFgpSD6DlQF7oCMMVi8Uu1hqWpMLpHproXOX5Lbo+gAsEry14Hm+iSFLtPdeJLgFjplqSbM9rIVs8prT71GBrFMfW68/ujDvkyb08TLqLZm+4XRmxjADyCplM7deXsHT7pd6aZ7jEvCSg80vacvrqd094/bcDYvwgai5xuGb5VggfbThGFTiVws8/BoSsXoYyrHZIpVRnsKjgdc5LPkx+JQqHVFfTJcNm0sxH/xlffzn5uOfW+R1PrbF2a+1A6YOCWOZ+wXhjg6ZgGbEYQ+wzyGJlKPCd/Q2ZCnM+cziGfCHGN9u9NzLRwO7QMmXirbIz1+0YDIKebxM8zwlV/pxWn4fznKZhJT52M/lBFnNetxFNwlqwAYg96Dz7syeeq04R2xj8rng/rOQYY2x4z15kRfImdKJX373Ko0sRG4LrMr3o21nu43ENFN/A=",
        //   wmlink:
        //     "https://firebasestorage.googleapis.com/v0/b/image-cd56a.appspot.com/o/vmimages%2FWM3172021%2085033%20AMice-cream-926426_1920.jpg?alt=media&token=cd1173b0-20ee-4200-a04b-0f891722e784",
        // },
        // {
        //   photoId: 75,
        //   photoName: "British Cat",
        //   link:
        //     "QnAziIC4h1ZLY3U59d8KCWTRei6c7FhVmNDleKFB6pXpiEWRoXM9TGzwbALWsN5Out73coXAQgf5VW7mrB5I3GnZLE4j3jIGvUUDjcX7HjpAls9PkEpHaM7avgFoaa0ctorpgdjgUZcZw4+TN4EdUZImw1SVB0VQTpT/r6ljhjk1LcdLpLXhb+gqPaZScyM2YZcmiHxHijeQnczg4KZEpT8b2pDVlrfDZUlX1t/pHAlOndYWHlqJwTujXw9Ki8SHTnTLZorutU+BNQ6qVKYPhGSB8kGlJqTg2VNHfQ/8nD2/j1Rzsju9Q5TcrpsTxSDjk3puNwVKwTmjDo9V8dI9ESrkYMr7l/n5BLfFhIUJ4x+u0DU6sxYOD+hi829n0FD9k3zP+zi2Lz64tbWw15Ujd738rBatRO28Yfd1NDYIc6SSftlN8piZCXdViMNpB4YLykqG73z9CAGHd8Z4MHilZg==",
        //   wmlink:
        //     "https://firebasestorage.googleapis.com/v0/b/image-cd56a.appspot.com/o/vmimages%2FWM3172021%2053337%20AMcat-4098058_1920.jpg?alt=media&token=842da772-10ca-408f-877f-554017c3ed1d",
        // },
        // {
        //   photoId: 95,
        //   photoName: "Turtle in the sea",
        //   link:
        //     "UBCuozAJtZNqNP5Og96/3uQ0tHm8m2jpgKnsbTESx3ev9dZU0aOJwXDoKl0xcVqzcK7fI2Csw7qTC5CYjwwLdMF84QrUQWcaoVHjEbyozK+/xVF9n9IQvumukr3XwTtknBDZfbCnrf6Z9kDU/QXf1CtsNPbkAbgzIN8rnVp361n6GLD4yQSTVSrm83iAel7WiREukmnMXgEGj1YFWXi3JtcioY/FYOICdhWwPR1tVwRPkc0RhYtjwZ8mVpuUqLDQsTUMB1oT6ME656k4pOgMx/mh+W/cJvaZFIw3PULX9EUmrGq6q+y82n7hgwDIOJUOscn9VMfrjyxzCOY+xJF7gBwrFB/d9teBFTMLzn3j7zAz8Zot3LK4xgpX3PfpRMezv7wnHVp6VfaWUbDkjBSPFwfYFJLGWtTpryqBGt1RJ0Bb1cImSh7EOH45L/WH2gV8xLmULkIJgiuLS7vll2pkzQ==",
        //   wmlink:
        //     "https://firebasestorage.googleapis.com/v0/b/image-cd56a.appspot.com/o/vmimages%2FWM3172021%2064411%20AMsea-2361247_1920.jpg?alt=media&token=2157696f-cf62-478e-8914-f320b16629a3",
        // },
        // {
        //   photoId: 93,
        //   photoName: "Women holding her son",
        //   link:
        //     "3F4ufJwjswayR16SsIiGq9/EU/1oYr9j3Pm4N0oUeT2HpuLt4EgJfwf4tF0vgch/RMiwHNNSwNDQ4mDdqmxYcs7gaDiY+jwTk/B8JIjeY7HPNF+RCv1DADNRRssXYtvWH8FYUpCbSvdWy4fwiRmmZQa9bz+MZ83sxz7Er/wgmURx+NNK/ZqaQvcllK5MUH/rnlB9zBgfEnYpahn3agn6Ow3YR59hqnTuaR83/C3S2x7KUuCaq2m89qIhYO9vcx0Ay0ZiTB1zTVsDrtz4OrdYqPpCyhBDQ/oB7r2lxQxl0SNs+fJdmPqkFmSCxD82fVPDkGsXabrkzQFnyw8g5CZ2tWTy1yCoOkEkPfNcCiuzWJbal994dJoDGxiQ9oNGTvizqN3dzxDxPMe/N6B6MsABXwHIOV7ST2PbZnV8PGVwUY2JYbfL4ZmQBcf+RCY5m/rARpP74r9s0lKH7+E/UNjplY1XhgCRoddiwU9ODbun8ZaMCiPtrV+MkbDTaz14zVHe",
        //   wmlink:
        //     "https://firebasestorage.googleapis.com/v0/b/image-cd56a.appspot.com/o/vmimages%2FWM3172021%2063846%20AMblack-lives-matter-5339910_1920.jpg?alt=media&token=7732d346-5a7b-4135-abcb-53f77d563edb",
        // },
        // {
        //   photoId: 106,
        //   photoName: "Wine n Rose",
        //   link:
        //     "Im59joCx7cqEYXtXA32bIkx2sIeB/veK90LRjacecK0g4HcvF6ZFgpSD6DlQF7oCMMVi8Uu1hqWpMLpHproXOX5Lbo+gAsEry14Hm+iSFLtPdeJLgFjplqSbM9rIVs8prT71GBrFMfW68/ujDvkyb08TLqLZm+4XRmxjADyCplM7deXsHT7pd6aZ7jEvCSg80vacvrqd094/bcDYvwgai5xuGb5VggfbThGFTiVws89sWUMZBrRwGI0sJgixAVd6GxM+LBjmk+JacSZ7KT8Aa+AMqtjrHq038nILV41CbluE5xIj7DXyqqQPOHvh59+kucgTecMZPbQbPvA0MakvfaQN6Kphv9WtS4sLf+8a2pC2JQcIRaCcJ+sgVf+PzzVpxjanWX7AjfZSdlQlQGoXhoZJqRBSX9YwdOxB7GQcAdBjnOK96RVQtePAox/OK4vgaw5NLwz3MzJuwX42CIcYxA==",
        //   wmlink:
        //     "https://firebasestorage.googleapis.com/v0/b/image-cd56a.appspot.com/o/vmimages%2FWM3172021%2080412%20AMrose-1024710_1920.jpg?alt=media&token=9dfa1ae2-bef0-45d5-8ee9-c04aeaa9e7e2",
        // },
        // {
        //   photoId: 88,
        //   photoName: "Pigeon",
        //   link:
        //     "3F4ufJwjswayR16SsIiGq9/EU/1oYr9j3Pm4N0oUeT2HpuLt4EgJfwf4tF0vgch/RMiwHNNSwNDQ4mDdqmxYcs7gaDiY+jwTk/B8JIjeY7HPNF+RCv1DADNRRssXYtvWH8FYUpCbSvdWy4fwiRmmZQa9bz+MZ83sxz7Er/wgmURx+NNK/ZqaQvcllK5MUH/rnlB9zBgfEnYpahn3agn6Ow3YR59hqnTuaR83/C3S2x7o6QDMSWDCuCX80f4z0yeZwbg/85aL7e6aGlOj13SKWmukYsKy7/zSrTMKS/cyAy6MRzCAl+ZFopZ/muQ7GiUN5nXbi4B/WyNWzC6PSSRbdul4KIhw1M0eL62jFLA6WgMnHqa4ufuzZ82zG2CZwJy4iK/H/6qYwsA0VWRzUvgzJ22+dO4AlyUPe4CSrWHpC+WEDmh2AN797HdsSujPmiJO5S2MRyKmcJNfr5Kf6VBIqA==",
        //   wmlink:
        //     "https://firebasestorage.googleapis.com/v0/b/image-cd56a.appspot.com/o/vmimages%2FWM3172021%2055201%20AMpigeon-5611150_1920.jpg?alt=media&token=4f38a0f2-83e7-4d45-a5af-baa096557b7f",
        // },
        // {
        //   photoId: 97,
        //   photoName: "Beach",
        //   link:
        //     "UBCuozAJtZNqNP5Og96/3uQ0tHm8m2jpgKnsbTESx3ev9dZU0aOJwXDoKl0xcVqzcK7fI2Csw7qTC5CYjwwLdMF84QrUQWcaoVHjEbyozK+/xVF9n9IQvumukr3XwTtknBDZfbCnrf6Z9kDU/QXf1CtsNPbkAbgzIN8rnVp361n6GLD4yQSTVSrm83iAel7WiREukmnMXgEGj1YFWXi3JtcioY/FYOICdhWwPR1tVwQ43gOR4sIzC2Gl4L1BfYLGMz472Q2pSmUbP0RWe0fI9bTMO/hUV9pNDcfe5S9RKMYn9kRYi1rM+fauSNv0dpIQabU+PQaYVfgzknhO56qaILPFPOlDAZDck5IfQHmZaI7HE8pwsggF/PIikJn4oU0b2Umi1q85NJQS9T6b/IFsUfcoZhY8DSlhd5kXaGv3du3FCZ8Ck19ddEIBfMirO1zC8J3iJeV1Gruqr44epg5V8A==",
        //   wmlink:
        //     "https://firebasestorage.googleapis.com/v0/b/image-cd56a.appspot.com/o/vmimages%2FWM3172021%2065626%20AMbeach-418742_1920.jpg?alt=media&token=91b4f06c-dcca-4849-b54c-e71b6652b9a3",
        // },
        // {
        //   photoId: 81,
        //   photoName: "Stairway",
        //   link:
        //     "3F4ufJwjswayR16SsIiGq9/EU/1oYr9j3Pm4N0oUeT2HpuLt4EgJfwf4tF0vgch/RMiwHNNSwNDQ4mDdqmxYcs7gaDiY+jwTk/B8JIjeY7HPNF+RCv1DADNRRssXYtvWH8FYUpCbSvdWy4fwiRmmZQa9bz+MZ83sxz7Er/wgmURx+NNK/ZqaQvcllK5MUH/rnlB9zBgfEnYpahn3agn6Ow3YR59hqnTuaR83/C3S2x75SScisb3GLZR5ZI6i47wW4J2xoZjS5dzf+FmvmM9e8v6SbekxNZKrPBXydhWDJWMVTEmT9BYq/TIIJ7xdCtTMB1Y94YqmjK4sBdOttwZDHL2fj5HZPNYfM05uYCS80WVi/8N4u+fT2c2BCVV+7DFC7chRDJ4gqYTA93Ow/2bCxoJmqTCz/7F1sjA9HCNFTidNZGGX++XHK9A42Dqn4TDR1yHqntB0GhsuyUfVoX7z5F+PKYlZnvK0TE6yufTFBr0=",
        //   wmlink:
        //     "https://firebasestorage.googleapis.com/v0/b/image-cd56a.appspot.com/o/vmimages%2FWM3172021%2053901%20AMstairway-5551641_1920.jpg?alt=media&token=8db05d7e-9c92-4604-ab81-2f7d6996c702",
        // },
        // {
        //   photoId: 89,
        //   photoName: "Young girl on window",
        //   link:
        //     "3F4ufJwjswayR16SsIiGq9/EU/1oYr9j3Pm4N0oUeT2HpuLt4EgJfwf4tF0vgch/RMiwHNNSwNDQ4mDdqmxYcs7gaDiY+jwTk/B8JIjeY7HPNF+RCv1DADNRRssXYtvWH8FYUpCbSvdWy4fwiRmmZQa9bz+MZ83sxz7Er/wgmURx+NNK/ZqaQvcllK5MUH/rnlB9zBgfEnYpahn3agn6Ow3YR59hqnTuaR83/C3S2x5+rSqOLV+KnBCDNqgG8OVGVADLStXfELNc4Qknyvoe3pgO34mw0cYn/lpLyuOP7DNkmXfRhbitoct8Cd+Jaz9KVMqFd3DoP4DswHQHO4MJqofdkqeIBEVkXxFHafBnN5aCYc0ylHC9hb9cakb+jrT3o0yWDCFmzJVvf2DW0YDKXmuIITtJhJKyE6LMJUfhJxCQDES9L1foVI/OuoNNJxAKpYCGyOqn095yylGfm9MlnQ==",
        //   wmlink:
        //     "https://firebasestorage.googleapis.com/v0/b/image-cd56a.appspot.com/o/vmimages%2FWM3172021%2055425%20AMchild-5578046_1920.jpg?alt=media&token=aa7c387a-10d7-4e6e-adf0-63266aa972b3",
        // },
        // {
        //   photoId: 79,
        //   photoName: "Moutain Goat",
        //   link:
        //     "QnAziIC4h1ZLY3U59d8KCWTRei6c7FhVmNDleKFB6pXpiEWRoXM9TGzwbALWsN5Out73coXAQgf5VW7mrB5I3GnZLE4j3jIGvUUDjcX7HjpAls9PkEpHaM7avgFoaa0ctorpgdjgUZcZw4+TN4EdUZImw1SVB0VQTpT/r6ljhjk1LcdLpLXhb+gqPaZScyM2YZcmiHxHijeQnczg4KZEpT8b2pDVlrfDZUlX1t/pHAnsYlhjvBtxv72HLxw+/SQ2x7fpNxbCG1BG+CY6kT3yxRUSkO/AIHsyOf33XJcdgOC6Nmi6/vft1vL99WN560b8nYooFXHw6/BPyM6q6Jrj5WUINhMG2bK0qtqSTegEiOCD6VN/mVL9MVmtwUM0toKPxQ8GN7/Zz7mnfIDBXMwZYjWOuLRDb6R8BfC5FcD24j1YQCNPvbMoDfJSozVfx2k/Tq9IHhwihmsppwjT5XCOVg==",
        //   wmlink:
        //     "https://firebasestorage.googleapis.com/v0/b/image-cd56a.appspot.com/o/vmimages%2FWM3172021%2053751%20AMgoat-5934811_1920.jpg?alt=media&token=29d9ff86-5d8d-4e18-aff4-15d892e3eb88",
        // },
        // {
        //   photoId: 82,
        //   photoName: "White Wolf",
        //   link:
        //     "QnAziIC4h1ZLY3U59d8KCWTRei6c7FhVmNDleKFB6pXpiEWRoXM9TGzwbALWsN5Out73coXAQgf5VW7mrB5I3GnZLE4j3jIGvUUDjcX7HjpAls9PkEpHaM7avgFoaa0ctorpgdjgUZcZw4+TN4EdUZImw1SVB0VQTpT/r6ljhjk1LcdLpLXhb+gqPaZScyM2YZcmiHxHijeQnczg4KZEpT8b2pDVlrfDZUlX1t/pHAkZZx3dNmIIu6a+mFC+yLz/5CKHFV8aIveQl3xXVA8EQSIWNPzQAHUU7CnvCN09kYdJ4E2UHpgCLHOninf/ZhEg/JQM5erIUyJTzxcPpc5sC+abjKZowN8Reyl1qQ5BqDKgt59dE/sj51zFlAa3qm6pQhClO/qu/UAvyuSfgNKqEhDB3bCLPTXq/DUnBaozEljoMLZrt4Ts8K8tJNGCGn8QK78n/zOgQyysdyo27j/Po8hmB08Dlg5k66U9kmk1pLs=",
        //   wmlink:
        //     "https://firebasestorage.googleapis.com/v0/b/image-cd56a.appspot.com/o/vmimages%2FWM3172021%2053942%20AMarctic-wolf-5961985_1920.jpg?alt=media&token=e4eb08d4-a59b-4d4c-88bf-afb41bb97c6b",
        // },
        // {
        //   photoId: 78,
        //   photoName: "Lonely Cat",
        //   link:
        //     "QnAziIC4h1ZLY3U59d8KCWTRei6c7FhVmNDleKFB6pXpiEWRoXM9TGzwbALWsN5Out73coXAQgf5VW7mrB5I3GnZLE4j3jIGvUUDjcX7HjpAls9PkEpHaM7avgFoaa0ctorpgdjgUZcZw4+TN4EdUZImw1SVB0VQTpT/r6ljhjk1LcdLpLXhb+gqPaZScyM2YZcmiHxHijeQnczg4KZEpT8b2pDVlrfDZUlX1t/pHAmciQghI0TP/PG7v26Y2IN5LKsbdxKLj884fj2RAd2FacL+hd8CrrvG83leNyIR6t6geWr50JBIrkRvvGYyUaRyKxEp8OAM0i7Gn3ooJ72WJEA+/PqGpNIb7LQqHoocRAbvBMf5TkZ6eCTUa05x4RNI+SqD/smAZHluDoBQxcd0B/e/fmsHZDNqO5xwaHc7zZWT8YRUAFYwYgdbndQt9Z/F550Hx1haRR/BM4AMVst+KA==",
        //   wmlink:
        //     "https://firebasestorage.googleapis.com/v0/b/image-cd56a.appspot.com/o/vmimages%2FWM3172021%2053614%20AMcat-5732087_1920.jpg?alt=media&token=300ca3ad-1ce1-4402-8ed8-97b4bec81c35",
        // },
        // {
        //   photoId: 98,
        //   photoName: "Winter landscape",
        //   link:
        //     "UBCuozAJtZNqNP5Og96/3uQ0tHm8m2jpgKnsbTESx3ev9dZU0aOJwXDoKl0xcVqzcK7fI2Csw7qTC5CYjwwLdMF84QrUQWcaoVHjEbyozK+/xVF9n9IQvumukr3XwTtknBDZfbCnrf6Z9kDU/QXf1CtsNPbkAbgzIN8rnVp361n6GLD4yQSTVSrm83iAel7WiREukmnMXgEGj1YFWXi3JtcioY/FYOICdhWwPR1tVwTCprRcGLZYo471f0b297HJe//x2h0jm3yC6uv8IXEtzhmJFHZLOxlatGo/ur/JB/ACjfBokg11CKCLT455dNSUyj8MC2uOEG65Qt3gk3F/m3zlA/kyR/WQsByrbB0Jk8U3Cu4gJNdD9k8Q+rALIxfapJS36hWEKZievLmBVWcb7izPBC9bPvbjD4Hj6FKAvPtI/GOXCsAYXEEFLKOKb+04ygfGT+in82sDyCedVcXciqXHSDCWiTglD0pz1xQZGnrp+f+ymNhuJGuoEYps2Pe4",
        //   wmlink:
        //     "https://firebasestorage.googleapis.com/v0/b/image-cd56a.appspot.com/o/vmimages%2FWM3172021%2065834%20AMwinter-landscape-2571788_1920.jpg?alt=media&token=34ec744d-05ef-4953-97f3-3297b9d8ce82",
        // },
        // {
        //   photoId: 83,
        //   photoName: "Stork",
        //   link:
        //     "3F4ufJwjswayR16SsIiGq9/EU/1oYr9j3Pm4N0oUeT2HpuLt4EgJfwf4tF0vgch/RMiwHNNSwNDQ4mDdqmxYcs7gaDiY+jwTk/B8JIjeY7HPNF+RCv1DADNRRssXYtvWH8FYUpCbSvdWy4fwiRmmZQa9bz+MZ83sxz7Er/wgmURx+NNK/ZqaQvcllK5MUH/rnlB9zBgfEnYpahn3agn6Ow3YR59hqnTuaR83/C3S2x43ACGPV3l/Rnin2mElCH43HXPbl8Tj5FldNnAgyQuLvxHkTG0672yIAjdC72TP0LGSaxcZysgQuaLRy1g2xOKlRe93/FwEfpZ1j+ct4XN2UD7P+NOB3vCL1S/TPl6ka0krhRQ7efMo9o5U6kIB92N0H2+nT393T0lcuZVvNh/vfuD0ZgyzT3cEVjluIxIBpy7m4cldJyLr0tGOfiQ5TWDGFCEY+PvX+yXxdVMsJ+uhuA==",
        //   wmlink:
        //     "https://firebasestorage.googleapis.com/v0/b/image-cd56a.appspot.com/o/vmimages%2FWM3172021%2054118%20AMstork-5828727_1920.jpg?alt=media&token=5f009946-e2e8-4c47-85f6-1f6e7fba60d3",
        // },
      ],
    };
  },

  methods: {
    addToCart() {
      this.$store.dispatch("addPhotoToCart", {
        image: this.image,
      });
    },
    followUser() {
      // console.log(user.userId)
      console.log(this.$store.state.image.userId);
      axios({
        method: "POST",
        url: "https://imago.azurewebsites.net/api/v1/Follow/Follow",
        data: {
          userId: JSON.parse(this.$store.state.user).userId,
          followUserId: this.$store.state.image.userId,
        },
      }).then((response) => {
        console.log(response.data);
      });
    },
    getPhotosByCategory(badge){
       axios({
        method: "GET",
        url: "https://imago.azurewebsites.net/api/v1/Photo/GetByCategory/?catName=" + badge.categoryName +"&photoId=" + this.photoId + "" ,
      }).then((response) => {
        this.testPicture = response.data
      });
    }
    
  },

  computed: {
    image() {
      return this.$store.state.image;
    },
  },

  mounted() {
    console.log(this.photoId);
    this.$store.dispatch("getImage", this.photoId);
     
      
     axios({
        method: "GET",
        url:
          "https://imago.azurewebsites.net/api/v1/Photo/CheckBoughtPhoto?id=" +
         this.photoId +
          "&userId=" +
          JSON.parse(this.$store.state.user).userId,
      }).
      then(response => {
        this.alreadyBought = response.data
      }

      ) 
      
  },

  created() {
    this.photoId = this.$route.params.photoId;
  },
};
</script>

<style lang="scss" scoped>
.imageInfo {
  display: flex;
  justify-content: center;
}
.photo-aria {
  width: 100%;
}
.modalStyle {
  width: 95%;
  position: fixed;
  z-index: 100;
  background-color: white;
  padding-top: 1.5rem;
  padding-left: 1.5rem;
}
.ct-example-row {
  position: relative;
  top: 3rem;
  padding: 1.5rem;
}
.badgeTagModal {
  margin-bottom: 0.5rem;
  font-size: 16px !important;
}
.img-fit {
  width: 100%;
  height: 15vw;
  object-fit: cover;
  margin-bottom: 15px;
  border-radius: 20px;
}
.closeModal {
  font-size: 23px;
  float: right;
  position: relative;
  right: 1.5rem;
  top: 0.5rem;
  cursor: pointer;
}
::v-deep {
  .modal-body {
    max-height: 35rem;
    overflow-y: scroll;
    padding: 0;
  }
}
</style>
