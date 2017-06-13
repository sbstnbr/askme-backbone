node ('docker') {

  // environment {
  //   PHANTOMJS_BIN = '/tools/jenkins.plugins.nodejs.tools.NodeJSInstallation/ADOP_NodeJS/lib/node_modules/phantomjs'
  //   // URL on which performace tests should be performed
  //   PERF_URL = 'http://mycomp-backbone-demo-test.52.233.140.114.xip.io/'
  //   // Maximum response time for performance tests (in milisec)
  //   MAX_RESPONSE_TIME = 1000
  // }

  // tools {
  //   nodejs 'ADOP NodeJS'
  //   maven 'ADOP Maven'
  // }

  stage ('Initialize') {
    git url: 'ssh://jenkins@gerrit:29418/ExampleWorkspace/ExampleProject/askme-backbone'
    sh 'yum install bzip2 -y'
    sh 'npm install'
    sh 'bower install --allow-root'
    sh 'node -v'
    sh 'npm --version'
    sh 'grunt --version'
  }

  stage ('Code Analysis') {
    //sh 'grunt jshint:dist --force'
  }

  stage ('Unit Tests') {
    // sh 'echo $PHANTOMJS_BIN'
    // sh 'grunt test'
    // sh 'grunt plato'
  }

  stage ('Build') {
    openshiftBuild(namespace: 'demo-dev', bldCfg: 'mycomp-backbone', showBuildLogs: 'true')
  }

  stage ('Deploy Dev') {
    openshiftDeploy(namespace: 'demo-dev', depCfg:  'mycomp-backbone')
  }

  stage ('Security Tests') {
    // echo 'TO DO with OWASPZAP'
  }

  stage ('Functional Tests') {
    // sh 'grunt acceptance'
  }

  stage ('Deploy Test') {
    openshiftTag(namespace: 'demo-dev', sourceStream:'mycomp-backbone', sourceTag:'latest', destinationStream:'mycomp-backbone', destinationTag:'promoteToTest')
    openshiftDeploy(namespace: 'demo-test', depCfg:  'mycomp-backbone')
    openshiftScale(namespace: 'demo-test',  depCfg:  'mycomp-backbone', replicaCount: '2')
  }

  stage ('Performance Tests') {
    // git url: 'ssh://jenkins@gerrit:29418/ExampleWorkspace/ExampleProject/askme-performance'
    // sh 'sed -i "s/###TOKEN_VALID_URL###/${PERF_URL}/g" ${WORKSPACE}/src/test/scala/default/RecordedSimulation.scala'
    // sh 'sed -i "s/###TOKEN_RESPONSE_TIME###/${MAX_RESPONSE_TIME}/g" ${WORKSPACE}/src/test/scala/default/RecordedSimulation.scala'
    // sh 'mvn gatling:execute' 
  }

  stage ('Deploy Prod') {
    openshiftTag(namespace: 'demo-dev', sourceStream:'mycomp-backbone', sourceTag:'latest', destinationStream:'mycomp-backbone', destinationTag:'promoteToProd')
    openshiftDeploy(namespace: 'demo-prod', depCfg:  'mycomp-backbone')
    openshiftScale(namespace: 'demo-prod',  depCfg:  'mycomp-backbone',replicaCount: '2')
  }
}
