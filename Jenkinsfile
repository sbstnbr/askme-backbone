pipeline {
    agent any
    stages {
        stage ('Checkout') {
            steps{
                git 'https://github.com/sbstnbr/askme/'
            }
        }
        stage ('Build App') {
            steps{
                npm install --unsafe-perm
                bower install --allow-root
                grunt build
            }
        }
        stage ('Code Analysis') {
            steps{
                grunt jshint:dist
            }
        }
        stage ('Unit Tests') {
            steps{
                grunt test
                grunt plato
            }
        }
        stage ('Publish image') {
            steps{
              # docker publish image aowp/askme-frontend
            }
        }
        stage ('Deploy to CI Env') {
            steps{
                if [ $(docker ps -a --filter "name=askme-frontend" | wc -l ) -eq 2 ]; then
                   docker stop askme-frontend;
                   docker rm -v askme-frontend;
                fi
                docker pull dockerhub.accenture.com/aowp/askme-frontend;
                docker run -d --name askme-frontend --link askme-backend:backend --link askme-dashboard:dashboard -p 80:8080 dockerhub.accenture.com/aowp/askme-frontend;
            }
        }

        stage ('Security Tests') {
            steps{
                echo "TO DO with OWASPZAP"
            }
        }
        stage ('Performance Tests') {
            steps{
                echo "TO DO with Gatling"
            }
        }
        stage ('Functional Tests') {
            steps{
                grunt acceptance
            }
        }
        stage ('Deploy to Prod') {
            steps{
                echo "TO DO"
            }
        }
    }
}
