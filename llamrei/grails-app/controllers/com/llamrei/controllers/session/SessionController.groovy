package com.llamrei.controllers.session

import org.codehaus.groovy.grails.plugins.springsecurity.SpringSecurityUtils

class SessionController {
    static scaffold = true

    def index = {
        //Only admin users can create, edit, list the downloads
        //Regular users can randomise the downloads.
        if (SpringSecurityUtils.ifAllGranted("ROLE_ADMIN")){
            redirect(controller: "assetManagement", action: "index")
        }
        else if((SpringSecurityUtils.ifAllGranted("ROLE_OPERATOR"))){
            redirect(controller: 'dashboard', action: 'view')
        } else {
            redirect(controller: "dashboard", action: "view")
        }
    }
}
