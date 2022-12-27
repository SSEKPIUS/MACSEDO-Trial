export const state = () => ({
  OverallRevenuePerformance: {
    data: {
      labels: [],
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
      cutoutPercentage: 50, // cahrt breadth,
      legend: {
        position: 'left',
        labels: {
          boxWidth: 9,
          usePointStyle: true
        }
      }
    }
  },

  TodaysRevenueCollection: {
    data: {
      labels: [],
      datasets: [],
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
  },

  AllMetrics: []

})

export const getters = {
  getOverallRevenuePerformance: state => state.OverallRevenuePerformance,
  getTodaysRevenueCollection: state => state.TodaysRevenueCollection,
  getAllMetrics: state => state.allMetrics
}

export const actions = {

}

export const mutations = {
  setOverallRevenuePerformance (state, data) {
    state.OverallRevenuePerformance = data
  },

  setTodaysRevenueCollection (state, data) {
    state.TodaysRevenueCollection = data
  },

  setAllMetrics (state, data) {
    state.allMetrics = data
  }
}
