# PerfAnalytic
<p align="center"><a href="#" target="_blank" rel="noopener noreferrer">
<img width="550" src="https://github.com/barisesen/perfanalytic-api/raw/master/doc/logo.png"></a></p>

The application takes performance data from the browser and processes it. It shows the data it processes in the management panel.


Client application that sends to API using performance api: [client]()

React application visualizing the data: [Dashboard]()


## Installation
```
git clone git@github.com:barisesen/perfanalytic-api.git
cd perfanalytic-api 
docker-compose up -d
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
