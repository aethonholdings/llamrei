<%--
  Created by IntelliJ IDEA.
  User: aman
  Date: 9/21/12
  Time: 3:15 PM
  To change this template use File | Settings | File Templates.
--%>

<%@ page import="com.llamrei.domain.SecUser; com.llamrei.domain.SecUserSecRole; com.llamrei.domain.SecRole" contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <meta name="layout" content="main"/>

</head>

</head>
<body>
%{-- <div align="center">
    <h2 style="text-transform: uppercase;">Administration</h2>
</div>--}%
<div class='menuItem'>
    <h2>Administration</h2>
    <div style="margin-left: 20px;font-size: 20px;border:1px solid">
    <div class="body">
        <g:if test="${flash.message}">
            <div class="message">${flash.message}</div>
        </g:if>
        <g:hasErrors bean="${userInstance}">
            <div class="errors">
                <g:renderErrors bean="${userInstance}" as="list"/>
            </div>
        </g:hasErrors>


        <g:form method="post">
            <g:hiddenField name="id" value="${userInstance?.id}"/>
            <g:hiddenField name="version" value="${userInstance?.version}"/>
            <table style='border:0px'>
                <tbody>

                <tr class="prop">
                    <td valign="top" class="name">
                        <label for="username"><g:message code="user.username.label"
                                                         default="Username"/></label>
                    </td>
                    <td valign="top"
                        class="value ${hasErrors(bean: userInstance, field: 'username', 'errors')}">
                        <g:textField class='textInput' name="username" value="${userInstance?.username}" />
                    </td>
                </tr>



                <tr class="prop">
                    <td valign="top" class="name">
                        <label for="userRole"><g:message code="user.Role.label"
                                                         default="Role"/></label>
                    </td>
                    <g:if test="${SecUserSecRole.findBySecUser(userInstance)!=null}" >
                        <td valign="top">
                            <g:select class='textInput' from="${SecRole.list()}" optionKey="authority" optionValue="authority" value="${role.authority}" name="userRole"
                                      style="width: 300px;"/>
                        </td>
                    </g:if>
                    <g:else>
                        <td valign="top">
                            <g:select  class='textInput'  from="${SecRole.list()}" optionKey="authority" optionValue="authority" value="" name="userRole"  noSelection="['':'-Choose role-']"
                                       style="width: 300px;"/>
                        </td>
                    </g:else>
                </tr>

                <tr class="prop">
                    <td valign="top" class="name">
                        <label for="accountExpired"><g:message code="user.accountExpired.label"
                                                               default="Account Expired"/></label>
                    </td>
                    <td valign="top"
                        class="value ${hasErrors(bean: userInstance, field: 'accountExpired', 'errors')}">
                        <g:checkBox name="accountExpired" value="${userInstance?.accountExpired}"/>
                    </td>
                </tr>

                <tr class="prop">
                    <td valign="top" class="name">
                        <label for="accountLocked"><g:message code="user.accountLocked.label"
                                                              default="Account Locked"/></label>
                    </td>
                    <td valign="top"
                        class="value ${hasErrors(bean: userInstance, field: 'accountLocked', 'errors')}">
                        <g:checkBox name="accountLocked" value="${userInstance?.accountLocked}"/>
                    </td>
                </tr>

                <tr class="prop">
                    <td valign="top" class="name">
                        <label for="email"><g:message code="user.email.label" default="Email"/></label>
                    </td>
                    <td valign="top" class="value ${hasErrors(bean: userInstance, field: 'email', 'errors')}">
                        <g:textField class='textInput' name="email" value="${userInstance?.email}"/>
                    </td>
                </tr>

                <tr class="prop">
                    <td valign="top" class="name">
                        <label for="enabled"><g:message code="user.enabled.label" default="Enabled"/></label>
                    </td>
                    <td valign="top"
                        class="value ${hasErrors(bean: userInstance, field: 'enabled', 'errors')}">
                        <g:checkBox name="enabled" value="${userInstance?.enabled}"/>
                    </td>
                </tr>

                <tr class="prop">
                    <td valign="top" class="name">
                        <label for="passwordExpired"><g:message code="user.passwordExpired.label"
                                                                default="Password Expired"/></label>
                    </td>
                    <td valign="top"
                        class="value ${hasErrors(bean: userInstance, field: 'passwordExpired', 'errors')}">
                        <g:checkBox name="passwordExpired" value="${userInstance?.passwordExpired}"/>
                    </td>
                </tr>

                </tbody>
            </table>
            </div>

            <div style='display: inline; width: 500px'>
            <g:actionSubmit  action="updateUser" class='actionButton' value="Update">Update</g:actionSubmit>
        %{-- <span class="button"><g:actionSubmit class="delete" action="delete"
                                              value="${message(code: 'default.button.delete.label', default: 'Delete')}"
                                              onclick="return confirm('${message(code: 'default.button.delete.confirm.message', default: 'Are you sure?')}');"/></span>--}%

        </g:form>
        <g:form controller="userManagement" onsubmit="remove()" style= 'display: inline' action="remove" params="[id:userInstance.id]"><button value='Delete User' onclick=" return confirm('Are you sure you want to delete this user?');" id='deleteButton' class="actionButton" >Delete</button></g:form>

        <g:link controller="userManagement" style= 'display: inline'  action="changePwd" params="[id:userInstance.id]"><button value='Reset password' class="actionButton">Reset password</button></g:link>
        <g:link  action="list"   value="Cancel"><button value='Cancel' class="actionButton">Cancel</button></g:link>



    </div>

    </div>

</div>


</body>
</html>