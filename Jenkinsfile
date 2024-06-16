// pipeline {
//     agent any
//     stages{
//         stage('Build Docker Image'){
//             steps{
//                 sh "docker build . -t salehahmed325/nodeapp:v1 "
//             }
//         }
//         stage('Push Image to Docker Hub'){
//             steps{
//                 withCredentials([string(credentialsId: 'dockerhubcred', variable: 'dockerhubcred')]) {
//                     sh "docker login -u salehahmed325 -p ${dockerhubcred}"
//                     sh "docker push salehahmed325/nodeapp:v1"
//                 }
//             }
//         }
//         stage('Deploy on k8s'){
//             steps {
//                 sshagent(['login_to_213']) {
//                     sh 'scp -o StrictHostKeyChecking=no /var/lib/jenkins/workspace/nodeapp-pipeline/deployment.yml services.yml saleh@192.168.0.213:/home/saleh/'
//                     sh 'ssh saleh@192.168.0.213 kubectl -n dev apply -f .'
//                     sh 'ssh saleh@192.168.0.213 rm deployment.yml services.yml'
//                 }
//             }
//         }
//         stage('Remove Docker Image'){
//             steps{
//                 sh "docker rmi salehahmed325/nodeapp:v1 "
//             }
//         }
//     }
// }

// def getDockerTag(){
//     def tag  = sh script: 'git rev-parse HEAD', returnStdout: true
//     return tag.trim() // trim the output to remove trailing newline
// }

pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "salehahmed325/nodeapp"
        DOCKER_TAG = getDockerTag()
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build . -t ${DOCKER_IMAGE}:${DOCKER_TAG}
                }
            }
        }
        stage('Push Image to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhubcred', variable: 'dockerhubcred')]) {
                    script {
                        sh "docker login -u salehahmed325 -p ${dockerhubcred}"
                        sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    }
                }
            }
        }
        stage('Deploy on k8s') {
            steps {
                sshagent(['login_to_213']) {
                    sh 'scp -o StrictHostKeyChecking=no /var/lib/jenkins/workspace/nodeapp-pipeline/deployment.yml services.yml saleh@192.168.0.213:/home/saleh/'
                    sh 'ssh saleh@192.168.0.213 kubectl -n dev apply -f /home/saleh/deployment.yml'
                }
            }
        }
        stage('Remove Docker Image') {
            steps {
                script {
                    sh "docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }
    }
}

def getDockerTag() {
    return sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
}
