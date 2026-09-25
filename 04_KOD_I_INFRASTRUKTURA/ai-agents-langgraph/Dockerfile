FROM python:3.11-slim
WORKDIR /app
COPY pyproject.toml ./
COPY src ./src
RUN pip install --no-cache-dir .
# API: uvicorn fabryka_agents.api:app ; worker: arq fabryka_agents.worker.WorkerSettings
CMD ["uvicorn", "fabryka_agents.api:app", "--host", "0.0.0.0", "--port", "8000"]
