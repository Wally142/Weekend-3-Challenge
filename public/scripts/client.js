$(document).ready(onReady);

function onReady(){
    console.log('giddy up');
    $('#addButton').on('click', addTask);
    getTask();
}

function getTask(){
   $.ajax ({
        method: 'GET',
        url: '/task',
        success: function(response){
            console.log('Get Set');
            $('#allTasks').empty();
            for (var i = 0; i < response.length; i++) {
                var task = response[i];
                var $row = $('<tr></tr>');

                $row.append('<td>' + task + '</td>');
                $('#allTasks').append($row);
                
            }
        }
    });
}

function addTask(){
    console.log('click worked');
    var objectToSend = {
        task: $('#taskAdd').val()
    }
        
        $('#taskAdd').val('');
    
    $.ajax ({
        method: 'POST',
        url: '/task',
        data: objectToSend,
        success: function(response){
        console.log('Post Up', response);
        }
    });
}
