<template>
  <div class="content pt-0">
    <div :class="{ 'scrolled': scrolled }" class="sticky top-0 z-10 bg-white">
      <div :class="{ 'border-b-2 border-blue-300': tab == 'customize' }" class="border-b-2 border-gray-400 pb-3 mb-6 flex pr-5">
        <button v-if="tab == 'customize'" class="link ml-auto rounded-lg px-4 py-1 mt-5 hover:bg-gray-200 uppercase text-gray-400 hover:text-gray-900" @click="customizeDashboard">
          <span class="fe fe-check" /> Done
        </button>
        <button v-else class="link ml-auto rounded-lg px-4 py-1 mt-5 hover:bg-gray-200 uppercase text-gray-400 hover:text-gray-900" @click="tab = 'customize'">
          <span class="fe fe-edit" /> Customize dashboard
        </button>
      </div>
    </div>

    <!--Accounts-->
    <section class="flex mt-8 slideIn px-10">
      <div class="rounded-lg md:block md:w-2/5 shadow bg-white px-6 py-4 mr-8">
        <h2 class="text-gray-600 text-2xl font-semibold mb-5">
          Overall Revenue Performance
        </h2>
        <div class="p-5">
          <ChartDoughnut v-if="showLine" :height="200" :chartdata="OverallRevenuePerformance.data" :options="OverallRevenuePerformance.options" />
        </div>
      </div>
      <div class="rounded-lg w-full lg:w-3/5 shadow bg-white px-6 py-4">
        <div class="p-5">
          <ChartHorizontalBar
            v-if="showLine"
            :height="120"
            :chartdata="TodaysRevenueCollection.data"
            :options="TodaysRevenueCollection.options"
          />
        </div>
      </div>
    </section>

    <div v-if="tab == 'customize'">
      <div class="grid grid-cols-2 gap-3 px-1 mt-3">
        <div
          v-for="metric in allMetrics"
          :key="metric.id"
          class="font-semibold rounded flex items-center py-2 px-4 bg-white shadow-sm"
        >
          <span type="text" class="text-lg text-gray-600">{{ metric.priority }}</span>
          <span type="text" class="text-lg text-gray-600">{{ metric.title }}</span>
          <BaseToggleButton :key="metric.id" v-model="metric.visible" label="" class="ml-auto" />
        </div>
      </div>
    </div>
    <Draggable
      v-else
      v-model="allMetrics"
      v-bind="dragOptions"
      class="grid grid-cols-2 gap-3 mt-4 px-1"
      handle=".handle"
      @start="onClone($event)"
    >
      <BaseMetric
        v-for="metric in allMetrics"
        :key="metric.id"
        :metric="metric"
      />
    </Draggable>
  </div>
</template>

<script>
import colorLib from '@kurkle/color'
import Draggable from 'vuedraggable'
import { mapGetters, mapActions } from 'vuex'
import BaseMetric from '@/components/dashboard/BaseMetric'
import BaseToggleButton from '@/components/common/BaseToggleButton'

export default {
  components: {
    BaseToggleButton,
    BaseMetric,
    Draggable
  },

  layout: 'accounts',

  middleware: 'authenticated',

  asyncData ({ app, redirect }) {
    // redirect({ path: '/accounts/invoices' })
    const OverallRevenuePerformance = {
      data: {
        labels: ['Room Service', 'Steam & Sauna', 'Food & Beverage'],
        datasets: [
          {
            data: [4, 23, 10]
          }
        ],
        offset: 0,
        borderWidth: 10
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
          animateRotate: true,
          duration: 2000
        },
        tooltips: {
          enabled: true // show tooltips
        },
        cutoutPercentage: 80, // cahrt breadth,
        legend: {
          position: 'left',
          labels: {
            boxWidth: 9,
            usePointStyle: true
          }
        }
      }
    }

    const TodaysRevenueCollection = {
      data: {
        labels: ['Room Service', 'Steam & Sauna', 'Food & Beverage'],
        datasets: [
          {
            label: 'Projection',
            data: [140, 45, 120],
            borderColor: colorLib('rgb(50,50,50)'),
            backgroundColor: colorLib('rgb(50,50,50)').alpha(0.5).rgbString()
          },
          {
            label: 'Cash',
            data: [140, 45, 110],
            borderColor: colorLib('rgb(250,50,50)'),
            backgroundColor: colorLib('rgb(250,50,50)').alpha(0.5).rgbString()
          },
          {
            label: 'Cash Equivalent',
            data: [0, 0, 10],
            borderColor: colorLib('rgb(50,250,50)'),
            backgroundColor: colorLib('rgb(50,250,50)').alpha(0.5).rgbString()
          }
        ],
        barThickness: 30
      },

      options: {
        plugins: {
          colorschemes: {
            scheme: 'brewer.SetTwo3'
          }
        },
        legend: {
          display: true,
          position: 'top',
          text: 'xxxxxx'
        },
        title: {
          display: true,
          text: "Today's Revenue Collection"
        }
      }
    }

    const allMetrics = [
      {
        id: 1,
        title: 'Clients Today',
        value: 6,
        type: 'value',
        increase: false,
        percentage: 32.03,
        visible: true
      },
      {
        id: 2,
        title: 'Orders Today ',
        value: 10,
        type: 'value',
        increase: true,
        percentage: 41.90,
        visible: true
      },
      {
        id: 3,
        title: 'Revenue Today',
        value: 25,
        type: 'value',
        increase: true,
        percentage: 12.90,
        visible: true
      },
      {
        id: 4,
        title: 'Clients Metric',
        value: 40,
        type: 'trend',
        visible: true,
        trendData: {
          labels: ['April 1st', 'April 2nd', 'April 3rd', 'April 4th', 'April 5th', 'April 6th', 'April 7th'],
          datasets: [
            {
              label: 'Customers',
              backgroundColor: 'rgb(245, 250, 253)',
              borderColor: 'rgb(83,162,225)',
              pointBackgroundColor: 'rgba(83, 162, 225, 0.7)',
              borderWidth: 2,
              lineTension: 0,
              data: [30, 42, 26, 40, 43, 32, 38]
            }
          ]
        }
      },
      {
        id: 5,
        title: 'Clients Total',
        value: 0,
        type: 'partition',
        total: 560,
        partitionData: {
          labels: ['Room Service', 'Steam & Sauna', 'Food & Beverage'],
          datasets: [
            {
              data: [4, 23, 10]
            }
          ],
          offset: 0,
          borderWidth: 10
        }
      },
      {
        id: 6,
        title: 'Clients Today',
        value: 0,
        type: 'partition',
        total: 160,
        partitionData: {
          labels: ['Room Service', 'Steam & Sauna', 'Food & Beverage'],
          datasets: [
            {
              data: [4, 23, 10]
            }
          ],
          offset: 0,
          borderWidth: 10
        }
      }
    ]

    return { OverallRevenuePerformance, TodaysRevenueCollection, allMetrics }
  },

  data () {
    return {
      showLine: false,
      scrolled: false,
      tab: '',
      dragOptions: {
        animation: 500,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
        forceFallback: true
      },
      dragging: false
    }
  },

  computed: {
    ...mapGetters({ OverallRevenuePerformance: 'metrics/getOverallRevenuePerformance', TodaysRevenueCollection: 'metrics/getTodaysRevenueCollection', allMetrics: 'metrics/getAllMetrics' })
  },

  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  },

  mounted () {
    this.showLine = true // showLine will only be set to true on the client. This keeps the DOM-tree in sync.
  },

  methods: {
    ...mapActions({}),

    handleScroll () {
      this.scrolled = window.pageYOffset > 0 // when the user scrolls, check the pageYOffset
    },
    onClone (event) {
      const itemCanvas = event.item.getElementsByTagName('canvas')[0]
      const cloneCanvas = document
        .getElementsByClassName('sortable-drag')[0]
        .getElementsByTagName('canvas')[0]

      if (cloneCanvas) {
        const cloneCanvasContext = cloneCanvas.getContext('2d')
        cloneCanvasContext.drawImage(itemCanvas, 0, 0)
      }
    },
    customizeDashboard () {
      this.tab = ''
    }
  }

}
</script>

<style>
.scrolled {
  @apply pt-3 shadow-lg bg-white px-4 rounded-b;
}
</style>
