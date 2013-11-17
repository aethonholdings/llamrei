package com.llamrei.domain

class StateModel {
    Asset asset
    String name
    String description
    String stateModelId

    static constraints = {
//        stateModelId(unique: true)
    }
    static hasMany = [states:State]

    static mapping = {
        stateModelId column: "stateModelId"
        name column: "name"
        description column: "description"
    }

    @Override
    public String toString() {
        return "StateModel{" +
                "id=" + id +
                ", asset=" + asset +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", stateModelId='" + stateModelId + '\'' +
                ", version=" + version +
                ", states=" + states +
                '}';
    }
}
