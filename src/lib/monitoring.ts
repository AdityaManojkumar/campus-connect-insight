// Simple monitoring utilities for Prometheus metrics
export interface Metrics {
  http_requests_total: number;
  http_request_duration_seconds: number;
  active_users: number;
  page_views_total: number;
}

class MonitoringService {
  private metrics: Metrics = {
    http_requests_total: 0,
    http_request_duration_seconds: 0,
    active_users: 0,
    page_views_total: 0,
  };

  incrementHttpRequests() {
    this.metrics.http_requests_total++;
  }

  setRequestDuration(duration: number) {
    this.metrics.http_request_duration_seconds = duration;
  }

  setActiveUsers(count: number) {
    this.metrics.active_users = count;
  }

  incrementPageViews() {
    this.metrics.page_views_total++;
  }

  getMetrics(): string {
    return `# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total ${this.metrics.http_requests_total}

# HELP http_request_duration_seconds Duration of HTTP requests
# TYPE http_request_duration_seconds gauge
http_request_duration_seconds ${this.metrics.http_request_duration_seconds}

# HELP active_users Number of active users
# TYPE active_users gauge
active_users ${this.metrics.active_users}

# HELP page_views_total Total number of page views
# TYPE page_views_total counter
page_views_total ${this.metrics.page_views_total}`;
  }
}

export const monitoringService = new MonitoringService(); 