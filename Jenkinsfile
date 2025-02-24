pipeline {
    agent any

    tools {
        // Install the Maven version configured as "M3" and add it to the path.
        maven "M3"
    }

    triggers{
      pollSCM('* * * * *')
    }

    stages {
        
        stage('Checkout'){
            steps {
                // Get some code from a GitHub repository
                git branch: 'develop-isa', url: 'https://github.com/MiquelGomezCorral/miquelgc-portfolio.git' 
            }
        }
        
        stage('Build') {
            steps {
                bat 'mvn clean compile'
                
            }            
        }
        
        stage('Package'){
            steps{
                bat 'mvn package'
            }
            
            
        }
    }
    post {
      // If Maven was able to run the tests, even if some of the test
      // failed, record the test results and archive the jar file.
      success{
        archiveArtifacts 'target/*.jar'
      }
      always {
        junit '**/target/surefire-reports/TEST-*.xml'
      }
      // changed{
      //     emailext subject: "Job '${JOB_NAME}' (${BUILD_NUMBER})",
      //     body: "Please go to ${BUILD_URL} and verify the build",
      //     attachLog: true,
      //     compressLog: true,
      //     to: 'isabel.valles-bertomeu.external@capgemini.com'
      // }      
    }
}