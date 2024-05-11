# Conway's game of life

Conway's game of life automaton in a HTML page based on JavaScript.

Check deployment at:

> https://conway.ociotec.com

## Run inside docker container

To run the docker container win an nginx server on port `8888`, just execute:

```
docker run --name conway --detach --publish 8888:80 --restart always ociotec/conway
```

## Build the docker image

Just run:

```
docker image build --tag ociotec/conway .
```
