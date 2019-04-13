#!/usr/bin/env groovy

node('linux'){
    def node = tool name: 'Node11.13', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    env.PATH = "${node}/bin:${env.PATH}"
    def npmGlobalPath = sh(script: 'npm bin -g', returnStdout: true).trim()
    env.PATH = "${npmGlobalPath}:${env.PATH}"

    @Library('react-build-shared-library')_
        
    stage('Setup') {
        setUpApplication.setup()
    }

    stage('Checkout') {
        checkoutApplication.checkout()
    }

    stage('Build') {
        buildApplication.build()
    }

    stage('Test'){
        env.CI=true
        sh "yarn test"
    }

    stage('Deploy to GH Pages'){
        try{
            sh "gh-pages --version"
        } catch (error) {
            sh "npm i -g gh-pages"
        }
        if(env.BRANCH_NAME == 'master'){
            withCredentials([string(credentialsId: 'github-email', variable: 'EMAIL')]) {
                sh 'git config --global user.email "$EMAIL" && git config --global user.name "shultztom" && yarn deploy'
            }
        }else{
            echo 'Not deploying since not master branch'
        }
    }

   stage('Clean Up'){
       cleanUpApplication.cleanUp()
   }    
}
