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
                var $row = $('<tr></tr>');

                $row.append('<td>' + response[i].task + '</td>');
                $row.append('<td>' + response[i].complete + '</td>');
                $('#allTasks').append($row);

                var $deleteButton = $('<td><button class="deleteButton" data-id="' + response[i].id + '">Delete</button></td>');
                $row.append($deleteButton);
                $('#allTasks').append($row);

                var $completeButton = $('<td><button class="completeButton" data-id="' + response[i].id +'">Complete</button></td>');
                $row.append($completeButton);
                $('#allTasks').append($row);
            }
        }
    });
}
// end get task function
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
// end addTask function
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
// end delete function
function updateTask(){
    var thisId = $(this).data('id');
        // var fin = {
        //     complete: true
        // }
        // trying to add a req.body to this as well but not sure how?
    
    console.log('In update function');
    $.ajax({
        method: 'PUT',
        url: '/task/' + thisId,
        //data: fin, I saw this in some put examples online but cannot to get it to work.
        success: function(response){
            console.log('ajax update data', response);
            getTask();
        }
    })
};

// database and DOM do update when click complete button so it does work 
//but I do feel like I should be using req.body and req.params