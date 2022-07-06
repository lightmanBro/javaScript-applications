// BUDGET CONTROLLER
var budgetrController = (function(){

} )();

// UI CONTROLLER
var UIcontroller = (function(){


})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UIctrl){
// this is where to control what happens upon each events and delegate the tasks to the other controllers.


           document.querySelector('.add__btn').addEventListener('click', function(){
                    //1. Get the field input data


                    //2. Add the item to the budget controller

                    //3. Add the item to the UI

                    //4. Calculate the budget
           })

})(budgetrController, UIcontroller );