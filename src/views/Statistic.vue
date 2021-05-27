<template>
  <div class="container container-lg">
    <tabs fill class="flex-column flex-md-row">
      <card shadow>
        <tab-pane title="Total Purchases for the month">
          <div class="center">
            <date-picker
              class="chartDate"
              v-model="value"
              type="date"
              range
              placeholder="Select date range"
              :disabled-date="(date) => date >= new Date()"
            ></date-picker>
            <base-button outline type="primary" class="ml-3" @click="onReload">Reload Chart</base-button>
          </div>
          <line-chart :data="lineone"></line-chart>
        </tab-pane>
        <tab-pane title="Total revenue by month">
          <div class="center">
            <date-picker
              class="chartDate"
              v-model="value"
              type="date"
              range
              placeholder="Select date range"
              :disabled-date="(date) => date >= new Date()"
            ></date-picker>
            <base-button outline type="primary" class="ml-3" @click="onReload">Reload Chart</base-button>
          </div>
          <line-chart :data="linetwo"></line-chart>
        </tab-pane>
        <tab-pane title="Photo status">
          <div class="pietop">
            <pie-chart :data="chartData"></pie-chart>
          </div>
          <div class="center">{{str}}</div>
        </tab-pane>
      </card>
    </tabs>
  </div>
</template>

<script>
import ImageCard from './ImageCard';
import axios from 'axios';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import Tabs from '@/components/Tabs/Tabs.vue';
import TabPane from '@/components/Tabs/TabPane.vue';

export default {
  components: {
    Tabs,
    TabPane,
    ImageCard,
    DatePicker,
  },
  data() {
    return {
      value: [],
      lineone: null,
      linetwo: null,
      chartData: [],
      str: '',
      user: JSON.parse(window.localStorage.getItem('user')),
    };
  },
  computed: {
    images() {
      return this.$store.state.approved_images;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    onReload() {
      let dt = {
        startDate: this.value[0],
        endDate: this.value[1],
        userId: this.user.userId,
      };
      axios
        .post(
          'https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetSellPhotoStatistic',
          dt
        )
        .then((response) => {
          (this.lineone = [
            {
              name: 'Total Photo',
              data: JSON.parse(JSON.stringify(response.data[0])),
            },
          ]),
            (this.linetwo = [
              {
                name: 'Total Amount',
                data: JSON.parse(JSON.stringify(response.data[1])),
              },
            ]);
          (response.data[0]);
        })
        .catch((error) => {
          (error);
        });
    },
  },
  mounted() {
    var x = new Date();
    this.value.push(x);
    x.setDate(1);
    x.setMonth(x.getMonth() - 3);

    var y = new Date();
    this.value.push(y);

    let user = this.user;
    (user.userId);
    axios
      .get(
        'https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetPhotoStatusStatistic/' +
          user.userId
      )
      .then((response) => {
        this.chartData = {
          'Approved Photo': response.data.approvedPhoto,
          'Denied Photo': response.data.deniedPhoto,
          'Pending Photo': response.data.pendingPhoto,
        };
        var a = parseInt(response.data.approvedPhoto);
        var t = parseInt(response.data.deniedPhoto) + a;
        var r = ~~((a/t)*100);
        this.str = "You have " + response.data.approvedPhoto + " photos approved, " + response.data.deniedPhoto + " denied photos and "
          + response.data.pendingPhoto + " pending approval. Your photo approval rate is " + r + "%.";
          (this.str);
      })
      .catch((error) => {
        (error);
      });
    let dt = {
      startDate: this.value[0],
      endDate: this.value[1],
      userId: this.user.userId,
    };
    axios
      .post(
        'https://capstoneprojectapi20210418160622.azurewebsites.net/api/v1/User/GetSellPhotoStatistic',
        dt
      )
      .then((response) => {
        (this.lineone = [
          {
            name: 'Total Photo',
            data: JSON.parse(JSON.stringify(response.data[0])),
          },
        ]),
          (this.linetwo = [
            {
              name: 'Total Amount',
              data: JSON.parse(JSON.stringify(response.data[1])),
            },
          ]);
        (response.data[0]);
      })
      .catch((error) => {
        (error);
      });
  },
};
</script>

<style lang="scss">
#app .chartDate .mx-input {
  display: block;
  width: 100%;
  height: calc(2.75rem + 2px);
  padding: 0.625rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #8898aa;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #cad1d7;
  border-radius: 0.25rem;
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
</style>
<style>
.pietop {
  margin-top: 2%;
}
.button {
  height: 34px;
}
.center {
  margin-top: 2%;
  text-align: center;
}
.linechartkick {
  margin-left: 10%;
  width: 80%;
}
.date {
  margin-right: 5%;
}
.content {
  margin-top: 5%;
}
</style>
