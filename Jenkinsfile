pipeline {
    agent any

    stages {
        stage('Access EC2 & Update Code') {
            steps {
                // Use the AWS credentials and SSH key
                withCredentials([
                aws(accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'baraamohamed2311_aws_creds', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'),
                file(credentialsId: 'NewPrivateApp', variable: 'NewPrivateApp'), 
                file(credentialsId: 'BASTION_DEV_ACCESS', variable: 'Dev_Access')]) {
                    script {
	                    // SSH to Bastion
		                sh '''
							chmod 400 "$Dev_Access"
							ssh -i "$Dev_Access" ubuntu@ec2-35-175-253-129.compute-1.amazonaws.com
						'''
                        // First EC2 instance
                        sh '''
                            chmod 400 "$NewPrivateApp"
                            ssh -i "$NewPrivateApp" ubuntu@ec2-35-175-253-129.compute-1.amazonaws.com << EOF
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
