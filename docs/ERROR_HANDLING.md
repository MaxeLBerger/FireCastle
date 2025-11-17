# API Error Handling Guide

## Overview

The FireCastle API provides detailed error information to help diagnose and resolve issues quickly. All error responses follow a consistent format.

## Error Response Format

```json
{
  "error": "User-friendly error message",
  "details": "Detailed technical error description",
  "type": "ERROR_TYPE"
}
```

## Error Types

### 1. API_ERROR
**HTTP Status Codes**: 400, 403, 404, 500, etc. (mirrors Clash of Clans API)

Occurs when the Clash of Clans API returns an error response.

**Common Scenarios**:
- **403 Forbidden**: Invalid API token or IP address not whitelisted
- **404 Not Found**: Clan or player tag does not exist
- **429 Too Many Requests**: Rate limit exceeded

**Example**:
```json
{
  "error": "Failed to fetch clan data",
  "details": "Invalid IP address",
  "type": "API_ERROR"
}
```

**Resolution**:
- For 403 errors: Check that your API token is valid and your server's IP is whitelisted in the Supercell Developer Portal
- For 404 errors: Verify the clan/player tag is correct
- For 429 errors: Reduce request frequency or implement caching

### 2. TIMEOUT
**HTTP Status Code**: 504 Gateway Timeout

Occurs when the Clash of Clans API does not respond within 5 seconds.

**Example**:
```json
{
  "error": "Failed to fetch player data",
  "details": "Request timeout: The Clash of Clans API did not respond in time",
  "type": "TIMEOUT"
}
```

**Resolution**:
- Retry the request after a short delay
- Check Supercell API status
- Consider increasing the timeout if consistently seeing this error

### 3. NETWORK_ERROR
**HTTP Status Code**: 503 Service Unavailable

Occurs when the server cannot establish a connection to the Clash of Clans API.

**Example**:
```json
{
  "error": "Failed to fetch live war status",
  "details": "Network error: Unable to reach the Clash of Clans API",
  "type": "NETWORK_ERROR"
}
```

**Resolution**:
- Check your server's internet connectivity
- Verify DNS resolution is working
- Check if Clash of Clans API is accessible from your network
- Ensure firewall rules allow outbound HTTPS connections

### 4. UNKNOWN
**HTTP Status Code**: 500 Internal Server Error

Occurs for unexpected errors that don't fit other categories.

**Example**:
```json
{
  "error": "Failed to fetch clan stats",
  "details": "Unexpected error occurred",
  "type": "UNKNOWN"
}
```

**Resolution**:
- Check server logs for detailed error information
- Report the issue with logs and steps to reproduce

## Validation Errors

Input validation errors do not include the `details` and `type` fields:

```json
{
  "error": "Player tag is required"
}
```

**HTTP Status Code**: 400 Bad Request

## Frontend Integration

You can use the error type to provide specific user feedback:

```javascript
try {
  const response = await fetch('/api/clan?tag=' + tag);
  const data = await response.json();
  
  if (!response.ok) {
    switch(data.type) {
      case 'API_ERROR':
        if (response.status === 404) {
          alert('Clan not found. Please check the tag.');
        } else if (response.status === 403) {
          console.error('Server configuration error:', data.details);
          alert('Service temporarily unavailable.');
        }
        break;
      case 'NETWORK_ERROR':
        alert('Unable to connect to Clash of Clans API. Please try again later.');
        break;
      case 'TIMEOUT':
        alert('Request timed out. Please try again.');
        break;
      default:
        alert('An error occurred: ' + data.error);
    }
  }
} catch (error) {
  console.error('Request failed:', error);
  alert('Network error. Please check your connection.');
}
```

## Debugging Production Issues

### Common Issues and Solutions

**"Invalid IP address" (403 Error)**
1. Find your server's public IP: `curl https://api.ipify.org`
2. Add this IP to the Clash of Clans API key in the [Supercell Developer Portal](https://developer.clashofclans.com/)
3. If using a proxy or load balancer, whitelist the egress IP, not the server IP

**"Network error: Unable to reach the Clash of Clans API"**
1. Test connectivity: `curl -I https://api.clashofclans.com/v1`
2. Check DNS: `nslookup api.clashofclans.com`
3. Verify firewall rules allow outbound HTTPS (port 443)

**Requests timing out consistently**
1. Check network latency: `ping api.clashofclans.com`
2. Consider using a closer server location
3. Increase timeout in `src/utils/apiHelper.js` if necessary

## Monitoring

Monitor error types in your logs to detect patterns:

```bash
# Count errors by type
grep "ERROR:" logs/error.log | grep -o "type: [A-Z_]*" | sort | uniq -c
```

Key metrics to track:
- **NETWORK_ERROR rate**: May indicate infrastructure issues
- **TIMEOUT rate**: May indicate API performance degradation
- **API_ERROR 403**: Indicates authentication/authorization problems
- **API_ERROR 404**: May indicate invalid data from users
