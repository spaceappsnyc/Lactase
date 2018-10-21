const net = require('net');

const connection = {
    connect: (onConnected) => {
        this._client = net.createConnection({ port: 8000 }, () => {
            console.log('Connected to OpenSpace backend');
            onConnected();
        });

        this._client.on('data', (data) => {
            const messageObject = JSON.parse(data.toString());
            if (messageObject.topic !== undefined) {
                this._callbacks[messageObject.topic](messageObject.payload);
            }
        });

        this._client.on('end', () => {
          console.log('Disconnected from OpenSpace');
        });

        this._callbacks = {};
        this._nextTopicId = 0;
    },

    disconnect: () => {
        this._client.end();
    },

    startTopic: (type, payload, callback) => {
        const topic = this._nextTopicId++;
        const messageObject = {
            topic: topic,
            type: type,
            payload: payload
        };
        this._callbacks[topic] = callback || function() {};
        this._client.write(JSON.stringify(messageObject) + "\n");
        return topic;
    },

    talk: (topic, payload) => {
        const messageObject = {
            topic: topic,
            payload: payload
        };
        this._client.write(JSON.stringify(messageObject) + "\n");
    }
}

connection.connect(() => {

var delay = 500
// pause and setup scene

setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.time.togglePause();'}); console.log('1') }, delay);
var isodate = process.argv[2] // 2018-11-27
var lat = process.argv[3] // 64.125614
var lon = process.argv[4] // -21.914953
setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.time.setTime("' + isodate + '");'}); console.log('0') }, delay);
setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.globebrowsing.goToGeo(' + lat + ', ' + lon + ', 8000000);'}); console.log('0') }, delay);

var delay += 3000
setTimeout(() => {connection.startTopic('luascript', {script: "openspace.setPropertyValueSingle('Scene.MilkyWay.renderable.Opacity', 1.000000);"}); }, delay);
setTimeout(() => {connection.startTopic('luascript', {script: "openspace.setPropertyValue('Scene.*Trail.renderable.Enabled', false);"}); }, delay);

setTimeout(() => {connection.startTopic('luascript', {script: "openspace.setPropertyValueSingle('Scene.Earth.RenderableGlobe.Layers.NightLayers.Earth_at_Night_Temporal.Enabled', true);"}); console.log('2') }, delay);
setTimeout(() => {connection.startTopic('luascript', {script: "openspace.setPropertyValueSingle('Scene.Earth.RenderableGlobe.Layers.NightLayers.Earth_at_Night_2012.Enabled', false);"}); console.log('3') }, delay);
setTimeout(() => {connection.startTopic('luascript', {script: "openspace.setPropertyValueSingle('Scene.Earth.RenderableGlobe.Layers.NightLayers.Earth_at_Night_Temporal.BlendMode', 4);"}); console.log('4') }, delay);
setTimeout(() => {connection.startTopic('luascript', {script: "openspace.setPropertyValueSingle('Scene.Earth.RenderableGlobe.Layers.ColorLayers.ESRI_VIIRS_Combo.Enabled', false);"})});
setTimeout(() => {connection.startTopic('luascript', {script: "openspace.setPropertyValueSingle('Scene.Earth.RenderableGlobe.Layers.ColorLayers.ESRI_World_Imagery.Enabled', true);"})});


setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.time.togglePause();'}); console.log('8') }, delay); // resume
setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.time.setDeltaTime(360);'}); console.log('9') }, delay);
delay += 1000*2;
setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.time.setDeltaTime(7200);'}); console.log('7') }, delay);
// await sleep();
delay += 1000*12*2
setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.time.setDeltaTime(360);'}); console.log('9') }, delay);
delay += 1000*2;
setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.time.togglePause();'}); console.log('10') }, delay);
delay += 1000*1;
setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.time.setDeltaTime(-360);'}); console.log('11') }, delay);
setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.time.togglePause();'}); console.log('12') }, delay); // resume
delay += 1000*2;
setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.time.setDeltaTime(-7200);'}); console.log('13') }, delay);
delay += 1000*12*2;
setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.time.setDeltaTime(-360);'}); console.log('14') }, delay);
delay += 1000*1;
setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.time.togglePause();'}); console.log('8') }, delay); 

delay += 1000*1;
setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.time.togglePause();'}); console.log('8') }, delay); // resume
setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.time.setDeltaTime(360);'}); console.log('9') }, delay);
delay += 1000*2;
setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.time.setDeltaTime(7200);'}); console.log('7') }, delay);
// await sleep();
delay += 1000*12*2
setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.time.setDeltaTime(360);'}); console.log('9') }, delay);
delay += 1000*2;
setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.time.togglePause();'}); console.log('10') }, delay);
delay += 1000*1;
setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.time.setDeltaTime(-360);'}); console.log('11') }, delay);
setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.time.togglePause();'}); console.log('12') }, delay); // resume
delay += 1000*2;
setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.time.setDeltaTime(-7200);'}); console.log('13') }, delay);
delay += 1000*12*2;
setTimeout(() => {connection.startTopic('luascript', {script: 'openspace.time.setDeltaTime(-360);'}); console.log('14') }, delay);
delay += 1000*3;
setTimeout(() => {connection.disconnect();  console.log('15')}, delay);
});