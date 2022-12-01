/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

function Notification(type, message) {
    if(type == true) {
        Toastify({ text: message,
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true, 
            className: "info",
        }).showToast();
    } else {
        Toastify({ text: message,
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true, 
            className: "info",
            style: {
                background: "linear-gradient(to right, #ff5f6d, #ffc371)",
            }
        }).showToast();
    }
} window.Notification = Notification;

fetch("http://" + window.location.host + "/userSession").then(function(response) {
    return response.json();
    }).then(function(data) {
        if(data.config.firstLaunch == true) {
            window.location.href = "setup";
        }
        if(data.config.experimental == true) {
            document.getElementById("experimentalNav").style.display = "flex";
        } else {
            if(!window.location.href.includes("dashboard")) {
                window.location.href = "dashboard";
            }
        }
        if(data.config.webTooltips == true) {
            $(document).ready(function(){
                $('[data-toggle="tooltip"]').tooltip({
                    trigger : 'hover', 
                    container: 'body'
                });
            }); 
        }
        //grabs and sets the session data
        document.getElementById("username").textContent = data.session.game_name + "#" + data.session.game_tag;
        document.getElementById("usernameNav").textContent = data.session.game_name + "#" + data.session.game_tag;
        document.getElementById("connectionLabel").textContent = data.session.resource + " | " + data.session.state;
        document.getElementById("accountName").textContent = `Account Name | ${data.session.name.length == 0 ? data.session.game_name : data.session.name}`;
        document.getElementById("pid").textContent = "PlayerID | " + data.session.puuid;
        document.getElementById("region").textContent = "Region | " + data.session.region;
        document.getElementById("port").textContent = "Session Port | " + data.port;
        document.getElementById("password").textContent = "Lockpass | " + data.password;
        document.getElementById("discordRpc").value = data.config.discordRpc;
        document.getElementById("experimentalFeatures").value = data.config.experimental;
        document.getElementById("webTooltips").value = data.config.webTooltips;
        document.getElementById("scripts").value = data.config.scripts;
    }).catch(function(error) {
    console.log(error);
});
