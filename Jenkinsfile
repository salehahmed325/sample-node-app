pipeline {
    agent any
    stages{
        stage('Build Docker Image'){
            steps{
                sh "docker build . -t salehahmed325/nodeapp:v1 "
            }
        }
        stage('Push Image to Docker Hub'){
            steps{
                withCredentials([string(credentialsId: 'dockerhubcred', variable: 'dockerhubcred')]) {
                    sh "docker login -u salehahmed325 -p ${dockerhubcred}"
                    sh "docker push salehahmed325/nodeapp:v1"
                }
            }
        }
        stage('Deploy on minikube'){
            steps {
                sshagent(['login_to_212']) {
                    sh 'scp -o StrictHostKeyChecking=no /var/lib/jenkins/workspace/nodeapp-pipeline/deployment.yml services.yml saleh@192.168.0.212:/home/saleh/'
                    sh 'ssh saleh@192.168.0.212 kubectl -n dev apply -f .'
                    sh 'ssh saleh@192.168.0.212 rm deployment.yml services.yml'
                }
            }
        }
        stage('Remove Docker Image'){
            steps{
                sh "docker rmi salehahmed325/nodeapp:v1 "
            }
        }
    }
}

def getDockerTag(){
    def tag  = sh script: 'git rev-parse HEAD', returnStdout: true
    return tag.trim() // trim the output to remove trailing newline
}