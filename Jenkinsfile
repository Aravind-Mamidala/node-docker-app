pipeline {
    agent any

    stages {

        stage('Checkout from GitHub') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Aravind-Mamidala/node-docker-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                docker build -t node-docker-app:${BUILD_NUMBER} .
                """
            }
        }

        stage('Stop & Remove Old Container') {
            steps {
                sh """
                docker stop node-app || true
                docker rm node-app || true
                """
            }
        }

        stage('Run Docker Container') {
            steps {
                sh """
                docker run -d -p 3001:8080 --name node-app node-docker-app:${BUILD_NUMBER}
                """
            }
        }
    }
}
