

$(function () {

    function display(bool) {
        if (bool) {
            $("#container").slideDown(400);
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
            } else {
                display(false)
            }
        }
    })
    document.onkeyup = function (data) {
        if (data.which == 27) {
            closeUI()
            return
        }
    };
    $('#overlay, .deleteMeetingCancel, .deleteMeetingClose').click(function () {
        closeUI()
    });

    


    $("#sumbit").click(function() {
        if (getCheckedCheckboxesFor("Neo") != null || document.getElementById("input").value != null) {
            closeUI()
            console.log(getCheckedCheckboxesFor("Neo"))
            $.post(`http://${GetParentResourceName()}/reportAction`, JSON.stringify({
                checkBoxs: getCheckedCheckboxesFor("Neo"),
                text:document.getElementById("input").value
            }));    
        }         
    })
}) 

function closeUI() {
    
    $.post(`http://${GetParentResourceName()}/exit`, JSON.stringify({}));
}



function getCheckedCheckboxesFor(checkboxName) {
    var checkboxes = document.querySelectorAll('input[name="' + checkboxName + '"]:checked'), values = [];
    Array.prototype.forEach.call(checkboxes, function(el) {
        values.push(el.value);
    });
    return values;
}
    


