#!/bin/bash

auth="source .env && cd auth && npm run dev"
plans="source .env && cd plans && npm run dev"
templates="source .env && cd templates && npm run dev"


tmux \
  new-session  "$auth ; read" \; \
  split-window "$plans ; read" \; \
  split-window "$templates ; read" \; \
  select-layout even-vertical
