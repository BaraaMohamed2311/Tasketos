// File
pipeline {
    agent any
    options { skipDefaultCheckout() }
    stages{

        stage('Build Main Pipe'){
            steps {
                    build job: 'TasketosPipe'
            }
        }
    }
}