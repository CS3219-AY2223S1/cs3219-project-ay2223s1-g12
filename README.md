
# CS3219-AY22-23-G12

![example event parameter](https://github.com/Punpun1643/PeerPrep/actions/workflows/main.yml/badge.svg?event=push)

## Local deployment (dockerized)

### Set-up:

1. Ensure that Docker desktop application is running. 
2. Go to the root directory of the repository.
3. Run the following command:
    ```bash
    #build and run each microservice using docker-compose
    docker-compose up --build -d
    ```
4. After the docker containers are up, navigate to  `localhost:3000` on your web browser and start using the application. 


### Tear down:
1. Run the following command:
   ```bash
   # tear down containers 
   docker-compose down
   ```

### Note:
To switch from dockerized version to local development, 
1. Go to the root directory of the repository.
2. Run the following command:
   ```bash 
   cd matching-service
   ```
3. Open `configs.js` and set `isDocker` toggle to false.
