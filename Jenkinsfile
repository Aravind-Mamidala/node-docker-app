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

        stage('Create container') {
    steps {
        sh '''
        docker run -d -p 3000:8080 node-docker-app:${BUILD_NUMBER}
        '''
    }
    }
    stage('Deploy to Kubernetes') {
    steps {
        sh '''
        export KUBECONFIG=$HOME/.kube/config

        kubectl get nodes
        minikube image load node-docker-app:${BUILD_NUMBER}
        kubectl apply -f k8s/deployment.yaml
        kubectl apply -f k8s/service.yaml
        '''
    }
}

    }
}
