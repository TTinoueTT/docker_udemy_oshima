# FROM ubuntu:20.04
FROM ruby:2.7.6

COPY Gemfile .
# RUN apt install -y ruby ruby-bundler


RUN apt update

# RUN apt-get install -y ruby-dev build-essential libmariadb-dev
RUN apt install -y build-essential libmariadb-dev
RUN bundle install
