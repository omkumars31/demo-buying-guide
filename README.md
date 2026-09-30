# Buying Guide Demo

A full-stack demo project that recreates a guided product-selection workflow using React and Express.

> **Important:** This is a personal demo project created for learning and interview preparation. It is **not the actual DentalKart codebase**, does not contain proprietary code, and is not an official DentalKart project.

## Overview

The purpose of this project is to demonstrate how a multi-step Buying Guide can be implemented as a full-stack application.

The application guides a user through a series of product-related questions, collects their selections, validates the inputs, sends the collected information to a backend REST API, and displays product recommendations returned by the backend.

## Application Flow

```text
User
  ↓
Buying Guide UI
  ↓
React State
  ↓
Input Validation
  ↓
Create Request Payload
  ↓
Axios POST Request
  ↓
Express REST API
  ↓
Recommendation Logic
  ↓
JSON Response
  ↓
React State Update
  ↓
Display Recommended Products