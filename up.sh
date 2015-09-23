
docker build -t box - <<EOF
 FROM node
 EXPOSE 8080
 RUN npm install -g babel
 CMD node
EOF

docker run -it -v `pwd`:/src box
docker run -it -v `pwd`:/src box babel-node zeta.js
