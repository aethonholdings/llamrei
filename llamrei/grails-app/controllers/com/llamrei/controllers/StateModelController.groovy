package com.llamrei.controllers

import com.llamrei.domain.State
import com.llamrei.domain.StateRule
import com.llamrei.domain.TimeSeries
import grails.plugins.springsecurity.Secured
import com.llamrei.domain.StateModel
import com.llamrei.domain.Asset
@Secured(['ROLE_ADMIN'])
class StateModelController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index = {
        redirect(action: "list", params: params)
    }

    def list = {
        params.max = Math.min(params.max ? params.int('max') : 10, 100)
        [stateModelInstanceList: StateModel.list(params), stateModelInstanceTotal: StateModel.count()]
    }

    def create = {
        def stateModelInstance = new StateModel()
        stateModelInstance.properties = params
        return [stateModelInstance: stateModelInstance]
    }

    def save = {
        println ">>params : "+params
        def stateModelInstance = new StateModel(params)
        println "stateModel to be saved : "+stateModelInstance
        if (stateModelInstance.save(flush: true)) {
            flash.message = "${message(code: 'default.created.message', args: [message(code: 'stateModel.label', default: 'StateModel'), stateModelInstance.id])}"
            redirect(action: "edit", id: stateModelInstance.id)
        }
        else {
            render(view: "create", model: [stateModelInstance: stateModelInstance])
        }
    }

    def show = {
        def stateModelInstance = StateModel.get(params.id)
        if (!stateModelInstance) {
            flash.message = "${message(code: 'default.not.found.message', args: [message(code: 'stateModel.label', default: 'StateModel'), params.id])}"
            redirect(action: "list")
        }
        else {
            [stateModelInstance: stateModelInstance]
        }
    }

    def edit = {
        def stateModelInstance
        if (params.assetId){
            println "finding state model by asset id "+params.assetId
            Integer assetId = Integer.parseInt(params.assetId)
            stateModelInstance = StateModel.findByAsset(Asset.findById(assetId.longValue()))
        } else if (params.id){
            println "finding state model by id "+params.id
            stateModelInstance = StateModel.get(params.id)
        }

        if (params.delete) {
            stateModelInstance.name = ""
            stateModelInstance.description = ""
            stateModelInstance.stateModelId = ""
        }
        println "State model : "+stateModelInstance


        println "cominggg"
        if (!stateModelInstance) {
            println "not model ins"
            flash.message = "${message(code: 'default.not.found.message', args: [message(code: 'stateModel.label', default: 'StateModel'), params.id])}"
            redirect(action: "edit")
        }
        else {
            println "model instance"
            return [stateModelInstance: stateModelInstance]
            redirect(controller: StateModel, action: edit)
        }
    }

    def update = {
        def stateModelInstance = new StateModel(params)

        def _toBeRemoved = stateModelInstance.states.findAll {!it}

        // if there are states to be removed
        if (_toBeRemoved) {
            stateModelInstance.states.removeAll(_toBeRemoved)
        }

        //update my indexes
        stateModelInstance.states.eachWithIndex(){state, i ->
            if(state)
                state.index = i
        }

        println "Prams in update : "+params
         stateModelInstance=StateModel.get(params.id)
        if (stateModelInstance) {
            if (params.version) {
                def version = params.version.toLong()
                if (stateModelInstance.version > version) {

                    stateModelInstance.errors.rejectValue("version", "default.optimistic.locking.failure", [message(code: 'stateModel.label', default: 'StateModel')] as Object[], "Another user has updated this StateModel while you were editing")
                    render(view: "edit", model: [stateModelInstance: stateModelInstance])
                    return
                }
            }
            stateModelInstance.properties = params
            if (!stateModelInstance.hasErrors() && stateModelInstance.save(flush: true)) {
                flash.message = "${message(code: 'default.updated.message', args: [message(code: 'stateModel.label', default: 'StateModel'), stateModelInstance.id])}"
                redirect(action: "edit", id: stateModelInstance.id)
            }
            else {
                render(view: "edit", model: [stateModelInstance: stateModelInstance])
            }
        }
        else {
            flash.message = "${message(code: 'default.not.found.message', args: [message(code: 'stateModel.label', default: 'StateModel'), params.id])}"
            redirect(action: "edit")
        }
    }

    def delete = {
        println "params in delete : "+params
        Integer assetId = Integer.parseInt(params.id)
        def stateModelInstance = StateModel.findByAsset(Asset.findById(assetId.longValue()))
        if (stateModelInstance) {
            try {
                stateModelInstance.delete(flush: true)
                flash.message = "${message(code: 'default.deleted.message', args: [message(code: 'stateModel.label', default: 'StateModel'), params.id])}"
                redirect(action: "edit")
            }
            catch (org.springframework.dao.DataIntegrityViolationException e) {
                flash.message = "${message(code: 'default.not.deleted.message', args: [message(code: 'stateModel.label', default: 'StateModel'), params.id])}"
                redirect(action: "edit", id: params.id)
            }
        }
        else {
            flash.message = "${message(code: 'default.not.found.message', args: [message(code: 'stateModel.label', default: 'StateModel'), params.id])}"
            redirect(action: "edit")
        }
    }
    def copy ={
        println ">>paramsin copy : "+params
        [stateModelId:params.stateModelId]
    }

    def copyStateModel = {
        println ">>paramsin copy state model : "+params

        StateModel stateModelToBeCopied = null
        if (params.assetId){
            Integer assetId = Integer.parseInt(params.assetId)
            Asset asset = Asset.findById(assetId.longValue())
            stateModelToBeCopied = StateModel.findByAsset(asset)
            println "stateModelToBeCopied : "+stateModelToBeCopied
        }

        StateModel stateModel = null
        if (params.stateModelId) {
            stateModel = StateModel.get(params.stateModelId)
            println("statemodel to copy into : "+stateModel)
        }

        if (null!=stateModelToBeCopied && null!=stateModel){
            stateModel.setName(stateModelToBeCopied.name)
            stateModel.setDescription(stateModelToBeCopied.description)
            println "validate :"+stateModel.validate()
            if (stateModel.save(flush: true)) {
                println "statemodel copied"
                redirect(action: 'edit',id: stateModel.id )
            } else {
                flash.message = "Could not copy statemodel"
                redirect(action: 'copy', stateModelId:params.stateModelId )
            }

        } else {
            flash.message = "Could not find asset"
            redirect(action: 'copy', stateModelId:params.stateModelId )
        }
    }

    def addState = {
        println ">>>>>"+params
        println ">>>SR>>"+params.stateRule

        StateRule stateRule
        Set<StateRule> stateRules
        params.stateRule.each{ sr ->
            println "sr : " +sr
            /*stateRule = new StateRule()
            stateRule.setRuleType(sr.ruleType)
            stateRule.setRuleValue1(sr.ruleValue)
            stateRule.setTimeSeriesId(sr.timeSeries)

            println "StateRule to be saved : "+stateRule
            stateRules.add(stateRule)*/
        }

        StateModel stateModel = StateModel.get(params.int('stateModelId'))
        println "found state model : "+stateModel
        State state = new State()
        state.setName(params.state.name)
        state.setDescription(params.state.description)
        state.setStateModel(stateModel)
        state.setStateRules(stateRules)

        println "going to save state : "+state
        if(state.validate()) {
            state.save(flush: true)
            println "state saved :)"
        } else {
            println "Could not save the state :("
        }

        Set states = stateModel.states
        states.add(state)
        render template: 'states', model: [states:states, stateModelId:stateModel.id]
    }
}
