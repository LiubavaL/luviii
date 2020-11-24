FROM node:12-stretch

ENV DIRPATH=/home/node/code

USER node

RUN mkdir $DIRPATH

WORKDIR $DIRPATH
COPY --chown=node:node . .
RUN npm ci

WORKDIR $DIRPATH/client
RUN npm ci

WORKDIR $DIRPATH

CMD npm run dev