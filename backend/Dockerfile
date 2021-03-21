# Set base image
FROM python:3.8.8-alpine3.13

# Prevents python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE=1 

# Prevents python from buffering stdout and stderr 
ENV PYTHONUNBUFFERED=1

# Upgrade pip
RUN python3 -m pip install --upgrade pip

# Set work directory
WORKDIR /usr/src/backend

# Copy requirements.txt to work directory
COPY requirements.txt ./

# Pillow library requirments
RUN apk --no-cache add build-base zlib-dev jpeg-dev

# Config locale
# ENV MUSL_LOCPATH=/usr/local/share/i18n/locales/musl
# RUN apk add --update git cmake make musl-dev gcc gettext-dev libintl
# RUN cd /tmp && git clone https://gitlab.com/rilian-la-te/musl-locales.git
# RUN cd /tmp/musl-locales && cmake . && make && make install
# ENV LANG=fa_IR.UTF-8 LANGUAGE=fa_IR.UTF-8 LANG=fa_IR LANGUAGE=fa_IR

# RUN /usr/local/bin/locale -a

# Install requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy all project to work directory
COPY . .


RUN python3 manage.py makemigrations
RUN python3 manage.py migrate
RUN python3 manage.py collectstatic --noinput --clear
RUN python3 manage.py createadmin
# RUN python3 manage.py compilemessages