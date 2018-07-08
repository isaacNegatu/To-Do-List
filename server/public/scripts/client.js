
let toDoApp = angular.module('myApp',['ngMaterial'])
.controller('ToDoController' , [ '$http' ,'$mdDialog', function ($http, $mdDialog) {

  let self = this;

  self.views = {
    addTask : false,
    allTasks : true,
    tasksDone : false,
    unfinished : true,
    stats : false
  };


  self.showView = function(view){
    for(let v in self.views){
      if (v == view){
        self.views[v] = true;
      }else{
        self.views[v] = false;
      }
    }
  };





  self.addNewTask = function(newTask, ev){

    $http({
      url : '/todo',
      method : 'POST',
      data : newTask
    }).then(function (response) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('New Task Added')
          .textContent('You can specify some description text in here.')
          .ok('Got it!')
          .targetEvent(ev)
      );
      console.log(response);

    }).catch(function (err) {
      console.log(err);
    });


    console.log(newTask);


  };


  self.getAllTasks = function() {

    $http({
      url : '/todo',
      method : 'GET'
    }).then(function (response) {
      console.log(response);
    }).catch(function (err) {
      console.log(err);
    });
  };




}]);
