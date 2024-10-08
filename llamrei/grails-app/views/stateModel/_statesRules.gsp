<div class="table-box">
    <table  id="stateRulesTable">
        <thead>
        <tr class="ui-widget-header">
        <th width="50px"><g:message code="title.stateRule.timeSeries"/></th>
        <th width="50px"><g:message code="title.stateRule.ruleType"/></th>
        <th width="50px"><g:message code="title.stateRule.ruleValue"/></th>
        </thead>
        <tbody>
        <g:each in="${stateRules}" var="stateRule">
            <tr class="stateRule">
                <td>${stateRule.timeSeries}</td>
                <td>${stateRule.ruleType}</td>
                <td>${stateRule.ruleValue1}</td>
            </tr>
        </g:each>
        <tr>
            <td colspan="3">
                <a onclick="showStateRulesForm()" class="actionButton">
                    <span><g:message code="button.add.state.rule"/></span>
                </a>
            </td>
        </tr>
        </tbody>
    </table>
</div>
<g:hiddenField name="stateRulesCount" value=""/>
<div id="stateRuleForm" style="display: none">
     <g:render template="stateRulesForm" model="[stateModelId:stateModelId]" />
</div>