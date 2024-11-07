pipeline {
    agent any

    stages {
        stage('Access EC2 & Update Code') {
            steps {
                // Use the AWS credentials and SSH key
                withCredentials([
                aws(accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'baraamohamed2311_aws_creds', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'),
                file(credentialsId: 'NewPrivateApp', variable: 'NewPrivateApp')]) {
                    script {
                    /*  We are running this script on ec2 so we do not need to ssh to bastion first   */
                        // First EC2 instance
                        sh '''
                            chmod 400 "$NewPrivateApp"
                            ssh -i "$NewPrivateApp" ubuntu@10.0.2.227 << EOF
                                cd /var/www/html
                                sudo git clone https://github.com/BaraaMohamed2311/Tasketos.git
                                sudo systemctl restart apache2
                            EOF
                        '''

                        // Second EC2 instance
                        sh '''
		                    chmod 400 "$NewPrivateApp"
                            ssh -i "$NewPrivateApp" ubuntu@10.0.3.189 << EOF
                                cd /var/www/html
                                sudo git clone https://github.com/BaraaMohamed2311/Tasketos.git
                                sudo systemctl restart apache2
                            EOF
                        '''
                    }
                }
            }
        }
    }
}
