FROM node:lts-stretch
RUN apt update
RUN apt install -y curl
RUN curl -k "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install
RUN npm install -g aws-cdk