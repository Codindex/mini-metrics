# Mini Metrics Backend

## Overview

The Mini Metrics Backend is a Flask application that provides a set of basic arithmetic operations through a RESTful API. This application is containerized using Docker and deployed on a Kubernetes cluster with an Ingress controller for routing.

## Features

- Simple arithmetic operations: addition, subtraction, multiplication, and division.
- RESTful API endpoints for each operation.
- Deployed using Kubernetes for scalability and management.

## API Endpoints

- **GET /**: Returns a greeting message.
  - Response: `Hello Cluster admins`

- **GET /add**: Returns the result of a predefined addition (3 + 4).
  - Response: `{"result": "7"}`

- **GET /api/addition?a=<number>&b=<number>**: Returns the sum of `a` and `b`.
  - Example: `/api/addition?a=5&b=3`
  - Response: `{"result": 8}`

- **GET /api/soustraction?a=<number>&b=<number>**: Returns the result of `a - b`.
  - Example: `/api/soustraction?a=5&b=3`
  - Response: `{"result": 2}`

- **GET /api/multiplication?a=<number>&b=<number>**: Returns the product of `a` and `b`.
  - Example: `/api/multiplication?a=5&b=3`
  - Response: `{"result": 15}`

- **GET /api/division?a=<number>&b=<number>**: Returns the result of `a / b`. Note that division by zero is not handled in this implementation.
  - Example: `/api/division?a=6&b=3`
  - Response: `{"result": 2.0}`

## Deployment Configuration

### Ingress Configuration

The Ingress resource routes traffic to the backend service.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-mini-metrics
  annotations:
    nginx.ingress.kubernetes.io/use-regex: "true"
spec:
  ingressClassName: nginx
  rules:
    - host: mini-metrics.example
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: mini-metrics-service
                port:
                  number: 80
    - host: api.mini-metrics.example
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: back-mini-metrics-service
                port:
                  number: 80
```

# Deployment Configuration
The Deployment resource ensures that two replicas of the application are running.

# Service Configuration
The Service resource exposes the backend application within the cluster.

# Getting Started
1) Clone the repository.
2) Ensure you have Docker and Kubernetes (Minikube) installed.
3) Make sure you're in the right directory before building 
4) Build the Docker image:
docker build -t mini-metrics-backend-image .
minikube image load mini-metrics-backend-image

5) Apply the Kubernetes configurations:
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml

6)Access the application through the Ingress host defined in your configuration.
