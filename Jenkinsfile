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
                //git 'https://github.com/YourGithubAccount/YourGithubRepository.git' 

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
30
        stage('Cleaning up') { 
31
            steps { 
32
                sh "docker rmi $registry:$BUILD_NUMBER" 
33
            }
34
        } 
35
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
