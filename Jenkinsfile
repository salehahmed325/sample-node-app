pipeline {
    agent any
    environment{
        DOCKER_TAG = getDockerTag()
    }
    stages{
        stage('SCM Checkout'){
            steps{
                git branch: 'main', url: 'https://github.com/salehahmed325/sample-node-app.git'
            }
        }
        stage('Build Docker Image'){
            steps{
                sh "docker build . -t salehahmed325/nodeapp:${DOCKER_TAG} "
            }
        }
		stage('Push Image to Docker Hub'){
			steps{
				withCredentials([string(credentialsId: 'dockerhubcred', variable: 'dockerhubcred')]) {
					sh "docker login -u salehahmed325 -p ${dockerhubcred}"
					sh "docker push salehahmed325/nodeapp:${DOCKER_TAG}"
				}
			}
		}
		stage('Login to staging server') {
            steps {
                sshagent(['login_to_212']) {
                     sh 'scp -o StrictHostKeyChecking=no var/lib/jenkins/workspace/samplenode-app/pods.yml services.yml saleh@192.168.0.212:/home/saleh/'
                    }
            }
        }
   }
}
def getDockerTag(){
    def tag  = sh script: 'git rev-parse HEAD', returnStdout: true
    return tag
}
