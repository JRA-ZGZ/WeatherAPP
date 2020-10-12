class SSEClient {
    constructor(currentEvent, notifyMethod) {
        this.eventSource = new EventSource('/sse');
        this.notifyMethod = notifyMethod;
        this.currentEvent = currentEvent;
        this.handlerEvent = (data) => {
            console.log('Event Received', data);
            try {
                const parsedData = JSON.parse(data.data);
                this.notifyMethod(parsedData);
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
        this.interval = setInterval(async () => {
            //Notify to the server I'm still interested
            try {
                this.addEvent(event);
                await fetch(
                    `/sse/${event}`, {
                    method: 'PUT'
                });

            } catch (e) {
                console.log('SSE Error', e);
            }

        }, 10000);
        return this;
    }
    addEvent(event) {
        if (event !== this.currentEvent) {
            this.eventSource.removeEventListener(this.currentEvent, this.handlerEvent);
            this.handlerEvent = (data) => {
                console.log('Event Received', data);
                try {
                    const parsedData = JSON.parse(data.data);
                    this.notifyMethod(parsedData);
                } catch (e) {
                    console.log('Invalid notified data', e);
                }
            }
            this.currentEvent = event;
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