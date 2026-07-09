A **URL Shortener** is a classic project, but **most people build only the basic version**. That won't impress an interviewer with 3.5 years of experience.

Instead, build an **Enterprise URL Shortener Platform**—think of it as a simplified version of Bitly or Rebrandly. This lets you demonstrate distributed systems, caching, analytics, security, and system design.

---

# Project: Enterprise URL Shortener

## Problem Statement

Users can shorten long URLs like:

```text
https://www.amazon.in/Apple-iPhone-17-Pro-Max-256GB-Black-Titanium/dp/B0XXXXXX?ref=abc123&campaign=summer_sale
```

into:

```text
https://go.bhomik.dev/aB3xK9
```

When someone visits the short URL, they are redirected instantly while analytics are collected in the background.

---

# Tech Stack

| Layer            | Technology                                |
| ---------------- | ----------------------------------------- |
| Backend          | NestJS                                    |
| Database         | PostgreSQL                                |
| Cache            | Redis                                     |
| Queue            | RabbitMQ                                  |
| ORM              | Prisma                                    |
| Storage          | S3-compatible storage (QR codes, exports) |
| Authentication   | JWT                                       |
| API Docs         | Swagger                                   |
| Monitoring       | Prometheus + Grafana                      |
| Containerization | Docker                                    |

---

# Core Modules

## 1. Authentication

* Register
* Login
* Refresh Token
* Forgot Password
* Email Verification
* OAuth (Google)

---

## 2. URL Management

Users can

* Create URL
* Update URL
* Delete URL
* Enable/Disable URL
* Archive URL

---

## 3. Custom Alias

Instead of

```
abc123
```

allow

```
/resume

/portfolio

/github

/youtube
```

---

## 4. QR Code Generation

Every URL automatically generates

```
QR Code

↓

Download PNG

↓

Download SVG
```

---

## 5. URL Expiration

```
Expires after

1 day

7 days

30 days

Never
```

---

## 6. Password Protected Links

```
Visit URL

↓

Password Required

↓

Redirect
```

---

## 7. Click Limit

```
Maximum Clicks

100

↓

Auto Disable
```

---

## 8. Device Analytics

Collect

* Desktop
* Mobile
* Tablet

---

## 9. Browser Analytics

Collect

* Chrome
* Firefox
* Safari
* Edge

---

## 10. Operating System Analytics

Collect

* Windows
* Linux
* macOS
* Android
* iOS

---

## 11. Geographic Analytics

Store

* Country
* State
* City
* Timezone

---

## 12. Referrer Analytics

Know where visitors came from

```
Google

LinkedIn

Twitter

Facebook

GitHub

Direct
```

---

## 13. UTM Campaign Builder

Marketing users can create

```
utm_source

utm_medium

utm_campaign

utm_term

utm_content
```

---

## 14. Bulk URL Creation

Upload CSV

```
1000 URLs

↓

Generate

1000 Short URLs
```

---

## 15. Team Workspace

```
Organization

↓

Members

↓

Roles

↓

Permissions
```

Like Bitly Teams.

---

## 16. API Keys

Developers can

```
Generate API Key

↓

Create URLs

↓

Delete URLs

↓

Analytics
```

---

## 17. Rate Limiting

Protect APIs

```
100 requests/minute
```

Use Redis.

---

## 18. Redirect Caching

Instead of

```
Request

↓

PostgreSQL

↓

Redirect
```

Use

```
Request

↓

Redis

↓

Redirect
```

This is how production systems achieve low latency.

---

## 19. Background Workers

Never update analytics synchronously.

```
Request

↓

Redirect Immediately

↓

Queue Event

↓

Worker Updates Analytics
```

This keeps redirects fast.

---

## 20. Real-Time Dashboard

Show

* Live clicks
* Active visitors
* Top URLs
* Traffic per minute
* Geographic map

Use WebSockets.

---

# Advanced Features

## Link Preview

```
Paste URL

↓

Fetch Metadata

↓

Title

↓

Description

↓

Thumbnail
```

---

## Malware Detection

Before shortening

```
Scan URL

↓

Block Phishing

↓

Block Malware

↓

Warn User
```

---

## Link Health Monitoring

Every hour

```
Visit URL

↓

404?

↓

Notify User
```

---

## Scheduled Activation

```
Starts Tomorrow

↓

Automatically Active
```

---

## A/B Redirect

```
Visitor

↓

50%

↓

Google

↓

50%

↓

Bing
```

Useful for marketing experiments.

---

## Smart Redirects

```
Android

↓

Play Store

iPhone

↓

App Store

Desktop

↓

Website
```

---

## Link Branding

Instead of

```
bit.ly
```

Support

```
go.company.com
```

with custom domains.

---

## Admin Panel

Manage

* Users
* Links
* Reports
* Abuse Reports
* Analytics
* Billing
* API Keys

---

# System Design

```
Client
    │
    ▼
Load Balancer
    │
    ▼
NestJS API
    │
 ┌──┴──────────────┐
 ▼                 ▼
Redis          PostgreSQL
 │                 │
 └──────┬──────────┘
        ▼
    RabbitMQ
        │
        ▼
Analytics Worker
        │
        ▼
Analytics Database
```

---

# Database Tables

```
users

organizations

teams

roles

permissions

urls

clicks

devices

locations

browsers

api_keys

audit_logs

qr_codes
```

---

# Production Concepts

* JWT Authentication
* RBAC
* Redis Caching
* Queue Workers
* Event-Driven Analytics
* Database Indexing
* Cursor Pagination
* Soft Delete
* Request Correlation IDs
* Structured Logging
* Retry Policies
* Dead Letter Queue
* API Versioning
* OpenAPI/Swagger
* Docker Compose
* Unit & Integration Tests

---

# Resume Highlights

Instead of writing:

> **URL Shortener using Node.js and MongoDB**

Write:

> **Built a production-grade URL Shortener Platform using NestJS, PostgreSQL, Redis, RabbitMQ, and WebSockets. Designed low-latency redirect APIs (<10 ms with Redis cache), asynchronous analytics processing, custom domains, QR code generation, API key management, multi-tenant workspaces, and real-time analytics dashboards.**

---

## How Much Will You Learn?

| Skill                    | Level |
| ------------------------ | :---: |
| NestJS                   | ⭐⭐⭐⭐⭐ |
| PostgreSQL               | ⭐⭐⭐⭐☆ |
| Redis                    | ⭐⭐⭐⭐⭐ |
| RabbitMQ                 | ⭐⭐⭐⭐☆ |
| WebSockets               | ⭐⭐⭐⭐☆ |
| System Design            | ⭐⭐⭐⭐⭐ |
| Authentication           | ⭐⭐⭐⭐☆ |
| Caching                  | ⭐⭐⭐⭐⭐ |
| Performance Optimization | ⭐⭐⭐⭐⭐ |
| Docker                   | ⭐⭐⭐⭐☆ |

This version of a URL shortener goes far beyond a CRUD application and demonstrates many of the architectural patterns used in real production systems. It is a strong project for interviews because you can discuss caching strategies, asynchronous processing, scalability, database design, API security, and performance trade-offs in depth.
