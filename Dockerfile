ARG IMAGE=python:3.13-alpine

FROM ${IMAGE} AS builder

RUN apk add --quiet --no-cache \
    build-base \
    libffi-dev \
    openssh \
    git \
    gcc

RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts

RUN pip install uv==0.9.25

ENV UV_CACHE_DIR=/tmp/uv_cache
ENV UV_NATIVE_TLS=true
RUN mkdir -p $UV_CACHE_DIR

WORKDIR /app/

# Actual project
COPY ./pyproject.toml ./uv.lock ./
RUN touch README.md


RUN --mount=type=ssh uv venv\
    && uv export --no-dev > $UV_CACHE_DIR/requirements.txt \
    && uv pip sync $UV_CACHE_DIR/requirements.txt \
    && rm -rf $UV_CACHE_DIR

# The runtime image, used to just run the code provided its virtual environment
FROM ${IMAGE} AS runtime

RUN apk --quiet --no-cache add ca-certificates libstdc++ tzdata \
    && rm -rf /var/cache/apk/* \
    && cp /usr/share/zoneinfo/UTC /etc/localtime \
    && echo "UTC" > /etc/timezone

WORKDIR /app
ENV VIRTUAL_ENV=/app/.venv
ENV PATH="${VIRTUAL_ENV}/bin:$PATH"

COPY --from=builder ${VIRTUAL_ENV} ${VIRTUAL_ENV}
COPY ./backend/ /app/backend
COPY ./frontend/ /app/frontend
COPY ./cv_app/ /app/cv_app
COPY ./manage.py /app/manage.py

# RUN python -m compileall /app
CMD ["/app/.venv/bin/python", "manage.py", "runserver", "0.0.0.0:8000"]
