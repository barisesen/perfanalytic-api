# PerfAnalytic
<p align="center"><a href="#" target="_blank" rel="noopener noreferrer">
<img width="550" src="https://github.com/barisesen/perfanalytic-api/raw/master/doc/logo.png"></a></p>

Demo Api Url: https://perfanalytic.herokuapp.com/
Demo Dashboard Url: https://perfanalytic-dashboard.herokuapp.com/

The application takes performance data from the browser and processes it. It shows the data it processes in the management panel.


Client application that sends to API using performance api: [client]()

React application visualizing the data: [Dashboard](https://github.com/barisesen/perfanalytic-dashboard)

## Installation
```
git clone git@github.com:barisesen/perfanalytic-api.git
cd perfanalytic-api 
docker-compose up -d
```

## Client Usage Example
```
<script>
    window.addEventListener('load', function() {
        var perf = new PerfAnalytics('https://perfanalytic.herokuapp.com/metrics', performance);
    })
</script>
```

## Test Covarage
![](/doc/covarage.png)
```
yarn test
```
## Load Test
![](/doc/loadtest.png)
```
npx loadtest -c 10 --rps 200 --data '{"ttfb": 1,"fcp": 1,"dom_load": 3,"window_load": 2}' -T 'application/json' -m POST  http://localhost:3000/metrics
```
## TODO
* Grouping incoming performance data in minutes.
