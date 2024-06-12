pipeline {
    agent any
    environment {
        IMAGE_TAG = "${GIT_COMMIT}"
    }
    stages{
        stage('Build Docker Image'){
            steps{
                sh "docker build . -t salehahmed325/nodeapp:${IMAGE_TAG} "
            }
        }
        stage('Push Image to Docker Hub'){
            steps{
                withCredentials([string(credentialsId: 'dockerhubcred', variable: 'dockerhubcred')]) {
                    sh "docker login -u salehahmed325 -p ${dockerhubcred}"
                    sh "docker push salehahmed325/nodeapp:${IMAGE_TAG}"
                }
            }
        }
        stage('Login to staging server'){
            steps {
                sshagent(['login_to_212']) {
                    sh 'scp -o StrictHostKeyChecking=no /var/lib/jenkins/workspace/nodeapp-pipeline/pods.yml services.yml saleh@192.168.0.212:/home/saleh/'
                    sh "ssh saleh@192.168.0.212 kubectl -n dev apply -f ."
                }
            }
        }
    }
}

def getDockerTag(){
    def tag  = sh script: 'git rev-parse HEAD', returnStdout: true
    return tag.trim() // trim the output to remove trailing newline
}