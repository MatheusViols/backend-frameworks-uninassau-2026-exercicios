const os = require('os');

class MetricsCollector {
  constructor() {
    this.requestCount = 0;
    this.startTime = Date.now();
  }

  incrementRequests() {
    this.requestCount++;
  }

  getUptime() {
    return {
      process: process.uptime(),
      system: os.uptime()
    };
  }

  getMemory() {
    const used = process.memoryUsage();
    const total = os.totalmem();
    const free = os.freemem();
    
    return {
      process: {
        rss: this.formatBytes(used.rss),
        heapTotal: this.formatBytes(used.heapTotal),
        heapUsed: this.formatBytes(used.heapUsed),
        external: this.formatBytes(used.external)
      },
      system: {
        total: this.formatBytes(total),
        free: this.formatBytes(free),
        used: this.formatBytes(total - free),
        percentage: ((total - free) / total * 100).toFixed(2) + '%'
      }
    };
  }

  getCPU() {
    const cpus = os.cpus();
    const loadavg = os.loadavg();
    
    return {
      count: cpus.length,
      model: cpus[0].model,
      speed: cpus[0].speed,
      loadAverage: {
        '1min': loadavg[0].toFixed(2),
        '5min': loadavg[1].toFixed(2),
        '15min': loadavg[2].toFixed(2)
      }
    };
  }

  getMetrics() {
    return {
      uptime: this.getUptime(),
      memory: this.getMemory(),
      cpu: this.getCPU(),
      requests: {
        total: this.requestCount,
        perSecond: (this.requestCount / process.uptime()).toFixed(2)
      }
    };
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}

module.exports = new MetricsCollector();
