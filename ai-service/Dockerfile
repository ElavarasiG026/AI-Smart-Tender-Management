FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

# Timeout limit-ah 1000 seconds-ah increase panni build panrom
RUN pip install --no-cache-dir --default-timeout=1000 -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]