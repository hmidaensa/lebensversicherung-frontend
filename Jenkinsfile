/*pipeline {
    agent any

environment { 

        registry = "atanane/myapp-lebensversicherung" 

        registryCredential = 'dockerhub-credentials-id' 

        dockerImage = '' 

    }
   

    stages { 

        stage('Cloning our Git') { 

            steps { 
               git url: 'https://github.com/hmidaensa/lebensversicherung-frontend.git', branch: 'main'

            }

        } 

        stage('Building our image') { 

            steps { 

                script { 

                    dockerImage = docker.build registry + ":$BUILD_NUMBER" 

                }

            } 

        }

        stage('Deploy our image') { 

            steps { 

                script { 

                    docker.withRegistry( '', registryCredential ) { 

                        dockerImage.push() 

                    }

                } 

            }

        } 

        stage('Cleaning up') { 

            steps { 

                sh "docker rmi $registry:$BUILD_NUMBER" 
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
}*/

pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id')
        IMAGE_NAME = 'atanane/myapp-lebensversicherung'
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        dockerImage=''
        DOCKER_REGISTRY = 'docker.io'

    }

    stages {
        stage('Checkout') {
            steps {
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
                  echo 'Tag Docker Image begin ${imageId}.'
                    // Tag the image with the Docker Hub repository name
                    bat "docker tag ${imageId} ${IMAGE_NAME}:${env.BUILD_NUMBER}"

                    echo 'Tag Docker Image end.'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    echo 'Push to Docker Hub begin .'
                   
                    // Push the image to Docker Hub
                    
                    docker.withRegistry( '', 'dockerhub-credentials-id' ) {
                        dockerImage=IMAGE_NAME+':${env.BUILD_NUMBER}'
                        dockerImage.push()
                        //bat "docker push ${IMAGE_NAME}:${env.BUILD_NUMBER}"
                        echo 'Push to Docker Hub end'
                        }
                        // Login to Docker Hub (or another Docker registry)
                   
                  
                }
            }
        }

        /*stage('push image') {
            steps{
                 echo 'Push iamge : ${BUILD_NUMBER}.'
                bat 'docker push atanane/myapp-lebensversicherung:latest'
            }
        }*/
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

