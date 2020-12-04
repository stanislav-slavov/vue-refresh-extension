<template>
  <div class="extension">
    <div>
      <p class="spaced-x title">
        Go to page by URL and configure Refresh Interval
      </p>
      <div class="spaced-x">
        <input
          type="number"
          v-model="refreshInSec"
          class="spaced"
          placeholder="Update Refresh Interval"
        />
        <button v-on:click="(updatedRefreshInSec = refreshInSec), stop()">
          Update Refresh Interval
        </button>
      </div>
      <div class="spaced">
        <div>
          <input type="text" v-model="url" placeholder="Enter URL" />
          <button
            v-on:click="(updatedUrl = url), start()"
            :disabled="!isUrlValid && url.length > 0"
          >
            Go
          </button>
        </div>
        <div class="error spaced" v-if="url.length > 0 && !isUrlValid">
          Please enter a valid URL address.
        </div>
      </div>
      <div class="spaced">
        <button v-on:click="paused = !paused">
          {{ paused ? "Resume interval" : "Pause interval" }}
        </button>
        <button v-on:click="stop">Stop interval</button>
      </div>
      <div v-if="interval" class="spaced">
        Will refresh in: {{ updatedRefreshInSec - iteration }}
      </div>
      <div v-if="lastRefresh" class="spaced last-refresh">
        Last refresh: {{ lastRefresh }}
      </div>
      <div v-if="newRefresh" class="spaced new-refresh">
        New refresh: {{ newRefresh }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iteration: 1,
      refreshInSec: 5,
      updatedRefreshInSec: 5,
      interval: null,
      paused: false,
      url: "",
      updatedUrl: "",
      lastRefresh: "",
      newRefresh: "",
    };
  },
  computed: {
    isUrlValid() {
      const check = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
      return check.test(this.url);
    },
  },
  methods: {
    start() {
      this.stop();
      this.refresh();
      this.paused = false;
    },
    stop() {
      clearInterval(this.interval);
      this.interval = null;
      this.iteration = 1;
      this.paused = false;
    },
    refresh() {
      this.$browser.tabs.update({
        url: this.updatedUrl,
      });
      const urlRefreshCountDown = () => {
        if (!this.paused) {
          if (this.iteration >= this.updatedRefreshInSec) {
            this.stop();
            this.refresh();
            const date = new Date();
            date.setSeconds(
              date.getSeconds() + this.updatedRefreshInSec - this.iteration
            );
            this.lastRefresh = this.newRefresh;
            this.newRefresh = date.toLocaleTimeString("en-GB");
            return;
          }
          this.iteration += 1;
        }
      };
      this.interval = setInterval(urlRefreshCountDown, 1000);
    },
  },
};
</script>

<style lang="scss">
.extension {
  width: 300px;
  min-height: 200px;
  text-align: center;
  position: relative;
  font-size: 14px;

  .spaced {
    margin-bottom: 10px;
  }

  .spaced-x {
    margin-bottom: 20px;
  }

  p.spaced-x {
    margin: 0 0 20px 0;
  }

  .error {
    color: red;
  }
}
</style>
