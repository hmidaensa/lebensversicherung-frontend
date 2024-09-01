pipeline {
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
        //helm-deploy-to-eks-argocd-manifest name of other job in jenkins in wich we will update tag
        stage('Trigger ManifestUpdate') {
              steps { 

                script { 

                echo "triggering updatemanifestjob"
                build job: 'helm-deploy-to-eks-argocd-manifest', parameters: [string(name: 'DOCKERTAG', value: env.BUILD_NUMBER)]
                }
              }
        }


    }

    post {
        always {
            // Clean up the workspace and remove any local images to save space
           // sh 'docker system prune'
        }
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
/*
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
                    bat "docker-compose build"
                }
            }
        }

       

        stage('Push to Docker Hub') {
            steps {
                script {
                    echo 'Push to Docker Hub begin .'
                   
                    // Push the image to Docker Hub
                    
                    docker.withRegistry( 'https://registry.hub.docker.com', 'dockerhub-credentials-id' ) {
                        bat 'docker push atanane/myapp-lebensversicherung:$BUILD_NUMBER' 
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
*/
