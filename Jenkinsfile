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

                    dockerImage = docker-compose.build(registry + ":$BUILD_NUMBER")
                    //bat "docker-compose build"

                }

            } 

        }

        stage('Deploy our image') { 

            steps { 

                script { 

                    docker.withRegistry( '', registryCredential ) { 
                    //echo "${BUILD_NUMBER}"
                     //sh 'docker push ${registry}:${BUILD_NUMBER}'
                        //bat 'docker push ${imageName} '
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
}
