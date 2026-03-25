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
                    url: 'https://github.com/Aravind-Mamidala/node-docker-app.git',
                    credentialsId: 'github-creds'
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
                docker build -t my-k8s-app:${BUILD_NUMBER} .
                docker tag my-k8s-app:${BUILD_NUMBER} bunny1007/my-k8s-app:latest
                '''
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([string(credentialsId: 'docker-creds', variable: 'TOKEN')]) {
                    sh '''
                    echo "$TOKEN" | docker login -u bunny1007 --password-stdin
                    '''
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh '''
                docker push docker.io/bunny1007/my-k8s-app:latest
                '''
            }
        }

        stage('Start Minikube if not running') {
            steps {
                sh '''
                if ! minikube status | grep -q "apiserver: Running"; then
                    echo "Starting Minikube..."
                    minikube start --driver=docker --memory=2048 --cpus=2
                fi
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                minikube kubectl -- apply -f k8s/deployment.yaml
                minikube kubectl -- apply -f k8s/service.yaml
                '''
            }
        }
    }
}

