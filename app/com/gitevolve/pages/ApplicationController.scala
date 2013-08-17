package com.gitevolve.pages

import play.api._
import play.api.mvc._

object Application extends Controller {
  
  def index = Action {
    Ok(com.gitevolve.pages.html.index())
  }

}
