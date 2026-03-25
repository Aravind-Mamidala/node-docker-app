// pipeline {
//    agent any

//    stages {

 //       stage('Checkout from GitHub') {
 //           steps {
  //              git branch: 'main',
  //                  url: 'https://github.com/Aravind-Mamidala/node-docker-app.git'
 //           }
 //       }

  //      stage('Install Dependencies') {
  //          steps {
  //              sh 'npm install'
 //           }
 //       }

  //      stage('Build Docker Image') {
  //          steps {
  //              sh '''
   //             docker build -t node-docker-app:${BUILD_NUMBER} .
   //             '''
   //         }
   //     }

    //    stage('Create container') {
 //   steps {
 //       sh '''
 //       docker run -d -p 3000:8080 node-docker-app:${BUILD_NUMBER}
 //       '''
 //   }
 //   }
 

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
                sh '''
                docker build -t node-docker-app:${BUILD_NUMBER} .
                '''
            }
        }

        stage('Run Container (Clean)') {
            steps {
                sh '''
                docker ps -q --filter "publish=3000" | xargs -r docker stop
                docker ps -aq --filter "publish=3000" | xargs -r docker rm

                docker run -d -p 3000:8080 node-docker-app:${BUILD_NUMBER}
                '''
            }
        }
    }
}
