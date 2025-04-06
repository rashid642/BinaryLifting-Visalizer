export class Logger {
    constructor(logContainerId) {
      this.logContainer = document.getElementById(logContainerId);
    }
  
    log(message) {
      const entry = document.createElement('div');
      entry.textContent = message;
      this.logContainer.appendChild(entry);
      this.logContainer.scrollTop = this.logContainer.scrollHeight;
    }
  
    clear() {
      this.logContainer.innerHTML = '';
    }
  }
  