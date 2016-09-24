const INTERVAL = 5000;
const URL = "http://192.168.128.141:2000/status";

function update(){
   //
 var request = new XHLHttpRequest();
 let { spawn } = task;

 request.open("GET",URL, false);
 if(request.status === 200){
     const text = request.responseText;
      console.log(text);
    const body = JSON.parse(text);
    if(body.mode){
      // buzzer on
      spawn(function() {
        const gpio = yield navigator.requestGPIOAccess();
        // https://chirimen.org/docs/en/board_connectors.html
        const buzzer = gpio.ports.get(198);     // LED Anode Pin: CN1 9
        yield buzzer.export("out");
        buzzer.write(1);
      });
    }else{
      spawn(function() {
        const gpio = yield navigator.requestGPIOAccess();
        // https://chirimen.org/docs/en/board_connectors.html
        const buzzer = gpio.ports.get(198);     // LED Anode Pin: CN1 9
        yield buzzer.export("out");
        buzzer.write(0);
      });
    }
  }
  setTimeout(INTERVAL, update); 
}


