import sbt._
import Keys._
import play.Project._
import com.gu.SbtJasminePlugin._

object ApplicationBuild extends Build {

  val appName         = "gitEvolve"
  val appVersion      = "1.0-SNAPSHOT"

  val appDependencies = Seq(
    // Add your project dependencies here,
    jdbc,
    anorm,
    "org.mockito" % "mockito-all" % "1.9.5" % "test",
    "com.typesafe" %% "scalalogging-slf4j" % "1.0.1",
    "com.google.inject" % "guice" % "3.0",
    "com.tzavellas" % "sse-guice" % "0.7.1"
  )

  val main = play.Project(appName, appVersion, appDependencies).
    // Add your own project settings here      
    settings(jasmineSettings : _*).
    settings(
      // jasmine configuration, overridden as we don't follow the default project structure sbt-jasmine expects
      appJsDir <+= baseDirectory / "app/assets/js",
      appJsLibDir <+= baseDirectory / "public/js",
      jasmineTestDir <+= baseDirectory / "test/assets/",
      jasmineConfFile <+= baseDirectory / "test/assets/test.dependencies.js",
      jasmineRequireJsFile <+= baseDirectory / "public/js/require.js",
      jasmineRequireConfFile <+= baseDirectory / "test/assets/require.conf.js",

      // link jasmine to the standard 'sbt test' action. 
      (test in Test) <<= (test in Test) dependsOn (jasmine))
}
