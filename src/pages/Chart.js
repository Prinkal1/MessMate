import {
    Chart,
    CategoryScale,   // This is what registers the 'category' scale
    LinearScale,
    BarElement,       // If you're using bar charts
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  
  // Register the components (including the 'category' scale)
  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  // Now you can use the 'category' scale in your chart configuration
  const config = {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April'],
      datasets: [{
        label: 'Sales',
        data: [30, 50, 70, 90],
      }]
    },
    options: {
      scales: {
        x: {
          type: 'category', // This requires the CategoryScale to be registered
        }
      }
    }
  };
  
  const myChart = new Chart(document.getElementById('myChart'), config);
  