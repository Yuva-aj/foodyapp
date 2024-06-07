pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-repo-credential')
        DOCKERHUB_REPO = 'yuvaraj14/foody-app'
        FRONTEND_IMAGE = "${DOCKERHUB_REPO}:frontend"
        BACKEND_IMAGE = "${DOCKERHUB_REPO}:backend"
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Clone Repo') {
            steps {
                git url: 'https://github.com/Yuva-aj/foodyapp', branch: 'master'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh "docker build -t ${FRONTEND_IMAGE} -f frontend/Dockerfile ./frontend"
            }
        }

        stage('Build Backend Image') {
            steps {
                sh "docker build -t ${BACKEND_IMAGE} -f backend/Dockerfile ./backend"
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-repo-credential', usernameVariable: 'DOCKERHUB_CREDENTIALS_USR', passwordVariable: 'DOCKERHUB_CREDENTIALS_PSW')]) {
                    sh "docker login -u $DOCKERHUB_CREDENTIALS_USR -p $DOCKERHUB_CREDENTIALS_PSW"
                    sh "docker push ${FRONTEND_IMAGE}"
                    sh "docker push ${BACKEND_IMAGE}"
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh 'whoami'
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            sh 'docker-compose down'
            sh 'docker system prune -f'
        }
    }
}
