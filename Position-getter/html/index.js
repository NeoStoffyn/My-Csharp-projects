$(function () {
    function display(bool) {
        if (bool) {
            $("#container").show();
        } else {
            $("#container").hide();
        }
    }
    display(false)
    window.addEventListener('message', function(event) {
        var item = event.data;
        if (item.type === "ui") {
            if (item.status == true) {
                display(true)
            }
            else {
                display(false)
            }
        }
        else if(item.type == "position") {
            document.getElementById('vector').value = item.position
        }
    })
 


    document.onkeyup = function (data) {
        if (data.which == 27) {
            fetch(`https://${GetParentResourceName().toLowerCase()}/exit`, {}).then(response => response.json()).then(resp => {
                console.log(resp.type);
            });
            return
        }
    };

    $("#sumbit").click(function() {
        display(false) 
        display(true)
    })

    window.onload = function () {
        var selectBox = document.getElementById("list");
        selectBox.addEventListener('change', action);
        function action() {
          $.post(`http://${GetParentResourceName()}/changeValue`, JSON.stringify({
                info: this.value
          }));
        }
    }

    var element = document.querySelector('select');

    element.addEventListener('mousedown', function () {
        this.size=6;
    });
    element.addEventListener('change', function () {
        this.blur();
    });
    element.addEventListener('blur', function () {
        this.size=0;
    });
})

function myFunction(info) {			
    var copyText = document.getElementById(info);
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
}
 

