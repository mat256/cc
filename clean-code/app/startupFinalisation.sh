#!/bin/bash
sleep 10 && echo StartupFinalisation-start && cd /app && alembic upgrade head && uvicorn main:app --host 0.0.0.0 --port 80 --reload