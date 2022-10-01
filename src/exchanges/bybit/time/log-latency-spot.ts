import { SpotClient } from 'bybit-api';

const client = new SpotClient();

/**
 * Simple script to log latency estimates for making an API call to bybit's time endpoint
 */
async function start() {
  const clientTimeReqStart = Date.now();
  const serverTime = await client.getServerTime();
  const clientTimeReqEnd = Date.now();
  const serverTimeNow = new Date(Number(serverTime.time_now) * 1000).getTime();

  console.log('time: ', {
    // Time the request was made
    clientTimeReqStart,
    // Time the response was received
    clientTimeReqEnd,
    // Estimate for how long it took to make an API call to the time endpoint and to get a reply
    clientTimeReqDiff: clientTimeReqEnd - clientTimeReqStart,
    // Time returned by the server
    serverTimeNow,
    // Estimated latency from request start time to server reply
    serverTimeStartDiff: serverTimeNow - clientTimeReqStart,
    // Estimated latency from server reply to reply received
    serverTimeEndDiff: clientTimeReqEnd - serverTimeNow,
  });

  process.exit(0);
}

start();
