let toDoApp = angular.module('myApp', ['ngMaterial'])
  .controller('ToDoController', ['$http', '$mdDialog', function($http, $mdDialog) {

    let self = this;

    self.currentView = 'ALL TASKS';

    self.toDoList = [];

    self.completed = [];
    self.uncompleted = [];

    self.toBeEdited = {};
    self.progress = 0;

    self.categorizedCount = {
      work : 0,
      school : 0,
      chores : 0,
      grocery : 0,
      miscellaneous : 0
    };

    self.views = {
      addTask: {
        state: false,
        name: 'ADD NEW TASK'
      },
      allTasks: {
        state: true,
        name: 'ALL TASKS'
      },
      completed: {
        state: false,
        name: 'COMPLETED TASKS'
      },
      uncompleted: {
        state: false,
        name: 'UNCOMPLETED TASKS'
      },
      stats: {
        state: false,
        name: 'STATS'
      },
      edit: {
        state: false,
        name: 'EDIT'
      }
    };


    self.showView = function(view) {
      for (let v in self.views) {
        if (v == view) {
          self.views[v].state = true;
          self.currentView = self.views[v].name;
        } else {
          self.views[v].state = false;
        }
      }
    };



    self.getAllTasks = function() {

      $http({
        url: '/todo',
        method: 'GET'
      }).then(function(response) {
        self.toDoList = response.data;
        self.doneNotDone();
        self.setPercentDone();
        self.setCategory();
      }).catch(function(err) {
        console.log(err);
      });
    };

    self.getAllTasks();




    self.addNewTask = function(newTask, ev) {

      $http({
        url: '/todo',
        method: 'POST',
        data: newTask
      }).then(function(response) {
        $mdDialog.show(
          $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('New Task Added')
          .ok('Got it!')
        ).then(function() {
          self.showView('allTasks');
          self.getAllTasks();
        });
        console.log(response);


      }).catch(function(err) {
        console.log(err);
      });

    };



    self.markDone = function(task) {
      task.status = true;
      $http({
        url: `/todo/${task._id}`,
        method: 'PUT',
        data: task
      }).then(function(response) {
        $mdDialog.show(
          $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('You Did It!!! Congratulations ')
          .ok('Got it!')
        ).then(function() {
          self.getAllTasks();
        });

      }).catch(function(err) {
        console.log(err);
      });

    };


    self.deleteTask = function(task) {
      $http({
        url: `/todo/${task._id}`,
        method: 'DELETE'
      }).then(function(response) {
        $mdDialog.show(
          $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Task Successfully Deleted')
          .ok('Got it!')
        ).then(function() {
          self.getAllTasks();
        });
      });
    };


    self.setUpEdit = function(task) {
      self.toBeEdited = task;
    };

    self.editTask = function (task) {
      $http({
        url: `/todo/${task._id}`,
        method: 'PUT',
        data: task
      }).then(function(response) {
        $mdDialog.show(
          $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Task Edited Successfully')
          .ok('Got it!')
        ).then(function() {
          self.getAllTasks();
          self.showView('allTasks');
        });

      }).catch(function(err) {
        console.log(err);
      });
    };


    self.doneNotDone = function (){
      self.uncompleted = [];
      self.completed = [];
      for(let todo of self.toDoList){
        if(todo.status){
          self.completed.push(todo);
        }else{
          self.uncompleted.push(todo);
        }
      }
    };

    self.setPercentDone = function(){
      let allToDoTasks = 0;
      let finishedTasks = 0;
      for(let todo of self.toDoList){
        allToDoTasks++;
        if(todo.status){
          finishedTasks++;
        }
      }

      self.progress = allToDoTasks == 0 ? 0 : Number.parseFloat((finishedTasks/allToDoTasks) *100).toFixed(0);
    };


    self.setCategory = function(){
      for(let k in self.categorizedCount){
        self.categorizedCount[k] = 0;
      }


      for(let todo of self.toDoList){
        switch (todo.category) {
          case 'Work' : self.categorizedCount.work++; break;
          case 'School' : self.categorizedCount.school++; break;
          case 'Chores' : self.categorizedCount.chores++; break;
          case 'Grocery' : self.categorizedCount.grocery++; break;
          case 'Miscellaneous' : self.categorizedCount.miscellaneous++; break;
        }
      }
    };




  }]);
