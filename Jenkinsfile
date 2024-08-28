pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id')
        IMAGE_NAME = 'atanane/myapp-lebensversicherung'
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        dockerImage=''
    }

    stages {
        stage('Checkout') {
            steps {
                // Check out the repository containing the Docker Compose file
                git url: 'https://github.com/hmidaensa/lebensversicherung-frontend.git', branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image using Docker Compose
                    bat "docker-compose -f ${DOCKER_COMPOSE_FILE} build"
                    echo 'Build Docker Image end.'
                }
            }
        }

        stage('Tag Docker Image') {
            steps {
                script {
                     echo 'Tag Docker Image begin ${env.BUILD_NUMBER}.'
                    // Get the image ID of the built image
                    def imageId = bat(
                        script: "docker-compose -f ${DOCKER_COMPOSE_FILE} images -q your-service-name",
                        returnStdout: true
                    ).trim()

                    // Tag the image with the Docker Hub repository name
                    bat "docker tag ${imageId}:latest ${IMAGE_NAME}:${env.BUILD_NUMBER}"
                    echo 'Tag Docker Image end.'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    echo 'Push to Docker Hub begin .'
                    /*echo '${env.BUILD_NUMBER}'
                    // Log in to Docker Hub
                    bat "echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
                    
                    // Push the image to Docker Hub
                    bat "docker push ${IMAGE_NAME}:${env.BUILD_NUMBER}"
                    echo 'Push to Docker Hub end'*/
                    docker.withRegistry( '', DOCKERHUB_CREDENTIALS ) {
                        dockerImage=IMAGE_NAME+':${env.BUILD_NUMBER}'
                        dockerImage.push()
                        }
                }
            }
        }
    }

    post {
        always {
            // Clean up the workspace and remove any local images to save space
            bat 'docker-compose down --rmi all'
            bat 'docker system prune -f'
        }
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
