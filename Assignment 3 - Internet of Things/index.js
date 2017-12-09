const http = require('http');
const queue = require('./queue');
const queueIterator = require('./queueIterator');

function random(low, high) {
    return Math.random() * (high - low) + low;
}

function numberSource() {
    return random(0, 5);
}

function getSimpleMovingAverage(queue) {
    var val = 0;
    const iterator = new queueIterator(queue);
    while (iterator.hasNext()) {
        val += iterator.next();
    }
    val /= queue.size();
    return val;
}

function sendToEdgeNode(payload) {
    const API_KEY = 'VYNULCYYRUT5J6FN';
    var options = {
        host: 'api.thingspeak.com',
        port: 80,
        path: '/update?api_key='+API_KEY+'&field1=' + encodeURIComponent(payload)
    };

    http.get(options, function (resp) {
        resp.on('data', function (chunk) {
            console.log('sent to thingspeak');
        });
    }).on('error', function (e) {
        console.log("error sending to thingspeak: " + e.message);
    });
}

const readingQueueLength = 10;
const readingQueue = new queue();
var lastMovingAverage = -1;

function processReadingOnIotDevice(number) {
    // add number to queue
    readingQueue.enqueue(number);
    if (readingQueue.size() > readingQueueLength) {
        readingQueue.dequeue();
    }

    const newMovingAverage = getSimpleMovingAverage(readingQueue);
    console.log("Using " + readingQueue.size() + " values for ma: " + newMovingAverage);

    if (Math.abs(lastMovingAverage - newMovingAverage) > 0.5) {
        sendToEdgeNode(newMovingAverage);

        lastMovingAverage = newMovingAverage;
    }
}

setInterval(function () {
    const number = numberSource();
    processReadingOnIotDevice(number);
}, 1000);