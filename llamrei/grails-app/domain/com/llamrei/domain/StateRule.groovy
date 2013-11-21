package com.llamrei.domain

class StateRule {

    String stateRuleId
    String ruleType
    String timeSeriesId
    String ruleValue1
    String ruleValue2
    
    static belongsTo = [state: State]
    
    static constraints = {
        stateRuleId(nullable: true)
        ruleValue2(nullable: true)
    }

    static mapping = {
        stateRuleId column: "stateRuleId"
        ruleType column: "ruleType"
        timeSeriesId column: "timeSeriesId"
        ruleValue1   column  : "ruleValue1"
        ruleValue2   column  : "ruleValue2"
    }

    @Override
    public String toString() {
        return "StateRule{" +
                "id=" + id +
                ", stateRuleId='" + stateRuleId + '\'' +
                ", ruleType='" + ruleType + '\'' +
                ", timeSeriesId='" + timeSeriesId + '\'' +
                ", ruleValue1='" + ruleValue1 + '\'' +
                ", ruleValue2='" + ruleValue2 + '\'' +
                ", version=" + version +
                ", state id=" + state.id +
                '}';
    }
}
