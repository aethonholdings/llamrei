<%@ page import="com.llamrei.domain.StateModel" %>
<%@page defaultCodec="html" %>
<html>
<head>
    <meta name="layout" content="main"/>
</head>

<body>
<div>
    <h2>Edit state model </h2>

    <div class="body">
        <g:if test="${flash.message}">
            <div class="message">${flash.message}</div>
        </g:if>
        <g:hasErrors bean="${stateModelInstance}">
            <div class="errors">
                <g:renderErrors bean="${stateModelInstance}" as="list"/>
            </div>
        </g:hasErrors>
        <g:form method="post">
            <g:hiddenField name="id" value="${stateModelInstance?.id}"/>
            <g:hiddenField name="stateModelId" value="${stateModelInstance?.id}"/>
            <g:hiddenField name="version" value="${stateModelInstance?.version}"/>
            <div class="dialog">
                <table>
                    <tbody>

                    <tr class="prop">
                        <td valign="top" class="name">
                            <label for="description"><g:message code="stateModel.description.label"
                                                                default="Description"/></label>
                        </td>
                        <td valign="top"
                            class="value ${hasErrors(bean: stateModelInstance, field: 'description', 'errors')}">
                            <g:textArea name="description" value="${stateModelInstance?.description}" rows="5" cols="16"/>
                        </td>
                    </tr>

                    <tr class="prop">
                        <td valign="top" class="name">
                            <label for="name"><g:message code="stateModel.name.label" default="Name"/></label>
                        </td>
                        <td valign="top" class="value ${hasErrors(bean: stateModelInstance, field: 'name', 'errors')}">
                          <g:textField name="name" value="${stateModelInstance?.name}"/>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div>
                                <div>
                                    <span><g:message code="title.states"/></span></a>
                                </div>

                                <div class="box-card-hold">
                                    <div style="position:relative">
                                        <div id="states">
                                            <g:render template="states"
                                                      model="[states: stateModelInstance?.states, stateModelId: stateModelInstance?.id]"/>
                                        </div>
                                        <g:hiddenField name="stateIdToBeModified" value="" />
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>

            <div style='display: inline; width: 500px'>
            <g:actionSubmit action="update" class='actionButton' value="Update">Update</g:actionSubmit>
        </g:form>
        <g:form controller="stateModel" style='display: inline' action='edit'
                params="[delete: true, id: stateModelInstance?.id]">
            <button value='Delete state model' onclick="  confirm('Are you sure you want to delete this State Model?');
            alert('you must define a new stateModel');" id='deleteButton' class="actionButton">
                Delete
            </button>
        </g:form>
        <g:form controller="assetManagement" style='display: inline' action="editAsset"
                params="[id: stateModelInstance?.asset?.id]"
                value="Cancel"><button value='Cancel' class="actionButton">Cancel</button></g:form>
        <g:form controller="stateModel" style='display: inline' action="copy" value="copy"
                params="[stateModelId: stateModelInstance?.id]"><button value='Copy'
                                                                        class="actionButton">Copy</button></g:form>
    </div>
    </div>
</div>
<script type="text/javascript">

    function toggleSlide(element) {
        var parent = $(element).is('.box-cards') ? element : $(element).parents('.box-cards');

        if ($(parent).is('.box-cards-open')) {
            closeSlide(parent);
        } else {
            openSlide(parent);
        }
    }

    function openSlide(parent) {
        if ($(parent).not('.box-cards-open')) {
            $(parent).addClass('box-cards-open');
            $(parent).find('.box-card-hold').slideDown(500, function () {
                eval($(parent).attr('onOpen'));
                eval($(parent).attr('onSlide'));
            });
        }
    }

    function closeSlide(parent) {
        if ($(parent).is('.box-cards-open')) {
            $(parent).removeClass('box-cards-open');
            $(parent).find('.box-card-hold').slideUp(500, function () {
                eval($(parent).attr('onClose'));
                eval($(parent).attr('onSlide'));
            });
        }
    }

    $(document).ready(function () {
        // hide closed box-cards
        $('.box-cards').each(function () {
            if (!$(this).is('.box-cards-open'))
                $(this).find('.box-card-hold').css('display', 'none');
        });

        // toggle box-cards on click
        $('a.btn-open', '.box-cards').click(function () {
            toggleSlide(this);
            return false;
        });
    });

    function showStateForm() {
        $('#stateForm').toggle();
    }
    %{--function addState() {--}%
        %{--var stateRulesCount = 0;--}%
        %{--$('#stateRulesTable tbody tr.stateRule').each(function () {--}%
            %{--stateRulesCount++;--}%
        %{--});--}%
        %{--$('#stateRulesCount').val(stateRulesCount);--}%

        %{--$.ajax({--}%
            %{--type:'POST',--}%
            %{--url:'${createLink(action: 'addState')}',--}%
            %{--data:$('div#state-form').parents('form').serialize(),--}%
            %{--success:function (data) {--}%
                %{--$('div#states').html(data);--}%
                %{--srIndex = 0;--}%
            %{--}--}%
        %{--});--}%
    %{--}--}%


    function deleteState(id) {
        alert("You are about to delete a state");

        $.ajax({
            type:'POST',
            url:'${createLink(controller: 'stateModel', action: 'deleteState')}',
            data:{stateId:id},
            success:function (data) {
                $('tr#state-' + id).remove();
            }
        });
    }
    function deleteStateRule(id) {
        alert("You are about to delete a state rule");

        $.ajax({
            type:'POST',
            url:'${createLink(controller: 'stateModel', action: 'deleteStateRule')}',
            data:{stateRuleId:id},
            success:function (data) {
                $('tr#stateRule-' + id).remove();
            }
        });
    }

    var srIndex = 0;
    function addStateRuleRow(stateId) {
        showBlock();
        $('#stateIdToBeModified').val(stateId);
        $.ajax({
            type:'POST',
            url:'${createLink(controller: 'stateModel', action: 'addStateRule')}',
            data:$('div#states').parents('form').serialize(),
            success:function (data) {
                $('div#states').html(data);
            }
        });
    }
    $(document).ajaxStop($.unblockUI);
    function addStateRow() {

        showBlock();

        $.ajax({

            type:'POST',
            url:'${createLink(controller: 'stateModel', action: 'addState')}',
            data:$('div#states').parents('form').serialize(),

            success:function (data) {
                $('div#states').html(data);
            }
        });
    }

    function showBlock(){
        $.blockUI({ css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        } });

       setTimeout($.unblockUI, 7000);
    }





</script>
</body>
</html>
