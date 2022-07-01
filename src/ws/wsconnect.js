const config = {
  wshost: "wss://api-pub.bitfinex.com/ws/2",
};

let connecting;
let connected;
let socket;

const filterProperties = (array) => {
  return [array[6], array[4], array[5], array[8], array[9]];
};

export const socketConnect = ({
  connectionStatus,
  setConnectionStatus,
  setBtcusd,
  setLtcusd,
  setLtcbtc,
  setEthusd,
  setEthbtc,
}) => {
  if (!connecting && !connected) {
    socket = new WebSocket(config.wshost);
  }

  if (!connectionStatus) {
    socket.close();
  }

  if (connecting || connected) {
    return;
  }

  connecting = true;

  socket.onopen = () => {
    console.log("%cWS opened.", "color:green");
    setConnectionStatus(true);
    connecting = false;
    connected = true;
    socket.send(
      JSON.stringify({
        event: "subscribe",
        channel: "ticker",
        symbol: "tBTCUSD",
      })
    );
    socket.send(
      JSON.stringify({
        event: "subscribe",
        channel: "ticker",
        symbol: "tLTCUSD",
      })
    );
    socket.send(
      JSON.stringify({
        event: "subscribe",
        channel: "ticker",
        symbol: "tLTCBTC",
      })
    );
    socket.send(
      JSON.stringify({
        event: "subscribe",
        channel: "ticker",
        symbol: "tETHUSD",
      })
    );
    socket.send(
      JSON.stringify({
        event: "subscribe",
        channel: "ticker",
        symbol: "tETHBTC",
      })
    );
  };

  let channel0, channel1, channel2, channel3, channel4;

  socket.onmessage = (msg) => {
    const data = JSON.parse(msg.data);

    if (data.event === "subscribed" && data.pair === "BTCUSD") {
      channel0 = data.chanId;
    }
    if (data.event === "subscribed" && data.pair === "LTCUSD") {
      channel1 = data.chanId;
    }
    if (data.event === "subscribed" && data.pair === "LTCBTC") {
      channel2 = data.chanId;
    }
    if (data.event === "subscribed" && data.pair === "ETHUSD") {
      channel3 = data.chanId;
    }
    if (data.event === "subscribed" && data.pair === "ETHBTC") {
      channel4 = data.chanId;
    }

    if (data[0] === channel0) {
      Array.isArray(data[1]) && setBtcusd(filterProperties(data[1]));
    }
    if (data[0] === channel1) {
      Array.isArray(data[1]) && setLtcusd(filterProperties(data[1]));
    }
    if (data[0] === channel2) {
      Array.isArray(data[1]) && setLtcbtc(filterProperties(data[1]));
    }
    if (data[0] === channel3) {
      Array.isArray(data[1]) && setEthusd(filterProperties(data[1]));
    }
    if (data[0] === channel4) {
      Array.isArray(data[1]) && setEthbtc(filterProperties(data[1]));
    }
  };

  socket.onclose = () => {
    console.log("%cWS closed.", "color:red");
    connecting = false;
    connected = false;
    setConnectionStatus(false);
  };
};
