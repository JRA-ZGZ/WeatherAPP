class SSEClient {
    constructor(currentEvent, notifyMethod) {
        this.eventSource = new EventSource('/sse');
        this.notifyMethod = notifyMethod;
        this.currentEvent = currentEvent;
        this.handlerEvent = (data) => {
            console.log('Event Received', data);
            try {
                if(data.type === this.currentEvent.toLowerCase()){
                    const parsedData = JSON.parse(data.data);
                    this.notifyMethod(parsedData);
                }
            } catch (e) {
                console.log('Invalid notified data', e);
            }
        }
    }
    init(){
        this.eventSource.addEventListener(this.currentEvent, this.handlerEvent);
        return this;
    }
    keepMeInformed(event) {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(async (ctx) => {
            //Notify to the server I'm still interested
            try {
                ctx.addEvent(event);
                await fetch(
                    `/sse/${event}`, {
                    method: 'PUT'
                });

            } catch (e) {
                console.log('SSE Error', e);
            }

        }, 30000, this);
        return this;
    }
    addEvent(event) {
        if (event !== this.currentEvent) {
            this.eventSource.removeEventListener(this.currentEvent, this.handlerEvent);
            this.currentEvent = event;  
            this.handlerEvent = (data) => {
                console.log('Event Received', data);
                try {
                    if(data.type === this.currentEvent.toLowerCase()){
                        const parsedData = JSON.parse(data.data);
                        this.notifyMethod(parsedData);
                    }

                } catch (e) {
                    console.log('Invalid notified data', e);
                }
            }          
            this.eventSource.addEventListener(this.currentEvent, this.handlerEvent);
        }
        return this;
    }
    close() {
        this.eventSource.removeEventListener(this.currentEvent, this.handlerEvent);
        return this;
    }
}

export default SSEClient; 