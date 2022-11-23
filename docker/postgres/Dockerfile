FROM postgres:latest as dmhelper
COPY dndgroup.sql /docker-entrypoint-initdb.d/

RUN ["sed", "-i", "s/exec \"$@\"/echo \"skipping...\"/", "/usr/local/bin/docker-entrypoint.sh"]

ENV POSTGRES_PASSWORD "password"
ENV POSTGRES_DB "postgres"
ENV PGDATA=/data

RUN ["/usr/local/bin/docker-entrypoint.sh", "postgres"]

# final build stage
FROM postgres:latest

COPY --from=dmhelper /data $PGDATA
#EXPOSE 7000
EXPOSE 5432
# RUN echo "host all  all     0.0.0.0/0 md5" >> /etc/postgres/13.3/main/pg_hba.conf
# RUN echo "listen_addresses='*'" > /etc/postgres/13.3.3/main/postgresql.conf


# WHAT is working now
# 1.  Created an image using dockerfile as opposed to docker-compose

# 2.  Populated said image with database entries
# 2a.  COPY 01_users.sql /docker-entrypoint-initdb.d/
# 2b.  COPY 02_qadump.sql /docker-entrypoint-initdb.d/
# 2c.  The above commands copy the .sql files into the docker entry point
# 2d.  The postgres container defaults to executing scripts and .sql within said directory within container

# 3.  Able to build a docker container off said image
# 3a.  Had an error in that the dumped file would keep redumping each time I ran contianer
# 3b.  The solution to repopulating (and hence FAIL from recreating users with the same scripts)
# 3c.  was solved solved using MULTI-STAGE BUILD (disclosed here in relevant part)
     
      # # dump build stage
      # FROM postgres:latest as qa_dump
      # COPY 02_qadump.sql /docker-entrypoint-initdb.d/
      # RUN ["sed", "-i", "s/exec \"$@\"/echo \"skipping...\"/", "/usr/local/bin/docker-entrypoint.sh"]
      # ENV PGDATA=/data
      # RUN ["/usr/local/bin/docker-entrypoint.sh", "postgres"]
      # # final build stage
      # FROM postgres:latest
      # COPY --from=qa_dump /data $PGDATA

# 4.  Able to connect into the container on local and verify a query with PGADMIN
# 4a.  Was not at first able to connect into running container.  Solution was
# 4b.  SOLUTION:  docker run -p 0.0.0.0:6002:5432 zomoftom/sdc2:qa_dump_pg
# 4c.  COMMENTS:  This caused the internal port of of the container 5432 to be mapped to the localhost port
# 4d.  6002, a port I deliberated chose as to not conflict with any other localhost ports.
# 4e.  This was one of my longest running errors.  I couldnt connect to the localhost via the dockerfile build
# 4f.  But was able to connect to docker-compose version.  I assume the docker-compose by default exposed a port.
# 4g.  Before I was just running docker run qa_dump_pg   This was not working, inspite of the fact
# 4h.  I attempted to expose a port in the image.  And inspite of docker inspecting the container for the IP address
# 4i.  I knew on some level, the IP address of the container 172.17.0.2 made no sense.  First of all, because I am not even online
# 4j.  There was simply no way for the docker to create an IP out of thin air.
# 4k.  I knew then that the IP created existed only on the default "inter-container" network of docker
# 4l.  And not as a "global IP".  Thus, the IP address was erroneous.  However, even directly accessing
# 4m. 0.0.0.0 followed by the exposed port did not work.  I suppose there is something different to the container being run explicitly with mapped ports.
# 4n. Besides even if I did expose a port in the dockerfile, what does it map to?


# 5.  Able to push to dockerhub
# 5a.  Error could not push to dockerhub
# 5b.  What does not work:  docker push qa_dump_pg:latest
# 5c.  What does not work:  docker push myusername/myreponame/qa_dump_pg:latest even after tagging qa_dump:latest in a docker tag command
# 5d.  SOLUTION:  You have to tag your image explicitly as username/repo/qa_dump_pg:latest because there is a requirement
# 5e.  That 1) you push to your particular username/reponame, otherwise you do not have access since its someone elses repo
# 5f.  That has to be the exact name of the image sitting in directory!!!!
# 5g.  You have to tag your username/repo and then push to usernname/repo as such
# 5h.  a) docker tag qa_dump_pg:latest  zomoftom/sdc2:qa_dump_pg  (notice the explicit tag with my username/reponame)
# 5i.  b) docker push zomoftom/sdc2:qa_dump_pg

# 6.  Attempted to pull docker image from dockerhub and load it into EC2 instance
# 6a.  the first bug indicated the docker daemon was not active.  
# 6b.  Solved with: sudo service docker start
  #    sudo usermod -a -G docker ec2-user  (so we dont have to keep typing sudo)
  #    docker info  (to verify working)

# 6c. despite the fact that there was only one image in my repo, the pull command offered by 
# 6d. dockerhub did not work:  "docker pull zomoftom/sdc2"
# 6e. the first bug was logging into docker using docker login indicating 
# 6f. I was getting a "Error response from daemon: manifest for docker pull zomoftom/sdc2:latest not found"
# 6g. I believe I changed that to docker pull zomoftom/sdc2:qa_dump_pg


# 7.  After succesfully pullng, I tried to run the docker image
# 7a.  Got an error after some time indicating there was not enough space!
# 7b.  Went into amazon console, went to the instance -> storage -> click on volume vol-087cff0e6e3fdd14b
# 7c.  Actions drop down bar, Modify Volume, then went from typing 8Gi to 15Gi.
# 7d.  Deactivated the instance, and waited a bit.
# 7e.  After going in,  I was able to check the volume had been modified upon SSHing using
# 7f.  "df -h"  which created a long list where I was able to check the remaining disk space.

# 8.  Ran Docker image successfully
# 8a. With enough storage now I was able to run the docker image as a docker container, but was not able to connect in
# 8b.  Solved, with AGAIN modifying the policy to accept TCP connections on port 6003 (the port I chose)
# 8c.  and accept connections from anywhere.   This worked, and the effective docker run command was
# 8d.  docker run -p 6003:5432 <docker image>
# 8e.  connected with PG_ADMIN by setting, the host to: 18.222.165.15 (given by aws)
# 8f.  password: password, user as Tom1, database as questionandanswer

# 9.  logged into the running docker container via
# 9a.   docker exec -it 96b80db7c39c /bin/bash  (with the id of the container being used)
# 9b.  logged into the database using " psql -h localhost -p 5432 -U postgres -W"
# 9c.  interestingly, psql Tom1 or psql postgres did not work eeven though there is a postgres database
# 9d.  Ran a query after connecting to the database \c questionandanswer

# 10.  Connected to the database with my code!!!  
# 10a.  After modifying the security policy in aws, got it working
# const client = new Client({
#   user: 'Tom1',
#   //host: 'localhost',
#   host: '18.222.165.15',
#   database: 'questionandanswer',
#   password: 'password',
#   port: 6003,
#   //port: 5432,
# })




