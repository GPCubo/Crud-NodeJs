"use strict";var userInfoForm=document.getElementById("user-info-form"),userName=document.getElementById("user-info-name"),userSurname=document.getElementById("user-info-surname"),userEmail=document.getElementById("user-info-email"),contentUsers=document.getElementById("content-users"),userInfoButton=document.getElementById("user-info-button"),userInfoTitle=document.getElementById("user-info-title"),userInfo=document.getElementById("user-info");contentUsers.addEventListener("click",function(e){e.target.classList.contains("button--edit")?(userName.value=e.target.parentElement.children[0].textContent,userSurname.value=e.target.parentElement.children[1].textContent,userEmail.value=e.target.parentElement.children[2].textContent,userInfoButton.textContent="Update User",userInfoTitle.textContent="Update User",userInfoForm.action="/update-user/".concat(e.target.parentElement.dataset.id)):e.target.classList.contains("button--delete")&&fetch("/delete-user/".concat(e.target.parentElement.dataset.id),{method:"DELETE"}).then(function(e){return e.json()}).then(function(e){e.ok&&location.reload()})}),userInfo.addEventListener("click",function(e){e.target.classList.contains("button--cancel")&&(userInfoTitle.textContent="New User",userInfoButton.textContent="Add User",userInfoForm.action="/add-user",userName.value="",userSurname.value="",userEmail.value="")}),userInfoForm.addEventListener("submit",function(e){e.preventDefault(),""!=userName.value.trim()&&""!=userSurname.value.trim()&&""!=userEmail.value.trim()?e.target.submit():alert("Falta igresar datos")});