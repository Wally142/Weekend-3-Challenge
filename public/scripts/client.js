$(document).ready(onReady);

function onReady(){
    console.log('giddy up');
    $('#addButton').on('click', addTask);
    $('#allTasks').on('click', ".deleteButton", deleteTask);
    $('#allTasks').on('click', ".completeButton", updateTask);
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

                var $deleteButton = $('<td><button class="deleteButton" data-id="' + task.id + '">Delete</button></td>');
                $row.append($deleteButton);
                $('#allTasks').append($row);

                var $completeButton = $('<td><button class="completeButton" data-id="' + task.id +'">Complete</button></td>');
                $row.append($completeButton);
                $('#allTasks').append($row);
            }
        }
    });
}

function addTask(){
    console.log('click worked');
    var objectToSend = {
        task: $('#taskAdd').val(),
        complete: false
    }
        //adding task to DOM and database
        $('#taskAdd').val('');
    
    $.ajax ({
        method: 'POST',
        url: '/task',
        data: objectToSend,
        success: function(response){
        console.log('Post Up', response);
        getTask();
        //end ajax post call
        }
    });
}

function deleteTask(){
    var thisId = $(this).data('id');
    console.log('In Delete function');
    $.ajax({
        method: 'DELETE',
        url: '/task/' + thisId,
        success: function(response){
            console.log('ajax delete data', response);
            getTask();
        }
    })
}

function updateTask(){
    var thisId = $(this).data('id');
    var fin = {
        complete: true
    }
    console.log('In update function');
    $.ajax({
        method: 'PUT',
        url: '/task/' + thisId,
        data: fin,
        success: function(response){
            console.log('ajax update data', response);
            getTask();
        }
    })

}